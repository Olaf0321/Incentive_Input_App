import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
import SERVER_URL from "../../../config";
import { Dropdown } from 'react-native-element-dropdown';

interface RouteProps {
  route: {
    params: {
      employee: {
        name: string;
        role: string;
      };
    };
  };
}

interface Incentive {
  name: string;
  type: string;
  unit_price: number;
  upper_limit: number;
}

interface DropdownItem {
  label: string;
  value: string;
}

const BulkEditingDetailScreen: React.FC<RouteProps> = ({ route }) => {
  const { employee } = route.params;
  const [incentives, setIncentives] = useState<Incentive[]>([
    { name: "", type: "", unit_price: 0, upper_limit: 0 }
  ]);

  const [staticYears, setStaticYears] = useState<DropdownItem[]>([{ label: '2025', value: '2025' }]);
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  const [staticMonths, setStaticMonths] = useState<DropdownItem[]>([{ label: '1', value: '1' }]);
  const [selectedMonth, setSelectedMonth] = useState<string>('1');

  const [amountArr, setAmountArr] = useState<{ [incentiveName: string]: string }>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editName, setEditName] = useState('');
  const [editNumber, setEditNumber] = useState(0);

  const changeAmount = async (incentiveName: any, amount: any) => {
    try {
      const response = await fetch(`${SERVER_URL}api/staff/incentives/change`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: employee.name,
          selectedYear: selectedYear,
          oldSelectedMonth: selectedMonth,
          incentiveName: incentiveName,
          amount: amount
        })
      });
      const data = await response.json();
    } catch (err) {
      Alert.alert(`error: ${err}`);
    }
  }

  const changeTextFunc = (text: string, name: string) => {
    const onlyNumbers = text.replace(/[^0-9]/g, '');
    setAmountArr(prev => ({ ...prev, [name]: onlyNumbers }));
    setEditName(name);
    setEditNumber(Number(onlyNumbers));
  };

  const init = async () => {
    try {
      const response = await fetch(`${SERVER_URL}api/incentive/`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data: Incentive[] = await response.json();
      const arr: Incentive[] = [];

      data.forEach(item => {
        if (item.type !== `${employee.role}用`) return;
        arr.push(item);
      });

      console.log('incentivesincentives============', arr);

      setIncentives(arr);
      

      const years: DropdownItem[] = [];
      let year = 2025;
      for (let i = 0; i < 26; i++) {
        years.push({ label: year.toString(), value: year.toString() });
        year++;
      }
      setStaticYears(years);

      const months: DropdownItem[] = [];
      for (let i = 1; i <= 12; i++) {
        months.push({ label: i.toString(), value: i.toString() });
      }
      setStaticMonths(months);

    } catch (err) {
      Alert.alert(`error: ${err}`);
    }
  };

  const getValueArr = async () => {
    try {
      const newAmountArr: { [key: string]: string } = {};
      console.log('incentives', incentives);
      incentives.map(ele=>newAmountArr[ele.name] = '0');
      setAmountArr(newAmountArr);
      const result = await fetch(`${SERVER_URL}api/staff/incentives/month`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: employee.name,
          selectedYear,
          oldSelectedMonth: selectedMonth,
        })
      });
      console.log('hello!');
      const data = await result.json();
      console.log('data#####', data);
      setAmountArr(prev => ({ ...prev, ...data.arr }));
    } catch (err) {
      Alert.alert(`error: ${err}`);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    getValueArr();
  }, [selectedYear, selectedMonth, incentives]);

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <Text style={styles.headerText}>一括編集</Text>
        <Text style={styles.subtitle}>一括編集詳細</Text>
        <View style={styles.basicInfo}>
          <View style={styles.childbasicInfo}>
            <Text style={styles.sectionTitle}>{employee.name}</Text>
            <Dropdown
              style={styles.dropdown1}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={staticYears}
              maxHeight={300}
              labelField='label'
              valueField='value'
              placeholder="Select item"
              value={selectedYear}
              onChange={(item: DropdownItem) => setSelectedYear(item.value)}
            />
            <Text style={styles.yearMonthTitle}>年</Text>
            <Dropdown
              style={styles.dropdown2}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={staticMonths}
              maxHeight={300}
              labelField='label'
              valueField='value'
              placeholder="Select item"
              value={selectedMonth}
              onChange={(item: DropdownItem) => setSelectedMonth(item.value)}
            />
            <Text style={styles.yearMonthTitle}>月</Text>
          </View>
          <View style={styles.fixedButtons}>
            {!isEditing ? (
              <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
                <Text style={styles.buttonText}>編集</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setIsEditing(false);
                  changeAmount(editName, editNumber)
                }}
                style={styles.saveButton}>
                <Text style={styles.buttonText}>保存</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <Text style={styles.tableHeader}>インセンティブ項目</Text>
            <Text style={styles.tableHeader}>上限回数</Text>
            <Text style={styles.tableHeader}>単価</Text>
            <Text style={styles.tableHeader}></Text>
          </View>

          {incentives.length > 0 ? (
            incentives.map((incentive, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{incentive.name}</Text>
                <Text style={styles.tableCell}>{incentive.upper_limit}</Text>
                <Text style={styles.tableCell}>{incentive.unit_price}</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.inputCell}
                    value={String(amountArr[incentive.name])}
                    onChangeText={(text) => changeTextFunc(text, incentive.name)}
                    keyboardType="numeric"
                  />
                ) : (
                  <Text style={styles.tableCell}>{amountArr[incentive.name]}</Text>
                )}
              </View>
            ))
          ) : (
            <View style={styles.tableRow}>
              <Text style={styles.tablenone}>登録された項目はありません。</Text>
            </View>
          )}
        </View>
      </ScrollView>


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
  yearMonthTitle: {
    fontSize: 18,
    marginBottom: 3
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
    marginRight: 10
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
  childbasicInfo: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  fixedButtons: {
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
    fontSize: 10,
  },
  editButton: {
    backgroundColor: '#2B5DAE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  saveButton: {
    backgroundColor: '#5cb85c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  dropdown1: {
    height: 30,
    width: 80,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginLeft: 10,
  },
  dropdown2: {
    height: 30,
    width: 60,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginLeft: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  basicInfo: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: 'space-between',
  }
});
