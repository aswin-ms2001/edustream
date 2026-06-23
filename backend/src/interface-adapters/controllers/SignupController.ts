import type { SignupUseCase } from "@/application/use-cases/SignupUseCase";
import type { HttpRequest,HttpResponse } from "@/application/interfaces/Http";
import type { Request,Response } from "express";

export class SignupContoller{
    constructor(private readonly signupUseCase:SignupUseCase)
    {};

    handle= async (req:Request,res:Response):Promise<void> =>{
        const {name,email,password} = req.body;

        await this.signupUseCase.execute({
            name,
            email,
            password,
        });

        console.log(req.body)

        res.status(201).json({
            message: "User created successfully",
        });

    }

}