import SaleProductModel from "../../model/sales/salesProducts.js";
import SalesModel from "../../model/sales/index.js";
import ProductModel from "../../model/products/product.js";

const salesController= {
    getAll: async (req, res) => {
      try {
        const sales = await SalesModel.findAll({
          order: [["createdAt", "DESC"]],
          limit: 5,
        });
  
        res.json({
          data: sales,
        });
      } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
      }
    },
    getSingle: async (req, res) => {
      try {
        const { id } = req.params;
        const sale = await SalesModel.findByPk(id, {
          include: [
            {
              model: SaleProductModel,
              include: [
                {
                  model: ProductModel,
                //   attributes:['name']
                },
              ],
            },
          ],
        });
        if (!sale) {
          res.status(404).json({ message: "no sale with this name" });
        }
        res.status(200).json({ data: sale });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
      }
    },
    create: async (req, res) => {
      try {
        const payload = req.body;
        console.log("payload", payload);
        let totalAmount = 0;
        payload.salesProducts.forEach((ele) => {
          totalAmount = totalAmount + ele.productQuantity * ele.rate;
        });
        const sale = new SalesModel();
        sale.totalAmount = totalAmount;
        await sale.save();
        console.log(payload.totalAmount);
        const salesProduct = []; 
  
        for (let index = 0; index < payload.salesProducts.length; index++) {
          const ele = payload.salesProducts[index];
  
          const product = await ProductModel.findByPk(ele.ProductId);
          if (ele.productQuantity > product.stock) {
            return res.status(400).json({
              message: "The product " + product.name + " has in-sufficient stock",
            });
          }
  
          salesProduct.push({
            ...ele,
            SaleId: sale.id,
          });
        }
  
        console.log("sales products", salesProduct);
        await SaleProductModel.bulkCreate(salesProduct);
  
        res.status(200).json({ message: "sale created", sale, salesProduct });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
      }
    },
    update: async (req, res) => {
        try {
          const { id } = req.params;
          const updatedSaleData = req.body;
    
          const existingSale = await SalesModel.findByPk(id);
          if (!existingSale) {
            return res.status(404).json({ error: "Sale not found" });
          }
    
          await existingSale.update(updatedSaleData);
    
          res.status(200).json({ message: "Sale updated", sale: existingSale });
        } catch (error) {
          console.error("Error updating sale:", error);
          res.status(500).json({ error: "Failed to update sale" });
        }
      },
      delete: async (req, res) => {
        try {
          const { id } = req.params;
    
          const existingSale = await SalesModel.findByPk(id);
          if (!existingSale) {
            return res.status(404).json({ error: "Sale not found" });
          }
    
          await existingSale.destroy();
    
          res.status(200).json({ message: "Sale deleted" });
        } catch (error) {
          console.error("Error deleting sale:", error);
          res.status(500).json({ error: "Failed to delete sale" });
        }
      }
    };
  
  export default salesController;
  