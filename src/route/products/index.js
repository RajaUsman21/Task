import { Router } from "express";
import ProductsController from "../../controller/products/index.js";
import AuthenticateMiddleware from "../../middleware/auth.js";
import productValidator from "../../validator/products/index.js";

const ProductRouter = Router();
ProductRouter.get("/products", AuthenticateMiddleware, ProductsController.getAll);

ProductRouter.get("/product/:id",AuthenticateMiddleware, ProductsController.getSingle);

ProductRouter.post("/product",productValidator.create, AuthenticateMiddleware,ProductsController.create);

ProductRouter.put("/product/:id",productValidator.update, AuthenticateMiddleware, ProductsController.update);

ProductRouter.delete("/product/:id",AuthenticateMiddleware, ProductsController.delete);

export default ProductRouter;
 