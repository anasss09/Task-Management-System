import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },

    refreshToken: {
        type: String
    }

}, {
    timestamps: true
})

userSchema.pre('save', function (next) {
    if (!this.isModified("password")) return next();

    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            next(err)
        }

        this.password = hash;
        next()
    })

})

userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ userId: this._id }, process.env.REFRESHTOKEN_SECRET,
        { expiresIn: process.env.REFRESHTOKEN_EXPIRE }
    )
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        userId: this._id,
        email: this.email,
        fullName: this.fullName
    }, process.env.ACCESSTOKEN_SECRET,
        {
            expiresIn: process.env.ACCESSTOKEN_EXPIRE
        }
    )
}

const User = mongoose.model("User", userSchema);
export default User;