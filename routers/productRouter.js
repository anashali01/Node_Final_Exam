import { Router } from "express";
import productCtl from "../controller/productCtl.js"
import upload from "../middleware/upload.js";

const productRouter = Router();

// Add product
productRouter.get('/addProducts', productCtl.addProductPage);
productRouter.post('/addProducts', upload.single('image'), productCtl.addProduct);

// View products
productRouter.get('/products', productCtl.viewProductsPage);

// Edit product
productRouter.get('/edit-product/:id', productCtl.editProductPage);
productRouter.post('/edit-product/:id', upload.single('image'), productCtl.editProduct);

// Delete Product Router 
productRouter.get('/delete-product/:id', productCtl.deleteProduct);

//Card Router
productRouter.get('/product-card', productCtl.productCardPage);

export default productRouter;