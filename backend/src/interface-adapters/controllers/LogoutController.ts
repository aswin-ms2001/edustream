import type {
    Request,
    Response,
} from "express";

export class LogoutController {
    handle = (
        req: Request,
        res: Response
    ): void => {
        res.clearCookie("accessToken");

        res.status(200).json({
            message: "Logged out",
        });
    }
}