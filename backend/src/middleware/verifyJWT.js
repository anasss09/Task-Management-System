import User from '../model/user.model.js'
import jwt from 'jsonwebtoken'

export const verifyJWT = async (req, res, next) => {
    const incomingAccessToken = req.cookies.AccessToken;
    const incomingRefreshToken = req.cookies.RefreshToken;

    if(!incomingAccessToken || !incomingRefreshToken ) {
        return res.status(401).json(`Not Authorised, Kindly login`)
    }

    try {
        let userInfo = jwt.verify(incomingAccessToken, process.env.ACCESSTOKEN_SECRET);
        // userId from payload data of Access Token
        let user = await User.findById(userInfo.userId)

        let userRefreshToken = user.refreshToken;

        if(incomingRefreshToken !== userRefreshToken) {
            return res.status(401).json(`Not Authorised, Kindly login`)
        }

        req.user = user;
        next()

    } catch (error) {
        res.status(500).json('Error in verify JWT')
    }
}