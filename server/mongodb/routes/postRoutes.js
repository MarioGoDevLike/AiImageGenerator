import express from "express";
import * as dotenv from "dotenv";
import ImageKit from "imagekit";
import Post from "../models/post.js";

const router = express.Router();
dotenv.config();

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKITIO_KEY,
  privateKey: process.env.IMAGEKITIO_SECRET,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINT,
});

// GET A POST
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const {name, prompt, photo } = req.body;

    if (!prompt || !photo) {
      return res.status(400).json({ success: false, message: "Prompt and photo are required." });
    }

    if (!/^data:image\/\w+;base64,/.test(photo)) {
      throw new Error("Invalid image format. Make sure the image is base64 encoded.");
    }

    const uploadResponse = await imageKit.upload({
      file: photo,
      fileName: `${prompt.replace(/\s+/g, "_")}_${Date.now()}.jpeg`,
    });

    const newPost = await Post.create({
      name,
      prompt,
      photo: uploadResponse.url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
