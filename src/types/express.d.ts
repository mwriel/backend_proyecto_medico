// src/types/express.d.ts
import { User } from "./user.type";

declare global {
  namespace Express {
    interface Request {
      user?: User & { id: number }; // Asegurar que id es number
    }
  }
}