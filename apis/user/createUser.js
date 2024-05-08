const express = require('express')
const app = express()
const User = require('../../models/userSchema/adminSchema')

const bcryptjs = require('bcrypt');


const createAdmin = app.post('/createadminuser', async (req, res) => {

    try {

        const { name, email, password } = req.body


        var salt = await bcryptjs.genSaltSync(10);


        var hashPassword = await bcryptjs.hashSync(password, salt);

        console.log('hashPassword',hashPassword)

        const user = await User.findOne({ email })

        console.log(user)
        if (user) {
            res.status(200).json({
                CODE: 403, result: {
                    user,
                    message: 'User Exist',
                    status: true
                }
            })

        }

        // let userRole = await Roles.find({ title: 'admin' })

        const newUser = new User({
            // Any other user data you want to save
            name: name,
            lastname: '',
            userName: `${Date.now()}`,
            userImage: '',
            profession: '',
            phone: `${Date.now()}`,
            email: email,
            password: hashPassword,
            roles:  [],
            isvarify: 'true',
            isvarifiedWriter: '',
            settings: [],
            bio: '',
            usermeta: [],
            forgotpasswordtoken: '',
            forgotpasswordtokenexpiry: '',
            varifytoken: '',
            varifytokenexpiry: '',
            date: Date.now(),
        });

        const savedUser = await newUser.save()

        if (savedUser) {
            res.status(200).json({
                CODE: 200, result: {
                    savedUser,
                    message: 'User Created',
                    status: true
                }
            })

        }

       
    } catch (err) {
        res.status(200).json({
            CODE: 400, result: {

                message: 'Something went Wrong',
                status: true
            }
        })
    }



})

module.exports = createAdmin