// controllers/classroomController.js
const Classroom = require('../models/Classroom');
const Staff = require('../models/Staff');

exports.login = async (req, res) => {
  try {
    const {name, loginId, password} = req.body;

    const staff = Staff.findOne({name: name});

    if (staff == null) {
        res.status(201).json({
            code: 0,
            msg: "ご入力いただいた名前は登録されていません。"
        })
        return
    }

    const classroom = Classroom.findById(staff.classroom)

    if (classroom.loginId != loginId) {
        res.status(201).json({
            code: 1,
            msg: "ログインIDを正確に入力してください。"
        })
        return
    }

    const isMatch = await bcrypt.compare(password, classroom.password);

    if (!isMatch) {
        res.status(201).json({
            code: 2,
            msg: "パスワードを正確に入力してください。"
        })
        return
    }
    res.status(201).json({
        code: 3,
        msg: '正しくログインしました。'
    })
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};