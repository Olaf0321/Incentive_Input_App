// controllers/staffController.js
const Staff = require('../models/Staff');
const Incentive = require('../models/Incentive');

// CREATE a new staff
exports.createStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    console.log("staff", staff);
    const {name, type, classroom} = staff;
    const response = await Staff.findOne({name: name});

    console.log('response', response);

    if (response != null) {
      res.status(200).json({
        code : 0,
        msg: "すでに登録されている名前です。"
      })
    } else {
      await Staff.create({
        name: name,
        type: type,
        classroom: classroom
      });
      res.status(200).json({
        code: 1,
        msg: "正確に登録されました。"
      })
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addIncentive = async(req, res) => {
  try {
    const data = req.body;
    console.log('data', data);
    const {staffName, time, incentiveName, quantity} = data;

    const staff = await Staff.findOne({name: staffName});
    const incentive = await Incentive.findOne({name: incentiveName});

    console.log('staff===========', staff);
    console.log('incentive===============', incentive);

    staff.incentiveList.push({
      time: time,
      incentive: incentive._id,
      grade: quantity
    });
    const rlt = await staff.save();
    console.log('rlt', rlt);

  } catch (err) {
    res.status(400).json({error: err.message});
  }
}

const getLastYear = (currentYear) => {
  const numberOfCurrentYear = Number(currentYear);
  const numberOfLastYear = numberOfCurrentYear - 1;
  const stringOfLastYear = String(numberOfLastYear);
  return stringOfLastYear;
}

const getNextYear = (currentYear) => {
  const numberOfCurrentYear = Number(currentYear);
  const numberOfNextYear = numberOfCurrentYear + 1;
  const stringOfNextYear = String(numberOfNextYear);
  return stringOfNextYear;
}

//Read incentive list by date
exports.getIncentivesListByDate = async(req, res) => {
  try {
    const data = req.body;
    console.log('data', data);
    const {name, currentYear, currentMonth, status} = data;

    const staff = await Staff.findOne({name: name})
      .populate('classroom')
      .populate('incentiveList.incentive');
    const incentivesList = staff.incentiveList;

    let st = '', ed = '';

    if (status == '上期入力') {
      if (currentMonth < '04') {
        const lastYear = getLastYear(currentYear);
        st = `${lastYear}-04-01`, ed = `${lastYear}-09-30`;
      } else {
        st = `${currentYear}-04-01`, ed = `${currentYear}-09-30`;
      }
    } else {
      if (currentMonth < '10') {
        const lastYear = getLastYear(currentYear);
        st = `${lastYear}-10-01`, ed = `${currentYear}-03-31`;
      } else {
        const nextYear = getNextYear(currentYear);
        st = `${currentYear}-10-01`, ed = `${nextYear}-03-31`;
      }
    }
    
    console.log('st=======', st);
    console.log('ed=======', ed);

    const result = staff.incentiveList.filter(ele=>
      ele.time >= st && ele.time <= ed);
    
    console.log('result=========', result);
    res.status(200).json({arr: result, st: st, ed: ed});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
}

// READ all staff
exports.getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find()
      .populate('classroom')
      .populate('incentiveList.incentive');
    
    const realStaffList = staffList.filter(item=>item.name !== 'Admin');
    
    res.status(200).json(realStaffList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ one staff by ID
exports.getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id)
      .populate('classroom')
      .populate('incentiveList.incentive');
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ one staff by Name
exports.getStaffByName = async (req, res) => {
  try {
    const staff = await Staff.findOne({name: req.params.name})
      .populate('classroom')
      .populate('incentiveList.incentive');
    
    console.log('staff************', staff);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.json({name: staff.name, type: staff.type});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE staff
exports.updateStaff = async (req, res) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedStaff) return res.status(404).json({ message: 'Staff not found' });
    res.json(updatedStaff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE staff
exports.deleteStaff = async (req, res) => {
  try {
    const deletedStaff = await Staff.findByIdAndDelete(req.params.id);
    if (!deletedStaff) return res.status(404).json({ message: 'Staff not found' });
    res.json({ message: 'Staff deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};