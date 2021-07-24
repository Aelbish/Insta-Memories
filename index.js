import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

const app = express();

dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello to InstaMemories API");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Sever running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
