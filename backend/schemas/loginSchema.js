import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const schema = new Schema({
 

  name: {
    type: String,
    required: true,
    max: 255
  },
  
  email: {
    type: String,
    required: true,
    max: 60
  },
  password: {
    type: String,
    required: true,
    max: 60
  }
});

const Login = model('Login', schema, 'AI-App');
export default Login;