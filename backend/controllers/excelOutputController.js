const Staff = require('../models/Staff');
const Incentive = require('../models/Incentive');

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
            .populate('incentiveList.incentive');
        const incentive = await Incentive.find();

        console.log('staff=======', staff);
        console.log('incentive===========', incentive);

        const result = getStAndEdDate(currentYear, currentMonth, type);
        const st = result.st, ed = result.ed;
        console.log('period=======', st, ed);

        if (type == "上期一括\nCSV出力" || type == '下期一括\nCSV出力') {
            const regularIncentive = incentive.filter(ele => ele.type == '正社員用');
            const regularStaff = staff.filter(ele => ele.type == '正社員');
            console.log('regularIncentive=======', regularIncentive);
            console.log('regularStaff=======', regularStaff);
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

            const partTimeIncentive = incentive.filter(ele => ele.type == 'パートアルバイト用');
            const partTimeStaff = staff.filter(ele => ele.type == 'パートアルバイト');

            let partTimeData = [];
            for (let i = 0; i < partTimeIncentive.length; i++) {
                const incentiveName = partTimeIncentive[i].name;
                let ele = { 'No': i + 1, '社員用インセンティブ項目': incentiveName };
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

            console.log('regularData: ', regularData);
            console.log('partTimeData: ', partTimeData);
            const title = type == '上期一括\nCSV出力' ? `${st.substring(0, 4)}年上期一括出力` : `${st.substring(0, 4)}年下期一括出力`
            res.json({
                regularData: regularData,
                partTimeData: partTimeData,
                title: title
            })
        } else if (type == '上期エリア、\n事業ごと\nCSV出力') {

        } else if (type == '下期エリア、\n事業ごと\nCSV出力') {

        } else if (type == '上期個別\nCSV出力') {

        } else if (type == '下期個別\nCSV出力') {

        }

        // const result = await InputPossibility.findOne({ period: period });

        // if (!result) return res.status(404).json({ message: 'Incentive not found' });
        // res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};