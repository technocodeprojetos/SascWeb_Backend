import { container } from "tsyringe";
import { UserRepository } from "../../modules/users/repositories/implametations/UserRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { ICobrancasRepository } from "../../modules/cobrancas/repositories/ICobrancasRepository";
import { CobrancaRepository } from "../../modules/cobrancas/repositories/implametations/CobrancasRepository";

container.registerSingleton<IUsersRepository>(
    "UserRepository",
    UserRepository
)

container.registerSingleton<ICobrancasRepository>(
    "CobrancaRepository",
    CobrancaRepository
)