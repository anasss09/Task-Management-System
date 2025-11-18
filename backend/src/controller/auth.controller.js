import User from '../model/user.model.js'

const accessAndRefreshToken = async function (userId) {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found for token generation");
    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    return {
        accessToken,
        refreshToken
    }
}


export const postRegister = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        const incomingField = Object.keys(req.body)
        const requiredField = ['fullName', 'email', 'password']
        const missingFields = requiredField.filter((item) => !incomingField.includes(item))

        if (missingFields.length > 0) {
            return res.status(400).json(`Fill the missing fields: ${missingFields.join(", ")}`)
        }

        const existUser = await User.findOne({ email: email })

        if (existUser) {
            return res.status(400).json("Email already exist")
        }

        const user = await User.create({
            fullName,
            email,
            password
        })

        const { accessToken, refreshToken } = await accessAndRefreshToken(user._id)

        user.refreshToken = refreshToken;
        await user.save();

        const userObj = user.toObject()
        delete userObj.password;
        delete userObj.refreshToken;

        res.status(201)
            .cookie(`AccessToken`, accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            })
            .cookie(`RefreshToken`, refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            })
            .json({
                success: true,
                message: 'User Added Successfully',
                User: userObj
            })
            
    } catch (error) {
        next(error)
    }
}

export const postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json('Email is required ')
        }

        if (!password) {
            return res.status(400).json('Password is required ')
        }

        // User Exist or not
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json('Please signup first');
        }

        //Password match
        const isMatched = await user.isPasswordCorrect(password);

        if (!isMatched) {
            return res.status(401).json(`Invalid password`)
        }

        const { accessToken, refreshToken } = await accessAndRefreshToken(user._id)

        user.refreshToken = refreshToken;
        await user.save();

        const userObj = user.toObject()
        delete userObj.password;
        delete userObj.refreshToken;

        res.status(200)
            .cookie(`AccessToken`, accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            })
            .cookie(`RefreshToken`, refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            })
            .json({
                success: true,
                message: "Login Successfull",
                User: userObj
            })

    } catch (error) {
        next(error)
    }
}

export const getLogout = (req, res) => {
    try {
        res.cookie(`AccessToken`, "", { maxAge: 0 })
            .cookie(`RefreshToken`, "", { maxAge: 0 })
            .status(200)
            .json({
                success: true,
                message: "Logout Successfull",
            })
    } catch (error) {
        res.status(500)
            .json('Error in Logout')
    }
}

export const getRefresh = (req, res) => {
    try {
        const userObj = req.user.toObject();
        delete userObj.password
        delete userObj.refreshToken
        res.status(200).json(userObj);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}