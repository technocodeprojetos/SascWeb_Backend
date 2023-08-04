import { Router } from "express"
import { userRoutes } from "./users.routes";
import { cobrancaRoutes } from "./cobrancas.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/cobranca", cobrancaRoutes);

export { routes }
