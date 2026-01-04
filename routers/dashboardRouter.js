import { Router } from "express";
import dashboardCtl from "../controller/dashboardCtl.js";
import dashboardAuth from "../middleware/dashboardAuth.js"
const dashboardRouter = Router();

// Sign Up Router
dashboardRouter.get('/signup' , dashboardCtl.SignupPage); 
dashboardRouter.post('/signup' , dashboardCtl.Signup); 

// Login Router 
dashboardRouter.get('/login',dashboardCtl.LoginPage);
dashboardRouter.post('/login',dashboardCtl.Login);

//Logout Router
dashboardRouter.get('/logout' , dashboardCtl.Logout);


dashboardRouter.use(dashboardAuth);
dashboardRouter.get('/',dashboardCtl.dashboardPage);

// View User Data Router 
dashboardRouter.get('/viewUsers',dashboardCtl.viewUsersPage)

// Delete User Router 
dashboardRouter.get('/delete/:id',dashboardCtl.deleteUser)

// Edit User Router 
dashboardRouter.get('/edit/:id',dashboardCtl.editUserPage);
dashboardRouter.post('/edit/:id',dashboardCtl.editUser);

dashboardRouter.get('/changePassword',dashboardCtl.changePasswordPage);
dashboardRouter.post('/changePassword',dashboardCtl.changePassword);


export default dashboardRouter;