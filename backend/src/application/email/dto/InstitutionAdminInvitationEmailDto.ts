export interface InstitutionAdminInvitationEmailDto {
  to: string;
  recipientName: string;
  institutionName: string;
  invitationLink: string;
  expiresInHours: number;
}
