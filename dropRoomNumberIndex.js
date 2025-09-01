// dropRoomNumberIndex.js
import mongoose from 'mongoose';

const uri = 'mongodb+srv://devteam:C5iOgb9MauQjUYRl@spotfli.arkthxs.mongodb.net/?retryWrites=true&w=majority&appName=spotfli'; // Replace with your Atlas URI

async function dropIndex() {
  await mongoose.connect(uri);
  try {
    const result = await mongoose.connection.db.collection('hotels').dropIndex('rooms.roomNumber_1');
    console.log('Index dropped:', result);
  } catch (err) {
    console.error('Error dropping index:', err.message);
  }
  await mongoose.disconnect();
}

dropIndex();