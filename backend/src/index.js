import express from 'express';
import mongoose from 'mongoose';
import Login from "../schemas/loginSchema.js";
import Chat from "../schemas/chatSchema.js";
import bcrypt from 'bcryptjs';
import  jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {GoogleGenerativeAI}  from '@google/generative-ai';

dotenv.config();

const app = express();

const PORT = process.env["PORT"];
const MONGO_URI = process.env["MONGO_URI"];
const JWT_SECRET = process.env["JWT_SECRET"];

const GOOGLE_API_KEY=process.env["GEMINI_API_KEY"];

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


        if (!user) return res.send({"error": "You are not registered"})

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


        });
        res.cookie('User ID', {user_id : user._id.toString(), username: user.name}, {
          httpOnly: false,
          expire: 7 * 24 * 60 * 60 * 100
        })
        res.status(200).send({ 'message': 'Login successful' });
        

      } catch (e) {
        console.error("Error connecting to MongoDB: " + e);
        res.status(200).json({error: e.toString()});
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


        });

        res.cookie('User', {user_id : user._id.toString(), username: new_user.name}, {
          httpOnly: false,
          expire: 7 * 24 * 60 * 60 * 100
        })
        res.status(200).send({ 'message': 'Login successful' });

      } catch (e) {
        console.error(e);
        res.status(200).send({error: e.toString()});
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
          const chat = await Chat.findOne({user_id: req.params.user_id, _id: req.params.chat_id});
        
          res.json(chat);
        } catch (e) {
          console.error("Error connecting to MongoDB: " + e);
          res.status(200).send({error: e});
        }
});

app.post('/api/users:user_id/chats:chat_id', authenticateToken, async (req, res) => {
  // TODO: obtain chats using mongoose
  try{
      await mongoose.connect(MONGO_URI);
        const chat = await Chat.findOne({user_id: req.params.user_id, _id: req.params.chat_id});
      
        
        chat.messages.push({sender: "You", content: req.body.message});
      
        await chat.save();
        res.json(chat);
      } catch (e) {
        console.error("Error connecting to MongoDB: " + e);
        res.status(200).send({error: e});
      }
});

/* Return a generated message from CloneGPT */
app.get('/api/users:user_id/chats:chat_id/generate', authenticateToken, async (req, res) => {
  // TODO: obtain chats using mongoose
  try{
      await mongoose.connect(MONGO_URI);
        const chat = await Chat.findOne({user_id: req.params.user_id, _id: req.params.chat_id});
      
        const lastMessage = chat.messages[chat.messages.length-1].content;
        let context = "";
        for (let i=0; i < chat.messages.length-1; i++){
          context += "Sender: " + chat.messages[i].sender + "\n";
          context += "Message content: " + chat.messages[i].content + "\n";
        }
        const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        const prompt = "Reply to the request: " + lastMessage + "." + "Here is the context of the previous conversation with this user: " + context +". The sender 'Clone GPT' is you and the sender 'You' is the current user you are conversing with";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const reply = response.text();

        console.log(response.text());

        chat.messages.push({sender: "CloneGPT",  content: reply})

        await chat.save();

        
        res.send({sender: "CloneGPT",  content: reply});
      } catch (e) {
        console.error(e);
        res.status(200).send({error: e});
      }
});


/* Add a specific chat for logged-in user */
app.post('/api/users:user_id/chats', authenticateToken, async (req, res) => {
  // TODO: obtain chats using mongoose
  try{
      await mongoose.connect(MONGO_URI);

        const chat = new Chat({
          title: req.body.title,
          user_id: req.params.user_id,
          messages: req.body.messages,
          timestamp: req.body.timestamp
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
