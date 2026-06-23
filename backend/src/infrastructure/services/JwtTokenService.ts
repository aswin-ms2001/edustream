import jwt from "jsonwebtoken";
import type { ITokenService } from "@/application/interfaces/ITokenService";

export class JwtTokenService implements ITokenService{
    generate(userId: string): string {
        return jwt.sign(
            {userId},
            process.env.JWT_SECRET!,
            {
                expiresIn:"15m"
            }
        )
    };
    verify(token: string): { userId: string; } {
        return jwt.verify(
            token,
            process.env.JWT_SECRET!
        )as {
            userId:string
        }
    }
}