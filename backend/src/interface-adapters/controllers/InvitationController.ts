import type { Request, Response, NextFunction } from 'express';
import type { InviteInstitutionAdmin } from '@/application/invitation/use-cases/InviteInstitutionAdmin';
import type { ResendInstitutionAdminInvitation } from '@/application/invitation/use-cases/ResendInstitutionAdminInvitation';
import type { VerifyInvitationToken } from '@/application/invitation/use-cases/VerifyInvitationToken';
import type { AcceptInvitation } from '@/application/invitation/use-cases/AcceptInvitation';

export class InvitationController {
  constructor(
    private inviteInstitutionAdminUseCase: InviteInstitutionAdmin,
    private resendInstitutionAdminInvitationUseCase: ResendInstitutionAdminInvitation,
    private verifyInvitationTokenUseCase: VerifyInvitationToken,
    private acceptInvitationUseCase: AcceptInvitation
  ) {}

  inviteInstitutionAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.inviteInstitutionAdminUseCase.execute({
        name: req.body.name,
        email: req.body.email,
        institutionName: req.body.institutionName,
      });
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  resendInstitutionAdminInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req.params.userId || req.params.id) as string;
      const result = await this.resendInstitutionAdminInvitationUseCase.execute({
        userId,
        institutionName: req.body.institutionName,
      });
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  verifyInvitationToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = (req.query.token || req.params.token) as string;
      const result = await this.verifyInvitationTokenUseCase.execute({ token });
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  acceptInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.acceptInvitationUseCase.execute({
        token: req.body.token,
        password: req.body.password,
      });
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
