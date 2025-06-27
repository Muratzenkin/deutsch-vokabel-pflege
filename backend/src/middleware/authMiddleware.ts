import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token gerekli." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // Tür genişletmesi sayesinde artık hata almazsınız
    next();
  } catch (error) {
    console.error("❌ Token doğrulama hatası:", error); // Hata mesajını konsola yazdır
    res.status(403).json({ error: "Geçersiz token." });
  }
};