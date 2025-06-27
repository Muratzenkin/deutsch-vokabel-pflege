import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";

dotenv.config();
connectDB();

const app = express();

// CORS ayarları
app.use(cors({
  origin: "https://pflege-vokabel.netlify.app", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // İzin verilen HTTP metodları
  allowedHeaders: ["Content-Type", "Authorization"], // İzin verilen başlıklar
  credentials: true, // Çerezleri dahil etmek için
}));

app.options("*", cors()); 

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});