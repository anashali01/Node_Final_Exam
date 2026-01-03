import Product from '../model/product.model.js'
import Category from '../model/category.model.js'

const productCtl = {
    async addProductPage(req,res){
        try {
            const categories = await Category.find({}).lean();
            return res.render('./pages/addProduct.ejs', { categories });
        } catch (error) {
            console.log(error.message);
            return res.render('./pages/addProduct.ejs', { categories: [] });
        }
    },
    async addProduct(req,res){
        try {
            const { name, description, price, categoryId, stock, rating } = req.body;
            const image = req.file && req.file.path ? req.file.path : undefined;
            const isActive = req.body.isActive === 'true' || req.body.isActive === 'on' ? true : false;

            const productData = {
                name,
                description,
                price: price ? parseFloat(price) : 0,
                category: categoryId,
                image,
                stock: stock ? parseInt(stock, 10) : 0,
                rating: rating ? parseFloat(rating) : 0,
                isActive,
            };

            await Product.create(productData);
            return res.redirect('/products');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async viewProductsPage(req,res){
        try {
            const products = await Product.find({}).populate('category').lean();
            return res.render('./pages/viewProducts.ejs',{
                products
            })
        } catch (error) {
            console.log(error);
            return res.render('./pages/viewProducts.ejs',{
                products : []
            })
        }
    },
    async editProductPage(req,res){
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId).populate('category');
            const categories = await Category.find({}).lean();
            return res.render('./pages/editProduct.ejs', { product, categories });
        } catch (error) {
            console.log(error.message);
            return res.redirect('/products');
        }
    },
    async editProduct(req,res){
        try {
            const productId = req.params.id;
            const { name, description, price, categoryId, stock, rating, isActive } = req.body;
            const image = req.file && req.file.path ? req.file.path : undefined;
            const isActiveFlag = isActive === 'true' || isActive === 'on' ? true : false;

           
            if (image) req.body.image = image;

            await Product.findByIdAndUpdate(productId, req.body);
            return res.redirect('/products');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/products');
        }
    },
    async deleteProduct(req,res){
        try {
            const productId = req.params.id;
            await Product.findByIdAndDelete(productId);
            return res.redirect('/products');
        } catch (error) {
            console.log(error);
            return res.redirect('/products')
        }
    },
    async productCardPage(req,res){
        try {
            const products = await Product.find({}).populate('category').lean();
            return res.render('./pages/productCard.ejs',{
                products
            })
        } catch (error) {
            console.log(error);
            return res.render('./pages/productCard.ejs',{
                products : []
            })
        }
    }
}

export default productCtl;