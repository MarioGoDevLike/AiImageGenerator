import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from './mongodb/routes/postRoutes.js';
import dalleRoutes from './mongodb/routes/dalleRoutes.js'


dotenv.config();

const app = express();
app.use(cors({
  origin:["https://generate-an-image.vercel.app/"],
  methods:["POST","GET"],
  credentials:true,
}));

app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});

app.use('/api/v1/post', postRoutes);
app.use('/imagine/api/generations', dalleRoutes);



const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("Server has started at port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
