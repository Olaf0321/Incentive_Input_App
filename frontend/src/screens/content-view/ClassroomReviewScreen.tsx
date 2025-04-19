import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
import SERVER_URL from "../../../config";
import { useIsFocused } from '@react-navigation/native';

const EmployeeListScreen = ({ navigation }: any) => {
    const [allStaff, setAllStaff] = useState<any[]>([]);
    const [allClassroom, setAllClassroom] = useState<any[]>([]);
    const [eachStaff, setEachStaff] = useState<{ [key: string]: any[] }>({});
    const [numberOfClassroom, setNumberOfClassroom] = useState(0);
    const isFocused = useIsFocused();

    const init = async () => {
        try {
            const staffRes = await fetch(`${SERVER_URL}api/staff/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const staffData = await staffRes.json();
            setAllStaff(staffData);

            const classroomRes = await fetch(`${SERVER_URL}api/classrooms/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const classroomData = await classroomRes.json();
            setAllClassroom(classroomData.filter((ele:any)=>ele.name !== 'AdminClassroom'));
            setNumberOfClassroom(classroomData.length - 1);

            let grouped: { [key: string]: any[] } = {};
            for (let i = 0; i < classroomData.length; i++) {
                const classroomName = classroomData[i].name;
                const filteredStaff = staffData.filter((staff: any) => {
                        return staff.classroom?.name === classroomName;
                });
                const newArr = [];
                for (let j = 0; j < filteredStaff.length; j++) {
                    const ele = filteredStaff[j];
                    newArr.push({
                        name: ele.name,
                        area: ele.classroom.name,
                        role: ele.type,
                        id: ele._id
                    })
                }
                grouped[classroomName] = newArr;
            }

            setEachStaff(grouped);

        } catch (err: any) {
            Alert.alert("エラー", `${err.message || err}`);
        }
    };

    useEffect(() => {
        if (isFocused) {
            init();
        }
    }, [isFocused]); // <-- Add empty dependency array to prevent infinite loop

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>内容閲覧・全体・各教室・編集・CSV出力</Text>
            <Text style={styles.subtitle}>各教室</Text>

            <Text style={styles.addtitle}>登録された教室数： {numberOfClassroom}</Text>

            {allClassroom.map((ele, idx) => (
                <View key={idx}>
                    <Text style={styles.sectionTitle}>{ele.name}</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRowHeader}>
                            <Text style={styles.tableHeader}>番号</Text>
                            <Text style={styles.tableHeader}>氏名</Text>
                            <Text style={styles.tableHeader}>職別</Text>
                        </View>

                        {eachStaff[ele.name]?.length > 0 ? (
                            eachStaff[ele.name].map((emp, index) => (
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
                                    <Text style={styles.tableCell}>{emp.role}</Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.tablenone}>該当者がいません。</Text>
                        )}
                    </View>
                </View>
            ))}
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
    addtitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
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
        marginLeft: 30,
        paddingVertical: 10,
    }
});
