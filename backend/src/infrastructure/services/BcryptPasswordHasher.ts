import bcrypt from "bcrypt";
import type { IPasswordHasher } from "@/application/interfaces/IPasswordHasher";
import type { IPasswordComparer } from "@/application/interfaces/IPasswordComparer";

export class BcryptPasswordHasher implements IPasswordHasher, IPasswordComparer{
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password,10);
    };

    async compare(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password,hashedPassword);
    };
}