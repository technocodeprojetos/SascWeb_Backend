import { container } from "tsyringe";
import { UserRepository } from "../../modules/users/repositories/implametations/UserRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
    "UserRepository",
    UserRepository
)