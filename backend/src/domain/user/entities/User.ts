import { Role } from '@/domain/user/entities/Role';
import { UserStatus } from '@/domain/user/enums/UserStatus';
import { BusinessRuleViolationError } from '@/domain/shared/errors';

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: Role,
    public isVerified: boolean,
    public status: UserStatus = UserStatus.ACTIVE,
    public createdAt?: Date,
    public updatedAt?: Date,
    public googleId?: string,
    public password?: string
  ) {}

  // Invariant Enforcement
  public ensureCanLogin(): void {
    if (this.status === UserStatus.SUSPENDED) {
      throw new BusinessRuleViolationError('Account is suspended. Please contact administrator.', 'ACCOUNT_SUSPENDED');
    }
    if (this.status === UserStatus.PENDING_ACTIVATION) {
      throw new BusinessRuleViolationError('Account is pending activation. Please accept your email invitation to activate your account.', 'ACCOUNT_PENDING_ACTIVATION');
    }
  }

  public ensureGoogleLoginAllowed(): void {
    if (this.role !== Role.STUDENT) {
      throw new BusinessRuleViolationError('Google login is only available for student accounts.', 'GOOGLE_LOGIN_NOT_ALLOWED');
    }
  }

  public suspend(): void {
    if (this.role === Role.SYSTEM_ADMIN) {
      throw new BusinessRuleViolationError('System Admin account cannot be suspended.', 'SYSTEM_ADMIN_SUSPENSION_FORBIDDEN');
    }
    this.status = UserStatus.SUSPENDED;
  }

  public activate(): void {
    this.status = UserStatus.ACTIVE;
  }

  // Domain Factory Methods
  static createSystemAdmin(id: string, name: string, email: string, passwordHash: string): User {
    return new User(id, name, email, Role.SYSTEM_ADMIN, true, UserStatus.ACTIVE, new Date(), new Date(), undefined, passwordHash);
  }

  static createPendingInstitutionAdmin(id: string, name: string, email: string): User {
    return new User(
      id,
      name,
      email,
      Role.INSTITUTION_ADMIN,
      true,
      UserStatus.PENDING_ACTIVATION,
      new Date(),
      new Date(),
      undefined,
      undefined
    );
  }

  static createInstitutionAdmin(id: string, name: string, email: string, passwordHash: string): User {
    return new User(id, name, email, Role.INSTITUTION_ADMIN, true, UserStatus.ACTIVE, new Date(), new Date(), undefined, passwordHash);
  }

  static createTeacher(id: string, name: string, email: string, passwordHash: string): User {
    return new User(id, name, email, Role.TEACHER, true, UserStatus.ACTIVE, new Date(), new Date(), undefined, passwordHash);
  }

  static registerStudent(id: string, name: string, email: string, passwordHash: string): User {
    return new User(id, name, email, Role.STUDENT, false, UserStatus.ACTIVE, new Date(), new Date(), undefined, passwordHash);
  }

  static registerGoogleStudent(id: string, name: string, email: string, googleId: string): User {
    return new User(id, name, email, Role.STUDENT, true, UserStatus.ACTIVE, new Date(), new Date(), googleId, undefined);
  }

  static reconstitute(
    id: string,
    name: string,
    email: string,
    role: Role,
    isVerified: boolean,
    status: UserStatus,
    createdAt?: Date,
    updatedAt?: Date,
    googleId?: string,
    password?: string
  ): User {
    return new User(id, name, email, role, isVerified, status, createdAt, updatedAt, googleId, password);
  }
}