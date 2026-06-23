export interface IPasswordComparer{
    compare(password:string,hashedPassword:string):Promise<boolean>;
}