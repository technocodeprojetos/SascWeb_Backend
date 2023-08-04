import { Router } from "express"
import { AuthenticateUserController } from "../modules/users/useCases/usersControllers/AuthenticateUserController";
import { CreateUserController } from "../modules/users/useCases/usersControllers/CreateUserController"
import { ensureAuthenticated } from "../shared/middleware/ensureAuthenticated";
import multer from "multer";
import { uploadfile } from "../configs/upload";
import { CreateCobrancaController } from "../modules/cobrancas/useCases/cobrancasControllers/CreateCobrancaController";

const cobrancaRoutes = Router()

const createCobranca = new CreateCobrancaController();

cobrancaRoutes.post("/", multer().single('file'), createCobranca.handle);


export { cobrancaRoutes };