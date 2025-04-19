// controllers/staffController.js
const Staff = require('../models/Staff');
const Incentive = require('../models/Incentive');
const Classroom = require('../models/Classroom');

// CREATE a new staff
exports.createStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    console.log("staff", staff);
    const { name, type, classroom } = staff;
    const response = await Staff.findOne({ name: name });

    console.log('response', response);

    if (response != null) {
      res.status(200).json({
        code: 0,
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

exports.addIncentive = async (req, res) => {
  try {
    const data = req.body;
    console.log('data', data);
    const { staffName, time, incentiveName, quantity } = data;

    const staff = await Staff.findOne({ name: staffName });
    const incentive = await Incentive.findOne({ name: incentiveName });

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
    res.status(400).json({ error: err.message });
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

const changeMonth = (month) => {
  return month.length == 1 ? `0${month}` : month
}

//Read incentive list by period
exports.getIncentivesListByPeriod = async (req, res) => {
  try {
    const data = req.body;
    console.log('data', data);
    const { name, currentYear, oldMonth, status } = data;

    const currentMonth = changeMonth(oldMonth);

    const staff = await Staff.findOne({ name: name })
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

    const result = staff.incentiveList.filter(ele =>
      ele.time >= st && ele.time <= ed);

    console.log('result=========', result);
    res.status(200).json({ arr: result, st: st, ed: ed });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.deleteIncentive = async (req, res) => {
  console.log('##########');
  try {
    const data = req.body;
    console.log('data', data);
    const { currentYear, oldMonth, status } = data;
    const currentMonth = changeMonth(oldMonth);


    const allStaff = await Staff.find()
      .populate('classroom')
      .populate('incentiveList.incentive');

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
    console.log('allStaff', allStaff);

    for (let i = 0; i < allStaff.length; i++) {
      const ele = allStaff[i];
      if (ele.name == process.env.DEFAULT_ADMIN_NAME) continue;
      ele.incentiveList = ele.incentiveList.filter(ind => ind.time < st || ind.time > ed);
      await ele.save();
    }
    res.status(200).json({code: 1});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const getFebruaryDates = (stringOfYear) => {
  const numberOfYear = Number(stringOfYear);
  const month = 1; // February (0 = Jan, 1 = Feb, etc.)
  const daysInFebruary = new Date(numberOfYear, month + 1, 0).getDate(); // 28 or 29

  const stringOfDaysInFeburary = String(daysInFebruary);
  return stringOfDaysInFeburary;
}

const dates = {
  '01': '31',
  '02': '28',
  '03': '31',
  '04': '30',
  '05': '31',
  '06': '30',
  '07': '31',
  '08': '31',
  '09': '30',
  '10': '31',
  '11': '30',
  '12': '31',
}

//Read incentive list by month
exports.getIncentivesListByMonth = async (req, res) => {
  try {
    const data = req.body;
    console.log('data', data);
    const { name, selectedYear, oldSelectedMonth } = data;

    const selectedMonth = changeMonth(oldSelectedMonth);

    const staff = await Staff.findOne({ name: name })
      .populate('classroom')
      .populate('incentiveList.incentive');

    let st = '', ed = '';

    if (selectedMonth != '02') {
      st = `${selectedYear}-${selectedMonth}-01`;
      ed = `${selectedYear}-${selectedMonth}-${dates[selectedMonth]}`;
    } else {
      const dateOfFeburary = getFebruaryDates(selectedYear);
      st = `${selectedYear}-${selectedMonth}-01`;
      ed = `${selectedYear}-${selectedMonth}-${dateOfFeburary}`;
    }

    console.log('st***********', st);
    console.log('ed***********', ed);

    const result = staff.incentiveList.filter(ele =>
      ele.time >= st && ele.time <= ed);

    const newAmountArr = {};

    result.map(ele => newAmountArr[ele.incentive.name] = 0);
    result.map(ele => newAmountArr[ele.incentive.name] += ele.grade);

    res.status(200).json({ arr: newAmountArr });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

//Change incentiveList
exports.changeIncentivesList = async (req, res) => {
  try {
    const data = req.body;
    console.log('data', data);
    const { name, selectedYear, oldSelectedMonth, incentiveName, amount } = data;

    const selectedMonth = changeMonth(oldSelectedMonth);

    const staff = await Staff.findOne({ name: name })
      .populate('classroom')
      .populate('incentiveList.incentive');

    let st = '', ed = '';

    if (selectedMonth != '02') {
      st = `${selectedYear}-${selectedMonth}-01`;
      ed = `${selectedYear}-${selectedMonth}-${dates[selectedMonth]}`;
    } else {
      const dateOfFeburary = getFebruaryDates(selectedYear);
      st = `${selectedYear}-${selectedMonth}-01`;
      ed = `${selectedYear}-${selectedMonth}-${dateOfFeburary}`;
    }

    const result = staff.incentiveList.filter(ele =>
      ele.time >= st && ele.time <= ed && ele.incentive.name == incentiveName);

    console.log('result-incentiveList', result);

    let realAmount = 0;

    for (let i = 0; i < result.length; i++) {
      let ele = result[i];
      console.log('grade', ele.grade);
      realAmount += Number(ele.grade);
    }

    console.log('real-amount', realAmount);

    const rlt = await Incentive.findOne({ name: incentiveName });

    console.log('rlt', rlt);

    if (realAmount < amount) {
      staff.incentiveList.push({
        time: ed,
        incentive: rlt._id,
        grade: amount - realAmount
      });
      const newItem = await staff.save();
      console.log('newItem correctly created!!!', newItem);
    }
    else if (realAmount > amount) {
      let deletedData = [];
      let updatedData = {};
      const differ = realAmount - amount;
      let curGrade = 0;
      for (let i = 0; i < result.length; i++) {
        let ele = result[i];
        let val = curGrade + Number(ele.grade);
        if (val < differ) {
          deletedData.push({
            id: ele._id
          });
          curGrade = val;
        } else if (val > differ) {
          updatedData = {
            id: ele._id,
            updatedGrade: val - differ
          };
          break;
        } else {
          deletedData.push({
            id: ele._id
          });
          break;
        }
      }
      let newIncentiveList = [];
      for (let i = 0; i < staff.incentiveList.length; i++) {
        const ele = staff.incentiveList[i];
        let flag = false;
        for (let j = 0; j < deletedData.length; j++) {
          if (ele._id != deletedData[j].id) continue;
          flag = true; break;
        }
        if (flag == true) continue;
        if (ele._id == updatedData.id) {
          let updatedIncentive = ele;
          updatedIncentive.grade = updatedData.updatedGrade;
          newIncentiveList.push(updatedIncentive);
        } else {
          newIncentiveList.push(ele);
        }
      }
      console.log(newIncentiveList, 'newIncentiveList');
      staff.incentiveList = newIncentiveList;
      const newStaff = await staff.save();
      console.log('decrease correctly: ', newStaff);
    }
    res.status(200).json({ arr: newAmountArr });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


// READ all staff
exports.getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find()
      .populate('classroom')
      .populate('incentiveList.incentive');

    const realStaffList = staffList.filter(item => item.name !== 'Admin');

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
    const staff = await Staff.findOne({ name: req.params.name })
      .populate('classroom')
      .populate('incentiveList.incentive');

    console.log('staff************', staff);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.json({ name: staff.name, type: staff.type });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE staff
exports.updateStaff = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, classroomName, type } = req.body;

    const originStaff = await Staff.findById(id);
    const newStaff = await Staff.findOne({ name: name });
    const classroom = await Classroom.findOne({ name: classroomName });

    const newObj = {
      name: name,
      type: type,
      classroom: classroom._id
    }

    if (newStaff != null && newStaff.name != originStaff.name) {
      res.json({ code: 0 });
    } else {
      const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, newObj, {
        new: true,
        runValidators: true
      });
      console.log('updatedStaff', updatedStaff);
      if (!updatedStaff) return res.status(404).json({ message: 'Staff not found' });
      res.json({ code: 1, updatedStaff: updatedStaff });
    }
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