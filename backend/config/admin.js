// controllers/classroomController.js
const Classroom = require('../models/Classroom');
const Staff = require('../models/Staff');
const bcrypt = require('bcrypt')

exports.init = async () => {
    try {
        var adminClassroom = await Classroom.findOne({loginId: process.env.DEFAULT_ADMIN_LOGINID});
        if (adminClassroom) {
            
        } else {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            await Classroom.create({
                name: "AdminClassroom",
                loginId: process.env.DEFAULT_ADMIN_LOGINID,
                password: await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, salt)
            })
            const response = await Classroom.findOne({loginId: process.env.DEFAULT_ADMIN_LOGINID});
            await Staff.create({
                name: "Admin",
                type: "正社員",
                classroom: response._id
            })
        }
    } catch (err) {
        console.log('err', err.message)
    }
}