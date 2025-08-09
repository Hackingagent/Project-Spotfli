// test-connection.js
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const TEST_URI = "mongodb+srv://devteam:C5iOgb9MauQjUYRl@spotfli.arkthxs.mongodb.net/?retryWrites=true&w=majority&appName=spotfli";

async function testMongoose() {
  try {
    await mongoose.connect(TEST_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000
    });
    console.log("✅ Mongoose connected successfully");
  } catch (err) {
    console.log("❌ Mongoose failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

async function testNativeDriver() {
  const client = new MongoClient(TEST_URI);
  try {
    await client.connect();
    console.log("✅ Native driver connected successfully");
  } catch (err) {
    console.log("❌ Native driver failed:", err.message);
  } finally {
    await client.close();
  }
}

console.log("Testing Mongoose...");
await testMongoose();

console.log("\nTesting Native MongoDB Driver...");
await testNativeDriver();