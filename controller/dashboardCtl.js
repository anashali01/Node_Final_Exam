import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../model/user.model.js"
import dotenv from "../config/dotenv.js"
import Product from "../model/product.model.js"
const dashboardCtl = {
    dashboardPage(req,res){
        return res.render('./index.ejs')
    },
    SignupPage(req,res){
        res.render('./pages/signup.ejs')
    },
    async Signup(req,res){
        try {
            const {password , confirmPassword} = req.body;

            if(password != confirmPassword){
                console.log(`Password Doesn't Match!`);
            }

            let hashPassword = await bcrypt.hash(password,10);
            req.body.password = hashPassword;
 
            const user = await User.create(req.body);

            return res.redirect('/login')
        } catch (error) {
            console.log(error);
            res.redirect(req.get('Referrer') || '/')
        }
    },
    LoginPage(req,res){
        res.render('./pages/login.ejs');
    },
    async Login(req,res){
        try {
            const {email , password} = req.body;

            let user = await User.findOne({email});

            if(!user){
                console.log(`User Is Not Exist`);
                return res.redirect('/login')
            }
            let isValid = await bcrypt.compare(password , user.password);

            if(!isValid){
                console.log(`Password Not Match`);
                return res.redirect('/login')
            }
            let payload = {
                userId: user._id,
                role: user.role
            }

            const token = jwt.sign(payload, dotenv.JWT_SECRET || 'myToken');

            res.cookie('token' , token);

            return res.redirect('/');
        } catch (error) {
            console.log(error);
            return res.redirect('/login');
        }
    },
    Logout(req,res){
        res.clearCookie('token')
        return res.redirect('/login');

    },
    async viewUsersPage(req,res){
        try {
            const user = await User.find({});
            return res.render('./pages/viewUsers.ejs',{
                user
            })
        } catch (error) {
            console.log(error);
            return res.render('./pages/viewUsers.ejs',{
                user : []
            })
        }
    },
    async deleteUser(req,res){
        try {
            const {id} = req.params;
            await User.findByIdAndDelete(id);
            return res.redirect('/viewUsers');
        } catch (error) {
            console.log(error);
            return res.redirect('/viewUsers');
            
        }
    },
    async editUserPage(req,res){
        try {
            const {id} = req.params;
            const oneUser = await User.findById(id);
            return res.render('./pages/editUserPage.ejs',{
                oneUser
            })
        } catch (error) {
            console.log(error);
            return res.render('./pages/editUserPage.ejs',{
                oneUser : []
            })
        }
    },
    async editUser(req,res){
        try {
            const {id} = req.params;

            const oneUser = await User.findByIdAndUpdate(id,req.body)

            return res.redirect('/viewUsers')
        } catch (error) {
            console.log(error);
            return res.redirect('/viewUsers')
            
        }
    },
    changePasswordPage(req,res){
        return res.render('./pages/changePassword.ejs')
    },
}

export default dashboardCtl;