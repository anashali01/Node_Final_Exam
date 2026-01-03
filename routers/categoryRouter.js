import {Router} from "express"
import categoryCtl from "../controller/categoryCtl.js"
import upload from "../middleware/upload.js"

const categoryRouter = Router();

// Add category 
categoryRouter.get('/addCategory', categoryCtl.addCategoryPage);
categoryRouter.post('/addCategory', upload.single('image'), categoryCtl.addCategory);

// View Category 
categoryRouter.get('/viewCategories', categoryCtl.viewCategoriesPage);

// Delete Category Router 
categoryRouter.get('/delete-category/:id', categoryCtl.deleteCategory);

// Edit Category Router
categoryRouter.get('/edit-category/:id', categoryCtl.editCategoryPage);
categoryRouter.post('/edit-category/:id', upload.single('image'), categoryCtl.editCategory);

export default categoryRouter;