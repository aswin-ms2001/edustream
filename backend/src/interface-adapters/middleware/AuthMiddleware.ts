import type {
    Request,
    Response,
    NextFunction,
} from "express";
import type { ITokenService } from "@/application/interfaces/ITokenService";

export class AuthMiddleware {
    constructor(
        private readonly tokenService: ITokenService
    ) {}

    handle = (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        const token =
            req.cookies.accessToken;

        if (!token) {
            res.status(401).json({
                message: "Token not provided",
            });

            return;
        }

        const payload =
            this.tokenService.verify(token!);

        req.user = {
            id: payload.userId,
        };

        next();
    };
}