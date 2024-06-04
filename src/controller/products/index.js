import SaleProductModel from "../../model/sales/salesProducts.js";
import ProductModel from "../../model/products/product.js";

const ProductsController= {
    getAll: async (req, res) => {
      try {
        const products = await ProductModel.findAll({
          order: [["createdAt", "DESC"]],
          limit: 5,
        });
  
        res.json({
          data: products,
        });
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error", error });
      }
    },
    getSingle: async (req, res) => {
      try {
        const { id } = req.params;
  
        const products = await ProductModel.findByPk(id, {
          include: [SaleProductModel],
        });
  
        if (!products) {
          return res.status(404).json({ message: "No product with this name" });
        }
        res.status(200).json({ data: products });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
      }
    },
    create: async (req, res) => {
      try {
        const payload = req.body;
  
        console.log(payload, "payload");
  
        const products= await  ProductModel.create(payload);
  
        res.status(200).json({ message: "product created", products});
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error",error });
      }
    },
    update: async (req, res) => {
        try {
          const { id } = req.params;
          const updatedProductData = req.body;
    
          const existingProduct = await ProductModel.findByPk(id);
          if (!existingProduct) {
            return res.status(404).json({ error: "product not found" });
          }
    
          await existingProduct.update(updatedProductData);
    
          res.status(200).json({ message: "product updated", products: existingProduct });
        } catch (error) {
          console.error("Error updating sale:", error);
          res.status(500).json({ error: "Failed to update sale" });
        }
      },
      delete: async (req, res) => {
        try {
          const { id } = req.params;
    
          const existingProduct= await ProductModel.findByPk(id);
          if (!existingProduct) {
            return res.status(404).json({ error: "product not found" });
          }
    
          await existingProduct.destroy();
    
          res.status(200).json({ message: "product deleted" });
        } catch (error) {
          console.error("Error deleting product:", error);
          res.status(500).json({ error: "Failed to delete product" });
        }
      }
    };
  
  export default ProductsController;