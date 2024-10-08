import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./mongodb/routes/postRoutes.js";
import dalleRoutes from "./mongodb/routes/dalleRoutes.js";
import path from 'path';
import url from 'url';



dotenv.config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// const corsOptions = {
//   origin: "https://generate-ai-image.vercel.app",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   allowedHeaders: "Content-Type,Authorization",
// };
app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});

app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')));

app.use("/api/v1/post", postRoutes);
app.use("/imagine/api/generations", dalleRoutes);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("Server has started at port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
