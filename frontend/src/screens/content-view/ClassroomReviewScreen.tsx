// import React, { useEffect, useState } from "react";
// import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
// import SERVER_URL from "../../../config";

// const EmployeeListScreen = ({ navigation }: any) => {
//     const [allStaff, setAllStaff] = useState([]);
//     const [allClassroom, setAllClassroom] = useState([]);
//     const [eachStaff, setEachStaff] = useState({});

//     const init = async () => {
//         try {
//             const allStaff = await fetch(`${SERVER_URL}api/staff/`, {
//                 method: 'GET',
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });
//             const allStaffData = await allStaff.json();
//             setAllStaff(allStaffData);

//             const allClassroom = await fetch(`${SERVER_URL}api/classrooms/`, {
//                 method: 'GET',
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });
//             const allClassroomData = await allClassroom.json();
//             setAllClassroom(allClassroomData);

//             let each = {};
//             for (let i = 0; i < allClassroomData.length; i++) {
//                 const eachClassroomName = allClassroomData[i].name;
//                 const arr = allStaffData.filter(ele=>ele.classrooms.name == eachClassroomName);
//                 each = {...each, [eachClassroomName]: arr};
//             }

//             setEachStaff(each);

//         } catch (err) {
//             Alert.alert(`error: ${err}`);
//         }
//     }

//     useEffect(() => {
//         init();
//     })

//     return (
//         <ScrollView style={styles.container}>
//             {/* Header */}
//             <Text style={styles.headerText}>内容閲覧・全体・各教室・編集・CSV出力</Text>
//             <Text style={styles.subtitle}>各教室</Text>

//             {
//                 allClassroom.map((ele, idx) => {
//                     <Text style={styles.sectionTitle} key={idx}>{ele.name}</Text>
//                     <View style={styles.table}>
//                         <View style={styles.tableRowHeader}>
//                             <Text style={styles.tableHeader}>No</Text>
//                             <Text style={styles.tableHeader}>氏名</Text>
//                             <Text style={styles.tableHeader}>職別</Text>
//                         </View>
//                         {eachStaff[ele.name].length > 0 && eachStaff[ele.name].map((emp, index) => (
//                             <TouchableOpacity
//                                 key={index}
//                                 onPress={() =>
//                                     navigation.navigate('従業員詳細', {
//                                         employee: emp,
//                                     })
//                                 }
//                                 style={styles.tableRow}
//                             >
//                                 <Text style={styles.tableCell}>{index+1}</Text>
//                                 <Text style={styles.tableCell}>{emp.name}</Text>
//                                 <Text style={styles.tableCell}>{emp.type}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 })
//             }
//         </ScrollView>
//     );
// };

// export default EmployeeListScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#FFFFFF",
//         paddingHorizontal: 15,
//         paddingVertical: 20,
//     },
//     headerText: {
//         fontSize: 22,
//         fontWeight: "bold",
//         textAlign: "center",
//         marginBottom: 15,
//     },
//     subtitle: {
//         fontSize: 18,
//         color: "#555",
//         textAlign: "center",
//         marginBottom: 20,
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: "bold",
//         marginTop: 20,
//         marginBottom: 10,
//     },
//     table: {
//         borderWidth: 1,
//         borderColor: "#000",
//         marginBottom: 50,
//     },
//     tableRowHeader: {
//         flexDirection: "row",
//         backgroundColor: "#2B5DAE",
//         paddingVertical: 8,
//     },
//     tableHeader: {
//         flex: 1,
//         color: "#FFFFFF",
//         fontWeight: "bold",
//         textAlign: "center",
//     },
//     tableRow: {
//         flexDirection: "row",
//         borderBottomWidth: 1,
//         borderBottomColor: "#000",
//         paddingVertical: 5,
//     },
//     tableCell: {
//         flex: 1,
//         textAlign: "center",
//     },
//     tablenone: {
//         flex: 1,
//         textAlign: "left",
//         marginLeft: 30
//     }
// });
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
import SERVER_URL from "../../../config";

const EmployeeListScreen = ({ navigation }: any) => {
    const [allStaff, setAllStaff] = useState<any[]>([]);
    const [allClassroom, setAllClassroom] = useState<any[]>([]);
    const [eachStaff, setEachStaff] = useState<{ [key: string]: any[] }>({});
    const [numberOfClassroom, setNumberOfClassroom] = useState(0);

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
                grouped[classroomName] = filteredStaff;
            }

            setEachStaff(grouped);

        } catch (err: any) {
            Alert.alert("エラー", `${err.message || err}`);
        }
    };

    useEffect(() => {
        init();
    }, []); // <-- Add empty dependency array to prevent infinite loop

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
                                    <Text style={styles.tableCell}>{emp.type}</Text>
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
