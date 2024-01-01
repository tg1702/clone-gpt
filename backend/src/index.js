import express from 'express';
import mongoose from 'mongoose';
import Login from "../schemas/loginSchema.js";
import Chat from "../schemas/chatSchema.js";
import bcrypt from 'bcryptjs';
import  jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const PORT = process.env["PORT"];
const MONGO_URI = process.env["MONGO_URI"];
const JWT_SECRET = process.env["JWT_SECRET"];


app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) =>{
  res.send("Testing");
});
/* User login */
app.post('/api/login', async (req, res) => {
    // TODO: Load MongoDB to check if user is present in DB
    try {
        await mongoose.connect(MONGO_URI);
    
        const user = await Login.findOne({ name: req.body.name, email: req.body.email});

        
        if (!user) res.send({"error": "You are not registered"})

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);


        if (passwordMatch == false) return res.status(500).send({error : "Invalid email or password"});

        const token = jwt.sign({
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password
        }, JWT_SECRET, {expiresIn: '7d'});

        res.cookie("Authorization", token, {
          httpOnly: true,
          secure: true,
          expire: 7 * 24 * 60 * 60 * 100


        }).status(200).send({ user_id : user._id.toString()});
        

      } catch (e) {
        console.error("Error connecting to MongoDB: " + e);
        res.status(200).json({error: e});
    }

});

/* Register a user */
app.post('/api/register', async (req, res) =>{
    // TODO: Store registration data in request in MongoDB

    try {
        await mongoose.connect(MONGO_URI);

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const prev = await Login.find({email: req.body.email});

        if (prev) res.send({"error": "This email address is already registered"})
        
    
        const new_user = new Login(
            {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            }
            
        );

        
        await new_user.save();
       

        const token = jwt.sign({
          _id: new_user._id,
          name: new_user.name,
          email: new_user.email,
          password: new_user.password
        }, JWT_SECRET, {expiresIn: '7d'});

        res.cookie("Authorization", token, {
          httpOnly: true,
          secure: true,
          expire: 7 * 24 * 60 * 60 * 100


        }).status(200).send({ message: "Registration successful"});

      } catch (e) {
        console.error(e);
        res.status(200).send({error: e});
    }

});

/* Get all chats for logged-in user */
app.get('/api/users:user_id/chats', authenticateToken, async (req, res) => {
    // TODO: obtain chats using mongoose
    try{
    await mongoose.connect(MONGO_URI);
     
      const list = await Chat.find({user_id: req.params.user_id});
      res.send(list);
    } catch (e) {
      console.error("Error connecting to MongoDB: " + e);
      res.status(200).send({error: e});
    }
});

/* Get a specific chat for logged-in user */
app.get('/api/users:user_id/chats:chat_id', authenticateToken, async (req, res) => {
    // TODO: obtain chats using mongoose
    try{
        await mongoose.connect(MONGO_URI);
          const chat = await Chat.find({user_id: req.params.user_id, _id: req.params.chat_id});
        
          res.json(chat);
        } catch (e) {
          console.error("Error connecting to MongoDB: " + e);
          res.status(200).send({error: e});
        }
});

/* Return a generated message from Clone.GPT */
app.get('/api/users:user_id/chats:chat_id', authenticateToken, async (req, res) => {
  // TODO: obtain chats using mongoose
  try{
      await mongoose.connect(MONGO_URI);
        const chat = await Chat.find({user_id: req.params.user_id, _id: req.params.chat_id});
      

        const reply = "";
        chat.messages.push({sender: "Clone.GPT", receiver: "user", content: reply})

        await chat.save();

      } catch (e) {
        console.error("Error connecting to MongoDB: " + e);
        res.status(200).send({error: e});
      }
});


/* Add a specific chat for logged-in user */
app.post('/api/users:user_id/chats', authenticateToken, async (req, res) => {
  // TODO: obtain chats using mongoose
  try{
      await mongoose.connect(MONGO_URI);

        const chat = new Chat({
          user_id: req.params.user_id,
          messages: req.body.messages,

        });

        await chat.save();
        res.send({chat_id: chat._id});
      } catch (e) {
        console.error("Error connecting to MongoDB: " + e);
        res.status(200).send({error: e});
      }
});

/* Logout a user */
app.post('/api/users:user_id/logout', authenticateToken, (req, res) => {
  res
    .clearCookie("Authorization")
    .status(200)
    .json({ message: "Logged out" });
});

function authenticateToken(req, res, next) {
    const token = req.cookies.Authorization;
    
    if (!token) return res.status(401).json({ message: 'No authorisation' });
  
    // Verify and decode the token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      req.user = decoded;
      next();
    });
}

app.listen(PORT, () => {console.log(`Server listening on PORT ${PORT}`)});
