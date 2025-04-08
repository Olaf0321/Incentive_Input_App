// controllers/classroomController.js
const Classroom = require('../models/Classroom');
const bcrypt = require('bcrypt')

exports.init = async () => {
    try {
        var admin = await Classroom.findOne({loginId: process.env.DEFAULT_ADMIN_LOGINID});
        if (admin) {
            
        } else {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            await Classroom.create({
                name: "Admin",
                loginId: process.env.DEFAULT_ADMIN_LOGINID,
                password: await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, salt)
            })
        }
    } catch (err) {
        console.log('err', err.message)
    }
}