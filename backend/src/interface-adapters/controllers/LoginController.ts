import { LoginUseCase } from "@/application/use-cases/LoginUseCase";
import type { Request, Response } from "express";

export class LoginContoller{
    constructor(
        private readonly loginUseCase:LoginUseCase
    ){};

    handle = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const token =
            await this.loginUseCase.execute(req.body);

        res.cookie(
            "accessToken",
            token,
            {
                httpOnly:true,
                secure:process.env.NODE_ENV==="production",
                sameSite:"lax",
                maxAge: 15 * 60 * 1000,
            }
        )
        res.status(200).json({
            message:"Login Successful"
        });
    }

}