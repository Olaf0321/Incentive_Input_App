// controllers/classroomController.js
const Classroom = require('../models/Classroom');
const InputPossibility = require('../models/InputPossibility');
const Staff = require('../models/Staff');
const bcrypt = require('bcrypt')

exports.init = async () => {
    try {
        var adminClassroom = await Classroom.findOne({name: process.env.DEFAULT_ADMIN_CLASSROOM_NAME});
        if (adminClassroom) {
            
        } else {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            await Classroom.create({
                name: process.env.DEFAULT_ADMIN_CLASSROOM_NAME,
                loginId: process.env.DEFAULT_ADMIN_LOGINID,
                password: await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, salt)
            })
            const response = await Classroom.findOne({loginId: process.env.DEFAULT_ADMIN_LOGINID});
            await Staff.create({
                name: "Admin",
                type: "Admin",
                classroom: response._id
            })

            await InputPossibility.create({
                period: '上期入力',
                status: true
            })

            await InputPossibility.create({
                period: '下期入力',
                status: true
            })
        }
    } catch (err) {
        console.log('err', err.message)
    }
}