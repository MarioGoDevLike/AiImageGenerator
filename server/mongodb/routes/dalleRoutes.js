import express from "express";
import * as dotenv from "dotenv";
import fs from 'fs';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("HELLO FROM DALLE123123");
});

async function fetchImageAsBase64(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    const base64Image = buffer.toString('base64');
    return base64Image;
  } catch (error) {
    console.error('Error fetching the image:', error);
    throw error;
  }
}

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const width = 1024;
    const height = 1024;
    const seed = 42;
    const model = 'turbo'; 
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;
    const base64Image = await fetchImageAsBase64(imageUrl);
    res.status(200).json({ photo: `${base64Image}` });

  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

export default router;
