import { Router } from "express";
import SalesController from "../../controller/sales/index.js";
import AuthenticateMiddleware from "../../middleware/auth.js";
import salesValidator from "../../validator/sales/index.js";


const salesRouter = Router();
salesRouter.get("/sales", AuthenticateMiddleware, SalesController.getAll);

salesRouter.post("/sales",salesValidator.create, AuthenticateMiddleware, SalesController.create);

salesRouter.get("/sales/:id",AuthenticateMiddleware, SalesController.getSingle);

salesRouter.put("/sales/:id",salesValidator.update, AuthenticateMiddleware, SalesController.update);

salesRouter.delete("/sales/:id",AuthenticateMiddleware, SalesController.delete);

export default salesRouter;
