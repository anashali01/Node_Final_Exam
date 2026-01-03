import Category from '../model/category.model.js'

const categoryCtl = {
    addCategoryPage(req,res){
        return res.render('./pages/addCategory.ejs')
    },
    async addCategory(req,res){
        try {
            const { name, description } = req.body;
            const image = req.file && req.file.path ? req.file.path : undefined;
            const isActive = req.body.isActive === 'true' || req.body.isActive === 'on' ? true : false;

            const category = await Category.create({ name, description, image, isActive });
            return res.redirect('/viewCategories');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async viewCategoriesPage(req,res){
        try {
            const categories = await Category.find({});
            return res.render('./pages/viewCategories.ejs',{
                categories
            })
        } catch (error) {
            console.log(error);
            return res.render('./pages/viewCategories.ejs',{
                categories : []
            })
        }
    },
    async deleteCategory(req,res){
        try {
            const categoryId = req.params.id;
            await Category.findByIdAndDelete(categoryId);
            return res.redirect('/viewCategories');
        } catch (error) {
            console.log(error);
            return res.redirect('/viewCategories');
        }
    },
    async editCategoryPage(req,res){
        try {
            const categoryId = req.params.id;
            const category = await Category.findById(categoryId);
            return res.render('./pages/editCategory.ejs', { category });
        } catch (error) {
            console.log(error);
            return res.redirect('/viewCategories');
        }
    },
    async editCategory(req,res){
        try {
            const categoryId = req.params.id;
            const { name, description, isActive } = req.body;
            const image = req.file && req.file.path ? req.file.path : undefined;

            await Category.findByIdAndUpdate(categoryId, { name, description, image, isActive });
            return res.redirect('/viewCategories');
        } catch (error) {
            console.log(error);
            return res.redirect('/viewCategories');
        }
    }
}

export default categoryCtl;