import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res.send("HELLO FROM DALLE");
});

router.route("/").post(async (req, res) => {
  try {
    const prompt = req.body;
    const airesponse = await openAi.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const image = airesponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message)
  }
});

export default router;
