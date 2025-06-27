import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI!;
    if (!mongoURI) {
      throw new Error("MONGO_URI çevre değişkeni tanımlı değil.");
    }

    await mongoose.connect(mongoURI); // Ek seçeneklere artık gerek yok
    console.log("✅ MongoDB başarıyla bağlandı");
  } catch (err) {
    if (err instanceof Error) {
      console.error("❌ MongoDB bağlantı hatası:", err.message);
    } else {
      console.error("❌ Bilinmeyen bir hata oluştu:", err);
    }
    process.exit(1); // Uygulamayı durdur
  }
};