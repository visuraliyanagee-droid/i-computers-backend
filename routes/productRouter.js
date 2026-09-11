import express from "express"
import { createProduct, deleteProduct, getAllproducts, getProductByID, updateProduct } from "../controllers/productControler.js"

const productRouter = express.Router()

productRouter.get("/",getAllproducts)

productRouter.get("/trending",(req,res)=>{
    res.json(
        {
            message:"trending products endpoint"
        }
    )
})//git check

productRouter.post("/",createProduct)

productRouter.delete("/:productID",deleteProduct)

productRouter.put("/:productID",updateProduct)

productRouter.get("/:productID",getProductByID)



export default productRouter