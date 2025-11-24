import {  getLogout, getRefresh, postLogin, postRegister } from "../controller/auth.controller.js";
import express from 'express';
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router()

router.post('/register', postRegister);
router.post('/login', postLogin);

// router.patch('/forgot', patchForgotPassword)
router.get('/logout', getLogout);
router.get('/refresh', verifyJWT , getRefresh)

export default router;