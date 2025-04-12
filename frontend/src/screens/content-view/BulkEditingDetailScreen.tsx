import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
import SERVER_URL from "../../../config";

const BulkEditingDetailScreen = ({ route }: any) => {
    const { employee } = route.params;
    const [incentives, setIncentives] = useState([
        { name: "", type: "", unit_price: 0, upper_limit: 0 }
    ]);

    const [name, setName] = useState("5");
    const [isEditing, setIsEditing] = useState(false);

    const init = async () => {
        try {
            const response = await fetch(`${SERVER_URL}api/incentive/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            let arr = [];

            for (let i = 0; i < data.length; i++) {
                if (data[i].type !== `${employee.role}用`) continue;
                arr.push({
                    name: data[i].name,
                    type: data[i].type,
                    unit_price: data[i].unit_price,
                    upper_limit: data[i].upper_limit
                });
            }

            setIncentives([...arr]);

        } catch (err) {
            Alert.alert(`error: ${err}`);
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <View style={styles.container}>
            {/* Fixed Header Section */}
            <View style={styles.fixedHeader}>
                <Text style={styles.headerText}>一括編集</Text>
                <Text style={styles.subtitle}>一括編集詳細</Text>
                <Text style={styles.sectionTitle}>{employee.name}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.table}>
                    <View style={styles.tableRowHeader}>
                        <Text style={styles.tableHeader}>インセンティブ項目</Text>
                        <Text style={styles.tableHeader}>上限回数</Text>
                        <Text style={styles.tableHeader}>単価</Text>
                        <Text style={styles.tableHeader}></Text>
                    </View>

                    {incentives.length > 0 && incentives.map((incentive, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{incentive.name}</Text>
                            <Text style={styles.tableCell}>{incentive.upper_limit}</Text>
                            <Text style={styles.tableCell}>{incentive.unit_price}</Text>
                            {isEditing ? (
                                <TextInput
                                    style={[styles.inputCell]}
                                    value={name}
                                    onChangeText={(text) => {
                                        const onlyNumbers = text.replace(/[^0-9]/g, '');
                                        setName(onlyNumbers);
                                    }}
                                    keyboardType="numeric"
                                />
                            ) : (
                                <Text style={styles.tableCell}>{name}</Text>
                            )}
                        </View>
                    ))}
                    {incentives.length == 0 &&
                        <View style={styles.tableRow}>
                            <Text style={styles.tablenone}>登録された項目はありません。</Text>
                        </View>
                    }
                </View>
            </ScrollView>

            {/* Fixed Bottom Buttons */}
            <View style={styles.fixedButtons}>
                {!isEditing ? (
                    <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
                        <Text style={styles.buttonText}>編集</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => setIsEditing(false)} style={styles.saveButton}>
                        <Text style={styles.buttonText}>保存</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default BulkEditingDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 15,
        paddingVertical: 10,
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
    label: {
        fontSize: 18,
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 0,
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
        alignItems: "center"
    },
    tableCell: {
        flex: 1,
        textAlign: "center",
        paddingVertical: 3,
        borderWidth: 0,
        borderColor: "#ccc",
        borderRadius: 4,
        marginHorizontal: 4,
    },
    tablenone: {
        flex: 1,
        textAlign: "left",
        marginLeft: 30
    },
    inputCell: {
        flex: 1,
        textAlign: "center",
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        marginHorizontal: 4,
    },

    scrollContent: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        paddingBottom: 100, // extra space for fixed buttons
    },
    fixedHeader: {
        paddingTop: 20,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    fixedButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 15,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#ccc",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    button: {
        backgroundColor: "#2B5DAE",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    editButton: {
        backgroundColor: '#f0ad4e',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 6,
        marginHorizontal: 5,
      },
      saveButton: {
        backgroundColor: '#5cb85c',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 6,
        marginHorizontal: 5,
      },
});
