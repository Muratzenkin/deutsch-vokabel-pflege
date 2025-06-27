// filepath: /home/dci-student/IT-Freiberuf/vokabel-trainer/vokabel-trainer/backend/types/express.d.ts
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload; // JWT'den dönen türü burada tanımlayın
    }
  }
}