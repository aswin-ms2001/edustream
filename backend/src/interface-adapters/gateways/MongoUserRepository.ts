import { User } from "@/domain/entities/User";
import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import { UserModel } from "@/infrastructure/database/mongodb/UserModel";

export class MongoUserRepository implements IUserRepository{
    async findByEmail(email: string): Promise<User | null> {
        
        const user = await UserModel.findOne({email})



        if(!user){
            return null;
        };

        return new User(
            user.id,
            user.name,
            user.email,
            user.password
        );
    };

    async create(user: User): Promise<void> {
        await UserModel.create({
            id:user.id,
            name:user.name,
            email:user.email,
            password:user.password
        })
    }

}