// controllers/classroomController.js
const Classroom = require('../models/Classroom');
const Staff = require('../models/Staff');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const {name, loginId, password} = req.body;

    console.log('body', req.body);

    const staff = await Staff.findOne({name: name});

    if (staff == null) {
        res.status(201).json({
            code: 0,
            msg: "ご入力いただいた名前は登録されていません。"
        })
        return
    }

    const response = await Classroom.findById(staff.classroom);

    if (response.loginId != loginId) {
        res.status(201).json({
            code: 1,
            msg: "ログインIDを正確に入力してください。"
        })
        return
    }
    const isMatch = await bcrypt.compare(password, response.password);

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