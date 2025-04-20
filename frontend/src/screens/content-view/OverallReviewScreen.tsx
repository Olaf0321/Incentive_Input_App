import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Dimensions,
    SafeAreaView
} from "react-native";
import SERVER_URL from "../../../config";
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get("window");

const OverallReviewScreen = ({ navigation }: any) => {
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
                headers: { "Content-Type": "application/json" }
            });
            const employeesData = await allStaff.json();

            for (let i = 0; i < employeesData.length; i++) {
                const employee = employeesData[i];
                const empData = {
                    name: employee.name,
                    role: employee.type,
                    area: employee.classroom.name,
                    id: employee._id
                };
                if (employee.type === '正社員') {
                    regularArr.push(empData);
                } else {
                    partTimeArr.push(empData);
                }
            }

            setRegularEmployees([...regularArr]);
            setPartTimeEmployees([...partTimeArr]);

            regularArr = [];
            partTimeArr = [];

            const allIncentives = await fetch(`${SERVER_URL}api/incentive/`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });
            const incentivesData = await allIncentives.json();

            for (let i = 0; i < incentivesData.length; i++) {
                const item = incentivesData[i];
                const incentive = {
                    name: item.name,
                    type: item.type,
                    unit_price: item.unit_price,
                    upper_limit: item.upper_limit,
                    id: item._id
                };
                if (item.type === '正社員') {
                    regularArr.push(incentive);
                } else {
                    partTimeArr.push(incentive);
                }
            }

            setIncentives([...regularArr, ...partTimeArr]);

            const classroomRes = await fetch(`${SERVER_URL}api/classrooms/`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });
            const classroomData = await classroomRes.json();

            const arr = classroomData
                .filter((ele: any) => ele.name !== 'AdminClassroom')
                .map((ele: any) => ({
                    name: ele.name,
                    loginId: ele.loginId,
                    password: ele.password,
                    id: ele._id
                }));

            setClassroom([...arr]);
        } catch (err) {
            Alert.alert(`error: ${err}`);
        }
    }

    useEffect(() => {
        if (isFocused) {
            init();
        }
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerText}>内容閲覧・全体・各教室・編集・CSV出力</Text>
                <Text style={styles.subtitle}>全体</Text>
            </View>
            <ScrollView style={styles.container}>

                <Text style={styles.sectionTitle}>正社員</Text>
                <View style={styles.table}>
                    <View style={styles.tableRowHeader}>
                        <Text style={styles.tableHeader}>氏名</Text>
                        <Text style={styles.tableHeader}>職別</Text>
                        <Text style={styles.tableHeader}>エリア及び事業</Text>
                    </View>
                    {regularEmployees.length > 0 ? regularEmployees.map((emp, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate('従業員詳細', { employee: emp })}
                            style={styles.tableRow}
                        >
                            <Text style={styles.tableCell}>{emp.name}</Text>
                            <Text style={styles.tableCell}>{emp.role}</Text>
                            <Text style={styles.tableCell}>{emp.area}</Text>
                        </TouchableOpacity>
                    )) : (
                        <View style={styles.tableRow}>
                            <Text style={styles.tablenone}>登録されたスタッフはありません。</Text>
                        </View>
                    )}
                </View>

                <Text style={styles.sectionTitle}>パート・アルバイト</Text>
                <View style={styles.table}>
                    <View style={styles.tableRowHeader}>
                        <Text style={styles.tableHeader}>氏名</Text>
                        <Text style={styles.tableHeader}>職別</Text>
                        <Text style={styles.tableHeader}>エリア及び事業</Text>
                    </View>
                    {partTimeEmployees.length > 0 ? partTimeEmployees.map((emp, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate('従業員詳細', { employee: emp })}
                            style={styles.tableRow}
                        >
                            <Text style={styles.tableCell}>{emp.name}</Text>
                            <Text style={styles.tableCell}>{emp.role}</Text>
                            <Text style={styles.tableCell}>{emp.area}</Text>
                        </TouchableOpacity>
                    )) : (
                        <View style={styles.tableRow}>
                            <Text style={styles.tablenone}>登録されたスタッフはありません。</Text>
                        </View>
                    )}
                </View>

                <Text style={styles.sectionTitle}>インセンティブ一覧</Text>
                <View style={styles.table}>
                    <View style={styles.tableRowHeader}>
                        <Text style={styles.tableHeader}>給与項目</Text>
                        <Text style={styles.tableHeader}></Text>
                    </View>
                    {incentives.length > 0 ? incentives.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate('インセンティブ詳細', { curIncentive: item })}
                            style={styles.tableRow}
                        >
                            <Text style={styles.tableCell}>{item.name}</Text>
                            <Text style={styles.tableCell}>{item.type}</Text>
                        </TouchableOpacity>
                    )) : (
                        <View style={styles.tableRow}>
                            <Text style={styles.tablenone}>登録されたインセンティブはありません。</Text>
                        </View>
                    )}
                </View>

                <Text style={styles.sectionTitle}>教室一覧</Text>
                <View style={styles.table}>
                    <View style={styles.tableRowHeader}>
                        <Text style={styles.tableHeader}>番号</Text>
                        <Text style={styles.tableHeader}>教室</Text>
                    </View>
                    {classroom.length > 0 ? classroom.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate('教室の詳細', { curClassroom: item })}
                            style={styles.tableRow}
                        >
                            <Text style={styles.tableCell}>{index + 1}</Text>
                            <Text style={styles.tableCell}>{item.name}</Text>
                        </TouchableOpacity>
                    )) : (
                        <View style={styles.tableRow}>
                            <Text style={styles.tablenone}>登録された教室はありません。</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OverallReviewScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        paddingHorizontal: width * 0.05,
    },
    container: {
        flex: 1,
        marginTop: 140
    },
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: width * 0.04
    },
    headerText: {
        fontSize: width * 0.055,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
    },
    subtitle: {
        fontSize: width * 0.045,
        color: "#555",
        textAlign: "center",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: width * 0.045,
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
        fontSize: width * 0.035,
        textAlign: "center",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingVertical: 8,
    },
    tableCell: {
        flex: 1,
        fontSize: width * 0.035,
        textAlign: "center",
    },
    tablenone: {
        flex: 1,
        fontSize: width * 0.035,
        textAlign: "left",
        marginLeft: width * 0.08,
    },
});
