export interface TeacherInvitationEmailDto {
  to: string;
  recipientName: string;
  institutionName?: string;
  invitationLink: string;
  expiresInHours: number;
}
