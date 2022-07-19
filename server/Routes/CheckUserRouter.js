import express from "express";
import userCtrl from "../Controllers/CheckUserController.js";
import auth from "../Middleware/auth.js";
import authAdmin from "../Middleware/authAdmin.js";

const router = express.Router();

router.post('/register', userCtrl.register)

router.post('/add-user', userCtrl.addUser)

router.post('/activation', userCtrl.activateEmail)

router.post('/login', userCtrl.login)

router.post('/refresh_token', userCtrl.getAccessToken)

router.post('/forgot', userCtrl.forgotPassword)

router.post('/reset', auth, userCtrl.resetPassword)

router.get('/infor', auth, userCtrl.getUserInfor)

router.get('/all_infor', userCtrl.getUsersAllInfor)

router.get('/logout', userCtrl.logout)

router.patch('/update', userCtrl.updateUser)

router.post('/update-profile', userCtrl.updateProfile)

router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)

router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)


// Social Login
router.post('/google_login', userCtrl.googleLogin)

router.post('/facebook_login', userCtrl.facebookLogin)


export default router;