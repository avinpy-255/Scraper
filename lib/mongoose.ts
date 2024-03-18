import mongoose from 'mongoose';

let connection = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

  if (!process.env.MONGO_URI) return console.log('MONGO_URI is required')

  if(connection) return console.log('=> using existing data');
  
  try{
    await mongoose.connect(process.env.MONGO_URI);

    connection = true;
    console.log('=> Mongoose connected');
    
  } catch(error) {
    console.log(error);
  }
}