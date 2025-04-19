import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
import SERVER_URL from "../../../config";

const BulkEditingScreen = ({ navigation }: any) => {
    // Sample Data (Assuming received from backend)
    const [regularEmployees, setRegularEmployees] = useState([
        { name: "宮本 和弘", role: "正社員", area: "A教室" }
    ]);

    const [partTimeEmployees, setPartTimeEmployees] = useState([
        { name: "A", role: "パート・アルバイト", area: "A教室" }
    ]);

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
        } catch (err) {
            Alert.alert(`error: ${err}`);
        }
    }

    useEffect(() => {
        init();
    })

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <Text style={styles.headerText}>内容閲覧・全体・各教室・編集・CSV出力</Text>
            <Text style={styles.subtitle}>一括編集</Text>

            {/* Regular Employees Table */}
            <Text style={styles.sectionTitle}>正社員用</Text>
            <View style={styles.table}>
                <View style={styles.tableRowHeader}>
                    <Text style={styles.tableHeader}>番号</Text>
                    <Text style={styles.tableHeader}>氏名</Text>
                </View>
                {regularEmployees.length > 0 && regularEmployees.map((emp, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() =>
                            navigation.navigate('一括編集詳細', {
                                employee: emp,
                            })
                        }
                        style={styles.tableRow}
                    >
                        <Text style={styles.tableCell}>{index + 1}</Text>
                        <Text style={styles.tableCell}>{emp.name}</Text>
                    </TouchableOpacity>
                ))}
                {regularEmployees.length == 0 &&
                    <View style={styles.tableRow}>
                        <Text style={styles.tablenone}>登録されたスタッフはありません。</Text>
                    </View>
                }
            </View>

            {/* Part-Time Employees Table */}
            <Text style={styles.sectionTitle}>パートアルバイト用</Text>
            <View style={styles.table}>
                <View style={styles.tableRowHeader}>
                    <Text style={styles.tableHeader}>番号</Text>
                    <Text style={styles.tableHeader}>氏名</Text>
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
                        <Text style={styles.tableCell}>{index + 1}</Text>
                        <Text style={styles.tableCell}>{emp.name}</Text>
                    </TouchableOpacity>
                ))}
                {partTimeEmployees.length == 0 &&
                    <View style={styles.tableRow}>
                        <Text style={styles.tablenone}>登録されたスタッフはありません。</Text>
                    </View>
                }
            </View> 
        </ScrollView>
    );
};

export default BulkEditingScreen;

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
        marginBottom: 50,
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
    }
});
