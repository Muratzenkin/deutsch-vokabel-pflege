import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Email ve kullanıcı adı benzersiz mi kontrol et
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res.status(400).json({ error: "Email veya kullanıcı adı zaten kullanılıyor." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu!" });
  } catch (error) {
    console.error("❌ Kayıt sırasında bir hata oluştu:", error);
    res.status(500).json({ error: "Kayıt sırasında bir hata oluştu." });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ error: "Kullanıcı bulunamadı." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Geçersiz şifre." });
      return;
    }

    // Token süresini artırabilirsiniz (örneğin: "7d" -> 7 gün)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    console.error("❌ Giriş sırasında bir hata oluştu:", error);
    res.status(500).json({ error: "Giriş sırasında bir hata oluştu." });
  }
};