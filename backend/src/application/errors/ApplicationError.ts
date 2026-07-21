export class ApplicationError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly httpStatus: number
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
