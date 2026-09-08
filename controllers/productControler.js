import product from "../models/Product.js";
import { isAdmin } from "./userController.js";


export function createProduct(req,res){

if(!isAdmin(req)){
    res.status(403).json({
        message:"forbidden"

 });
 return;
}


    const product1= new product(req.body)
    product1.save().then(
        ()=>{
            res.json({
                message:"product created sucessfully"
            })
        }
    ).catch(
        (error)=>{
            res.status(501).json({
                message: "error creating product",
                error : error.message
            })
        }
    )
}


export function getAllproducts(req,res){

    if(isAdmin(req)){
        product.find()
        .then((products)=>{
            res.json(products);
        })
        .catch((error)=>{
            res.status(500).json({
                message:"error fetching products",
                error:error.message,
            })
        })
    }else{
        product.find({isAvailable : true})
    }
}

export function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            meesage:"only admin can be deleted"
        })
        return
    }
    const productID = req.params.productID

    product.deleteOne({ productID:productID}).then(
        ()=>{
            res.json({
                message: "Product is deleted successfully"
            })
        }
    )
    
}
export function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "only admins can do this"
        })
        return
    }
    const productID = req.params.productID

    product.updateOne({productID:productID},req.body)
    .then(
        ()=>{
            res.json({
                message:"product updated sucessfully"
            })

        }
    )
}

export function getProductByID(req,res){
    const productID = req.params.productID

    product.findOne({productID : productID}).then(
        (product)=>{
            if(product==null){
                res.status(404).json({
                    message:"product not found"
                })
            }
            else{
                res.json(product)//git change
            }
        }
    ).catch(
        (error)=>{
            res.status(500).json({
                message:"error fetching product",
                error: error.message
            })
        }
    )
}




























