import { Router } from "express";
import categoryController from "../../controller/products/category.js";
import AuthenticateMiddleware from "../../middleware/auth.js";
import categoryValidator from "../../validator/category/category.js";

const categoryRouter = Router();

categoryRouter.get("/categories", AuthenticateMiddleware, categoryController.getAll);
categoryRouter.post("/category", categoryValidator.create, AuthenticateMiddleware, categoryController.create);
categoryRouter.get("/category/:id", AuthenticateMiddleware, categoryController.getSingle);
categoryRouter.put("/category/:id", categoryValidator.update, AuthenticateMiddleware, categoryController.update); 
categoryRouter.delete("/category/:id", AuthenticateMiddleware, categoryController.delete); 

export default categoryRouter;
