const { signup, login, profile_update, adminlogin } = require('../Controllers/AuthController');
const ensureAuthenticated = require('../Middlewares/Auth');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const multer=require("multer")
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");
const { v4: uuidv4 } = require('uuid'); // Import UUID for unique player IDs
const admin_model = require('../Models/Adminmodel');
// ------------file-upload----------
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }

});
const uploadimage=multer({storage:storage});

router.post('/login', loginValidation, login);
router.post('/admin-login', loginValidation, adminlogin);

// Function to generate a random referral code
const generateReferralCode = (length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
};

router.post('/signup', async (req, res) => {
    try {
        const { name, phone, email, password, currency, verificationCode, referralCode } = req.body;
        console.log(req.body);

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.json({ message: 'User already exists, you can login', success: false });
        }

        // Generate unique player ID and referral code
        const player_id = uuidv4().slice(0, 6).toUpperCase();
        const newReferralCode = generateReferralCode();

        const userModel = new UserModel({
            name,
            email,
            phone,
            password,
            currency,
            player_id,
            referralCode: newReferralCode,
        });

        // Hash password before saving
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        res.json({
            message: "Signup successful",
            success: true,
            player_id,
            referralCode: newReferralCode
        });

        console.log(userModel);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
});
// -----------------admin-registration-----------------------
router.post('/admin-registration', async (req, res) => {
    try {
        const { name, email, password} = req.body;
        console.log(req.body);

        const user = await admin_model.findOne({ email });
        if (user) {
            return res.json({ message: 'Admin already exists, you can login', success: false });
        }

        // Generate unique player ID and referral code
    
        const adminmodel= new admin_model({
            name,
            email,
            password,
        });

        // Hash password before saving
        adminmodel.password = await bcrypt.hash(password, 10);
        await adminmodel.save();

        res.json({
            message: "Admin Has Been Created successfully!",
            success: true,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
});
router.put("/update-profile",ensureAuthenticated,profile_update);
// -----------------user-balance-update----------------------------
router.put("/update-user-balance/:id",async(req,res)=>{
    try {
        const find_user=await UserModel.findById({_id:req.params.id});
        if(!find_user){
            return res.send({success:false,message:"User did not find!"})
        }
        find_user.balance+=req.body.amount;
        find_user.save();
    } catch (error) {
        console.log(error)
    }
})
router.get("/user/:id",async(req,res)=>{
    try {
        const user=await UserModel.findById({_id:req.params.id});
        if(!user){
            return res.send({success:false,message:"User did not find!"})
        }
        res.send({success:true,message:"ok",user})
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;