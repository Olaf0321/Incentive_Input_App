const Staff = require('../models/Staff');
const Incentive = require('../models/Incentive');
const Classroom = require('../models/Classroom');

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

const getStAndEdDate = (currentYear, currentMonth, type) => {
    let st = '', ed = '';
    if (type == '上期一括\nCSV出力' || type == '上期エリア、\n事業ごと\nCSV出力' || type == '上期個別\nCSV出力') {
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
    return { st: st, ed: ed };
}

exports.getDataAndTItle = async (req, res) => {
    try {
        const { type } = req.body;
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        const staff = await Staff.find()
            .populate('classroom')
            .populate('incentiveList.incentive');
        const incentive = await Incentive.find();
        console.log('currentYear&Month', currentYear, currentMonth);
        const result = getStAndEdDate(currentYear, currentMonth, type);
        const st = result.st, ed = result.ed;
        const regularIncentive = incentive.filter(ele => ele.type == '正社員用');
        const regularStaff = staff.filter(ele => ele.type == '正社員');
        const partTimeIncentive = incentive.filter(ele => ele.type == 'パートアルバイト用');
        const partTimeStaff = staff.filter(ele => ele.type == 'パートアルバイト');
        const totalClassroom = await Classroom.find();
        const classroom = totalClassroom.filter(ele => ele.name != 'AdminClassroom');

        if (type == "上期一括\nCSV出力" || type == '下期一括\nCSV出力') {
            let regularData = [];
            for (let i = 0; i < regularIncentive.length; i++) {
                const incentiveName = regularIncentive[i].name;
                let ele = { 'No': i + 1, '社員用インセンティブ項目': incentiveName };
                for (let j = 0; j < regularStaff.length; j++) {
                    const incentiveList = regularStaff[j].incentiveList;
                    const staffName = regularStaff[j].name;
                    const realList = incentiveList.filter(ele => ele.time >= st && ele.time <= ed && ele.incentive.name == incentiveName);
                    let sum = 0;
                    for (let k = 0; k < realList.length; k++) sum += realList[k].grade;
                    ele = { ...ele, [staffName]: sum };
                }
                regularData.push(ele);
            }

            let partTimeData = [];
            for (let i = 0; i < partTimeIncentive.length; i++) {
                const incentiveName = partTimeIncentive[i].name;
                let ele = { 'No': i + 1, 'パートアルバイト用インセンティブ項目': incentiveName };
                for (let j = 0; j < partTimeStaff.length; j++) {
                    const incentiveList = partTimeStaff[j].incentiveList;
                    const staffName = partTimeStaff[j].name;
                    const realList = incentiveList.filter(ele => ele.time >= st && ele.time <= ed && ele.incentive.name == incentiveName);
                    let sum = 0;
                    for (let k = 0; k < realList.length; k++) sum += realList[k].grade;
                    ele = { ...ele, [staffName]: sum };
                }
                partTimeData.push(ele);
            }
            const title = type == '上期一括\nCSV出力' ? `${st.substring(0, 4)}年上期一括出力` : `${st.substring(0, 4)}年下期一括出力`
            res.json({
                regularData: regularData,
                partTimeData: partTimeData,
                title: title
            })
        } else if (type == '上期エリア、\n事業ごと\nCSV出力' || type == '下期エリア、\n事業ごと\nCSV出力') {
            let result = [];
            for (let i = 0; i < classroom.length; i++) {
                let totalData = [];
                let totalPrice = 0;
                const classroomName = classroom[i].name;
                const regularStaffOfThisClassroom = regularStaff.filter(ele => ele.classroom.name == classroomName);
                const numberOfregularStaff = regularStaffOfThisClassroom.length;
                totalData.push({ 'No': '社員用', '給与項目': `${numberOfregularStaff}人`, '単価': '', '等級の合計': '', '金額': '' });
                for (let j = 0; j < regularIncentive.length; j++) {
                    const incentiveName = regularIncentive[j].name;
                    let ele = { 'No': j + 1, '給与項目': incentiveName, '単価': regularIncentive[j].unit_price };
                    let sum = 0;
                    for (let k = 0; k < numberOfregularStaff; k++) {
                        const eachStaff = regularStaffOfThisClassroom[k];
                        console.log('realList', eachStaff);
                        console.log('st', st);
                        console.log('ed', ed);
                        const realList = eachStaff.incentiveList.filter(ele => ele.time >= st && ele.time <= ed && ele.incentive.name == incentiveName);
                        for (let l = 0; l < realList.length; l++) sum += realList[l].grade;
                    }
                    const total_upper_limit = regularIncentive[i].upper_limit * numberOfregularStaff;
                    ele = { ...ele, '等級の合計': `${sum} / ${total_upper_limit}` };
                    const value = total_upper_limit < sum ? total_upper_limit : sum;
                    const curPrice = regularIncentive[j].unit_price * value;
                    ele = { ...ele, '金額': curPrice };
                    totalPrice += curPrice;
                    totalData.push(ele);
                }

                const partTimeStaffOfThisClassroom = partTimeStaff.filter(ele => ele.classroom.name == classroomName);
                const numberOfPartTimeStaff = partTimeStaffOfThisClassroom.length;
                totalData.push({ 'No': 'パートアルバイト用', '給与項目': `${numberOfPartTimeStaff}人`, '単価': '', '等級の合計': '', '金額': '' });
                for (let j = 0; j < partTimeIncentive.length; j++) {
                    const incentiveName = partTimeIncentive[j].name;
                    let ele = { 'No': j + 1, '給与項目': incentiveName, '単価': partTimeIncentive[j].unit_price };
                    let sum = 0;
                    for (let k = 0; k < numberOfPartTimeStaff; k++) {
                        const eachStaff = partTimeStaffOfThisClassroom[k];
                        const realList = eachStaff.incentiveList.filter(ele => ele.time >= st && ele.time <= ed && ele.incentive.name == incentiveName);
                        for (let l = 0; l < realList.length; l++) sum += realList[l].grade;
                    }
                    const total_upper_limit = partTimeIncentive[j].upper_limit * numberOfPartTimeStaff;
                    ele = { ...ele, '等級の合計': `${sum} / ${total_upper_limit}` };
                    const value = total_upper_limit < sum ? total_upper_limit : sum;
                    const curPrice = partTimeIncentive[j].unit_price * value;
                    ele = { ...ele, '金額': curPrice };
                    totalPrice += curPrice;
                    totalData.push(ele);
                }
                totalData.push({'No': '合計', '給与項目': '', '単価': '', '等級の合計': '', '金額': totalPrice });
                // const title = type == '上期エリア、\n事業ごと\nCSV出力' ? `${st.substring(0, 4)}年上期エリアごと出力(${classroomName})` : `${st.substring(0, 4)}年下期エリアごと出力(${classroomName})`;
                const title = type == '上期エリア、\n事業ごと\nCSV出力' ? `${st.substring(0, 4)}年上期エリアごと出力${classroomName}` : `${st.substring(0, 4)}年下期エリアごと出力${classroomName}`;
                result.push({
                    data: totalData,
                    title: title
                });
            }
            console.log('totalData', result[0].data);
            res.json({
                totalData: result
            });
        } else {
            let result = [];
            for (let i = 0; i < staff.length; i++) {
                let totalData = [];
                let totalPrice = 0;
                const staffName = staff[i].name;
                if (staffName == 'Admin') continue;
                console.log('staffName', staffName);
                const incentiveList = staff[i].incentiveList;
                
                const totalIncentive = staff[i].type == '正社員' ? regularIncentive : partTimeIncentive;

                console.log('incentiveList', incentiveList);

                for (let j = 0; j < totalIncentive.length; j++) {
                    const eachIncentive = totalIncentive[j];
                    let ele = { 'No': j + 1, '給与項目': eachIncentive.name, '単価': eachIncentive.unit_price };
                    let sum = 0;
                    const realList = incentiveList.filter(ele=>ele.time >= st && ele.time <= ed && ele.incentive.name == eachIncentive.name);
                    console.log('realList', realList);
                    for (let k = 0; k < realList.length; k++) sum += realList[k].grade;
                    ele = { ...ele, '合計': `${sum} / ${eachIncentive.upper_limit}` };
                    const value = eachIncentive.upper_limit < sum ? eachIncentive.upper_limit : sum;
                    const curPrice = eachIncentive.unit_price * value;
                    ele = { ...ele, '金額': curPrice };
                    totalPrice += curPrice;
                    totalData.push(ele);
                }

                totalData.push({'No': '合計', '給与項目': '', '単価': '', '合計': '', '金額': totalPrice });
                // const title = type == '上期エリア、\n事業ごと\nCSV出力' ? `${st.substring(0, 4)}年上期エリアごと出力(${classroomName})` : `${st.substring(0, 4)}年下期エリアごと出力(${classroomName})`;
                const title = type == '上期個別\nCSV出力' ? `${st.substring(0, 4)}年上期個別出力${staffName}` : `${st.substring(0, 4)}年下期個別出力${staffName}`;
                result.push({
                    data: totalData,
                    title: title
                });
            }
            console.log('totalData', result);
            res.json({
                totalData: result
            });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};