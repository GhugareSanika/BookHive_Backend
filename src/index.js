import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { connetDB } from "./lib/db.js";
import bookRoutes from "./routes/bookRoutes.js";
//import job from "./lib/cron.js";
const app = express();
const PORT = process.env.PORT || 3000;

//job.start();
app.use(express.json());
//app.use(cors());

app.use(
  cors({
    origin: "*", // ✅ or replace with your frontend domain (e.g., "https://myapp.vercel.app")
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ important for tokens
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connetDB();
});
