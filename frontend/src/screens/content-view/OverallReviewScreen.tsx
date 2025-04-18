import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
import SERVER_URL from "../../../config";
import { useIsFocused } from '@react-navigation/native';

const EmployeeListScreen = ({ navigation }: any) => {
    // Sample Data (Assuming received from backend)
    const [regularEmployees, setRegularEmployees] = useState([
        { name: "宮本 和弘", role: "正社員", area: "A教室" },
    ]);

    const [partTimeEmployees, setPartTimeEmployees] = useState([
        { name: "A", role: "パート・アルバイト", area: "A教室" },
    ]);

    const [incentives, setIncentives] = useState([
        { name: "セクリハ提出", type: "正社員用", unit_price: '', upper_limit: '', id: '' },
    ]);

    const [classroom, setClassroom] = useState([
        { name: "セクリハ提出", loginId: '', password: "", id: '' }
    ]);
    const isFocused = useIsFocused();

    const init = async () => {
        try {
            let regularArr = [], partTimeArr = [];
            const allStaff = await fetch(`${SERVER_URL}api/staff/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const employeesData = await allStaff.json();

            for (let i = 0; i < employeesData.length; i++) {
                if (employeesData[i].type == '正社員') {
                    regularArr.push({
                        name: employeesData[i].name,
                        role: employeesData[i].type,
                        area: employeesData[i].classroom.name,
                        id: employeesData[i]._id
                    });
                } else {
                    partTimeArr.push({
                        name: employeesData[i].name,
                        role: employeesData[i].type,
                        area: employeesData[i].classroom.name,
                        id: employeesData[i]._id
                    });
                }
            }

            setRegularEmployees([...regularArr]);
            setPartTimeEmployees([...partTimeArr]);

            regularArr = [], partTimeArr = [];

            const allIncentives = await fetch(`${SERVER_URL}api/incentive/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const incentivesData = await allIncentives.json();

            for (let i = 0; i < incentivesData.length; i++) {
                if (incentivesData[i].type == '正社員') {
                    regularArr.push({
                        name: incentivesData[i].name,
                        type: incentivesData[i].type,
                        unit_price: incentivesData[i].unit_price,
                        upper_limit: incentivesData[i].upper_limit,
                        id: incentivesData[i]._id
                    });
                } else {
                    partTimeArr.push({
                        name: incentivesData[i].name,
                        type: incentivesData[i].type,
                        unit_price: incentivesData[i].unit_price,
                        upper_limit: incentivesData[i].upper_limit,
                        id: incentivesData[i]._id
                    });
                }
            }

            setIncentives([...regularArr, ...partTimeArr]);

            const classroomRes = await fetch(`${SERVER_URL}api/classrooms/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const classroomData = await classroomRes.json();
            let arr = [];
            for (let i = 0; i < classroomData.length; i++) {
                const ele = classroomData[i];
                console.log('ele', ele);
                if (ele.name == 'AdminClassroom') continue;
                arr.push({
                    name: ele.name,
                    loginId: ele.loginId,
                    password: ele.password,
                    id : ele._id
                });
            }
            console.log('arr', arr);
            setClassroom([...arr]);
        } catch (err) {
            Alert.alert(`error: ${err}`);
        }
    }

    useEffect(() => {
        if (isFocused) {
            init();
        }
    }, [isFocused])

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <Text style={styles.headerText}>内容閲覧・全体・各教室・編集・CSV出力</Text>
            <Text style={styles.subtitle}>全体</Text>

            {/* Regular Employees Table */}
            <Text style={styles.sectionTitle}>正社員</Text>
            <View style={styles.table}>
                <View style={styles.tableRowHeader}>
                    <Text style={styles.tableHeader}>氏名</Text>
                    <Text style={styles.tableHeader}>職別</Text>
                    <Text style={styles.tableHeader}>エリア及び事業</Text>
                </View>
                {regularEmployees.length > 0 && regularEmployees.map((emp, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() =>
                            navigation.navigate('従業員詳細', {
                                employee: emp,
                            })
                        }
                        style={styles.tableRow}
                    >
                        <Text style={styles.tableCell}>{emp.name}</Text>
                        <Text style={styles.tableCell}>{emp.role}</Text>
                        <Text style={styles.tableCell}>{emp.area}</Text>
                    </TouchableOpacity>
                ))}
                {regularEmployees.length == 0 &&
                    <View style={styles.tableRow}>
                        <Text style={styles.tablenone}>登録されたスタッフはありません。</Text>
                    </View>
                }
            </View>

            {/* Part-Time Employees Table */}
            <Text style={styles.sectionTitle}>パート・アルバイト</Text>
            <View style={styles.table}>
                <View style={styles.tableRowHeader}>
                    <Text style={styles.tableHeader}>氏名</Text>
                    <Text style={styles.tableHeader}>職別</Text>
                    <Text style={styles.tableHeader}>エリア及び事業</Text>
                </View>

                {partTimeEmployees.length > 0 && partTimeEmployees.map((emp, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() =>
                            navigation.navigate('従業員詳細', {
                                employee: emp,
                            })
                        }
                        style={styles.tableRow}
                    >
                        <Text style={styles.tableCell}>{emp.name}</Text>
                        <Text style={styles.tableCell}>{emp.role}</Text>
                        <Text style={styles.tableCell}>{emp.area}</Text>
                    </TouchableOpacity>
                ))}
                {partTimeEmployees.length == 0 &&
                    <View style={styles.tableRow}>
                        <Text style={styles.tablenone}>登録されたスタッフはありません。</Text>
                    </View>
                }
            </View>

            {/* Incentive Table */}
            <Text style={styles.sectionTitle}>インセンティブ一覧</Text>
            <View style={styles.table}>
                {/* Header */}
                <View style={styles.tableRowHeader}>
                    <Text style={styles.tableHeader}>給与項目</Text>
                    <Text style={styles.tableHeader}></Text>
                </View>

                {/* Incentive List */}
                {incentives.length > 0 && incentives.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() =>
                            navigation.navigate('インセンティブ詳細', {
                                curIncentive: item,
                            })
                        }
                        style={styles.tableRow}
                    >
                        <Text style={styles.tableCell}>{item.name}</Text>
                        <Text style={styles.tableCell}>{item.type}</Text>
                    </TouchableOpacity>
                ))}
                {incentives.length == 0 &&
                    <View style={styles.tableRow}>
                        <Text style={styles.tablenone}>登録されたインセンティブはありません。</Text>
                    </View>
                }
            </View>

            {/* Classroom Table */}
            <Text style={styles.sectionTitle}>教室一覧</Text>
            <View style={styles.table}>
                {/* Header */}
                <View style={styles.tableRowHeader}>
                    <Text style={styles.tableHeader}>番号</Text>
                    <Text style={styles.tableHeader}>教室</Text>
                </View>

                {/* Incentive List */}
                {classroom.length > 0 && classroom.map((item, index) => (

                    <TouchableOpacity
                        key={index}
                        onPress={() =>
                            navigation.navigate('教室の詳細', {
                                curClassroom: item,
                            })
                        }
                        style={styles.tableRow}
                    >
                        <Text style={styles.tableCell}>{index + 1}</Text>
                        <Text style={styles.tableCell}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
                {classroom.length == 0 &&
                    <View style={styles.tableRow}>
                        <Text style={styles.tablenone}>登録された教室はありません。</Text>
                    </View>
                }
            </View>
        </ScrollView>
    );
};

export default EmployeeListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 18,
        color: "#555",
        textAlign: "center",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
    table: {
        borderWidth: 1,
        borderColor: "#000",
        marginBottom: 15,
    },
    tableRowHeader: {
        flexDirection: "row",
        backgroundColor: "#2B5DAE",
        paddingVertical: 8,
    },
    tableHeader: {
        flex: 1,
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingVertical: 5,
    },
    tableCell: {
        flex: 1,
        textAlign: "center",
    },
    tablenone: {
        flex: 1,
        textAlign: "left",
        marginLeft: 30
    },
});
