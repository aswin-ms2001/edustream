import type { Request, Response } from "express";

export class ProfileController {
     handle = async  (
        req: Request,
        res: Response
    ): Promise<void> => {
        res.status(200).json({
            userId: req.user?.id,
        });
    }
}