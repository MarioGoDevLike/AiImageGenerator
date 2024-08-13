import express from "express";
import * as dotenv from "dotenv";
import { client, Status, GenerationStyle } from "imaginesdk";

dotenv.config();

const router = express.Router();

const imagine = client(process.env.OPENAI_API_KEY);

router.route("/").get((req, res) => {
  res.send("HELLO FROM DALLE");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await imagine.generations(
      prompt,
      {
        style: GenerationStyle.IMAGINE_V5,
      }
    );

    const image = response.data();
    const base64Image = image.base64();
    console.log(base64Image);
    res.status(200).json({ photo: base64Image });
    

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
