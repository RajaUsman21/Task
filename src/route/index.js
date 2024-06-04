import authRouter from "./auth/index.js";
import categoryRouter from "./products/category.js";
import ProductRouter from "./products/index.js";
import salesRouter from "./sales/index.js";


const AllRouters=[
    
    salesRouter,
    categoryRouter,
    ProductRouter,
    authRouter,
    
]
export default AllRouters