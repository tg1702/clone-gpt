import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const schema = new Schema({
  user_id: {
    type: String,
    required: true,
    max: 255
  },
  
  messages: {
    type: Array,
    required: true,
    max: 2555
  },

  timestamp: {
    type: String,
    required: true,
    max: 255
  },

  title: {
    type: String,
    required: true,
    max: 255
  },

  timestamp: {
    type: String,
    required: true,
    max: 255
  }


  
});

const Chat = model('Chat', schema);
export default Chat;