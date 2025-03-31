import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const EmployeeListScreen = () => {
    // Sample Data (Assuming received from backend)
    const regularEmployees = [
        { name: "宮本 和弘", role: "正社員", area: "A教室" },
        { name: "菅原 明菜", role: "正社員", area: "A教室" },
        { name: "苅谷 佳子", role: "正社員", area: "B教室" },
        { name: "河野 貴子", role: "正社員", area: "B教室" },
        { name: "沼田 玲子", role: "正社員", area: "C教室" },
        { name: "工藤 勝乃", role: "正社員", area: "C教室" },
        { name: "秋山 雅香", role: "正社員", area: "就労支援事業" },
        { name: "鈴木 ひろみ", role: "正社員", area: "就労支援事業" },
        { name: "大野 理佳佳", role: "正社員", area: "生活介護事業" },
        { name: "宮本 真代美", role: "正社員", area: "生活介護事業" },
        { name: "川辺 淑子", role: "正社員", area: "マッサージ事業" },
    ];

    const partTimeEmployees = [
        { name: "A", role: "パート・アルバイト", area: "A教室" },
        { name: "B", role: "パート・アルバイト", area: "A教室" },
        { name: "C", role: "パート・アルバイト", area: "B教室" },
        { name: "D", role: "パート・アルバイト", area: "C教室" },
        { name: "E", role: "パート・アルバイト", area: "C教室" },
    ];

    const incentives = [
        "セクリハ提出",
        "遠隔地勤務",
        "大西さん18時半送迎対応",
        "日曜朝柴谷君送迎対応",
        "土、日、祝出勤",
        "プール対応",
        "東庄帰り(宮崎くん、石毛さん)",
        "八千代帰り(松田兄弟、嶋日)",
        "把握",
        "手洗い",
        "取っての除菌",
        "おやつの準備",
        "利用者対応 口調",
        "利用者対応 呼び捨て",
        "利用者対応 寄り添った支援",
        "見学対応",
        "来客対応 あいさつ、言葉使い",
        "整理整頓 私物をおかない",
        "経費削減 エアコン",
        "経費削減 モノクロコピー",
        "情報収集",
        "規律手当 約束期限",
        "規律手当期日",
        "規律手当 公私混同",
        "マナー手当 礼儀正しい",
        "マナー手当 清潔感",
        "マナー手当 笑顔・安心感",
        "責任手当 コツコツ",
        "信頼",
        "コミュニケーション"
    ];

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
                {regularEmployees.map((emp, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{emp.name}</Text>
                        <Text style={styles.tableCell}>{emp.role}</Text>
                        <Text style={styles.tableCell}>{emp.area}</Text>
                    </View>
                ))}
            </View>

            {/* Part-Time Employees Table */}
            <Text style={styles.sectionTitle}>パート・アルバイト</Text>
            <View style={styles.table}>
                <View style={styles.tableRowHeader}>
                    <Text style={styles.tableHeader}>氏名</Text>
                    <Text style={styles.tableHeader}>職別</Text>
                    <Text style={styles.tableHeader}>エリア及び事業</Text>
                </View>
                {partTimeEmployees.map((emp, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{emp.name}</Text>
                        <Text style={styles.tableCell}>{emp.role}</Text>
                        <Text style={styles.tableCell}>{emp.area}</Text>
                    </View>
                ))}
            </View>

            {/* Incentive Table */}
            <Text style={styles.sectionTitle}>インセンティブ一覧</Text>
            <View style={styles.incentiveTable}>
                {/* Header */}
                <View style={styles.incentiveHeader}>
                    <Text style={styles.incentiveHeaderText}>給与項目</Text>
                </View>

                {/* Incentive List */}
                {incentives.map((item, index) => (
                    <View key={index} style={styles.incentiveRow}>
                        <Text style={styles.incentiveCell}>{item}</Text>
                    </View>
                ))}
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
    incentiveTable: {
        borderWidth: 1,
        borderColor: "#000",
        marginTop: 15,
        marginBottom: 50
    },
    incentiveHeader: {
        backgroundColor: "#2B5DAE",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#000",
    },
    incentiveHeaderText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
    incentiveRow: {
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingVertical: 5,
    },
    incentiveCell: {
        textAlign: "center",
        fontSize: 14,
        paddingVertical: 5,
    },
});
