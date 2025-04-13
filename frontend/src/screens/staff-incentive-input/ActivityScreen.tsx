import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import SERVER_URL from '../../../config';
import { Dropdown } from 'react-native-element-dropdown';
import { format } from 'date-fns';

LocaleConfig.locales['ja'] = {
  monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
  today: '今日'
};

LocaleConfig.defaultLocale = 'ja';

type IncentiveEntry = {
  time: string;
  incentive: {
    name: string,
    type: string,
    unit_price: number,
    upper_limit: number
  };
  grade: number;
};

type Classroom = {
  name: string,
  loginId: string,
  password: string,
}

type EmpData = {
  name: string,
  type: string;
};

const ActivityScreen = ({ route }: any) => {
  const [notes, setNotes] = useState<{ [date: string]: { item: string; quantity: number }[] }>({});
  const [incentivesGrade, setIncentivesGrade] = useState<{ [date: string]: number}>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [dataModalVisible, setDataModalVisible] = useState(false);
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [inputQuantity, setInputQuantity] = useState('');
  const [staticItems, setStaticItems] = useState([{ name: 'Apples', type: '', unit_price: 1, upper_limit: 1, id: 0 }]);
  const [selectedItem, setSelectedItem] = useState('Apples');
  const [startDate, setStartDate] = useState(String);
  const [endDate, setEndDate] = useState(String);

  const { employee, status } = route.params;
  const [incentives, setIncentives] = useState([{ name: 'Apples', type: '', unit_price: 1, upper_limit: 1, id: 0 }]);
  const [currentMonth, setCurrentMonth] = useState(new Date());


  const openInputModal = async (date: string) => {
    try {
      const response = await fetch(`${SERVER_URL}api/inputPossibility/${status}`, {
        method: 'GET',
        headers: {"Content-Type": "application/json",}
      });

      const data = await response.json();

      if (date < startDate || date > endDate) {
        Alert.alert('日付が無効であるため入力できません。');
      } else if (data.status == false){
        Alert.alert('管理者によって入力が制限されています。');
      } else {
        setSelectedDate(date);
        setSelectedItem(staticItems[0]?.name || '');
        setInputQuantity('');
        setInputModalVisible(true);
      }

    } catch (err) {
      Alert.alert(`error: ${err}`);
    }
  };

  const openDataModal = (date: string) => {
    setSelectedDate(date);
    setDataModalVisible(true);
  };

  const saveInput = async () => {
    if (selectedDate && selectedItem && inputQuantity) {
      setNotes(prev => ({
        ...prev,
        [selectedDate]: [
          ...(prev[selectedDate] || []),
          { item: selectedItem, quantity: parseInt(inputQuantity) },
        ],
      }));
      setIncentivesGrade(prev => ({
        ...prev,
        [selectedItem]: prev[selectedItem] + parseInt(inputQuantity)
      }))
    }
    setInputQuantity('');
    Alert.alert(`正確に入力されました。`);
    try {
      const response = await fetch(`${SERVER_URL}api/staff/add_incentive`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          staffName: employee.name,
          time: selectedDate,
          incentiveName: selectedItem,
          quantity: inputQuantity,
        })
      })
      const data = await response.json();

    } catch (err) {
      Alert.alert(`err: ${err}`);
    };
  };

  const getMarkedDates = () => {
    const marked: any = {};
    Object.keys(notes).forEach(date => {
      marked[date] = {
        marked: true,
        dotColor: 'blue',
        selectedColor: '#e6f7ff',
        customStyles: {
          container: { backgroundColor: '#cceeff' },
          text: { color: 'black' },
        },
      };
    });
    return marked;
  };

  const init = async () => {
    try {
      const response = await fetch(`${SERVER_URL}api/incentive/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      const emp = await fetch(`${SERVER_URL}api/staff/name/${employee.name}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const empData: EmpData = await emp.json();

      const arr = data.filter((d: any) => d.type === `${empData.type}用`).map((d: any, i: number) => ({
        name: d.name,
        type: d.type,
        unit_price: d.unit_price,
        upper_limit: d.upper_limit,
        id: i,
      }));

      arr.map((ele: any) => {
        setIncentives(prev => ([
          ...prev, ele
        ]));

        setIncentivesGrade(prev => ({
          ...prev,
          [ele.name]: 0
        }))
      })

      setIncentives([...arr]);
      setStaticItems([...arr]);

      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      const incentiveReq = await fetch(`${SERVER_URL}api/staff/incentives/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: employee.name,
          currentYear: currentYear,
          currentMonth: currentMonth,
          status: status
        })
      });

      const incentiveList = await incentiveReq.json();

      setStartDate(incentiveList.st);
      setEndDate(incentiveList.ed);

      incentiveList.arr.map((ele: any) => {
        setNotes(prev => ({
          ...prev,
          [ele.time]: [
            ...(prev[ele.time] || []),
            { item: ele.incentive.name, quantity: ele.grade },
          ],
        }));

        console.log('intial value ======== ', incentivesGrade[ele.incentive.name])
      });

      incentiveList.arr.map((ele: any) => {
        setIncentivesGrade(prev => ({
          ...prev,
          [ele.incentive.name]: prev[ele.incentive.name] + ele.grade
        }))
      })

    } catch (err) {
      Alert.alert(`error: ${err}`);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>インセンティブ入力アプリ</Text>
      <Text style={styles.subHeader}>{status}</Text>
      <Text style={styles.title}>{startDate} ~ {endDate}</Text>
      <Calendar
        markedDates={getMarkedDates()}
        onDayPress={(day) => {
          openDataModal(day.dateString);
        }}
        onDayLongPress={(day) => {
          openInputModal(day.dateString);
        }}
        markingType={'custom'}
        hideExtraDays={true}
        disableArrowLeft={false}
        disableArrowRight={false}
        renderHeader={() => (
          <View style={{ alignItems: 'center', paddingVertical: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              {format(currentMonth, 'yyyy-MM')}
            </Text>
          </View>
        )}
        onMonthChange={(month) => {
          // month = { year: 2025, month: 4, day: 1 }
          const newDate = new Date(month.year, month.month - 1, 1);
          setCurrentMonth(newDate);
        }}
      />

      {/* Data Modal */}
      <Modal visible={dataModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View style={styles.table}>
                <View style={styles.tableRowHeader}>
                  <Text style={styles.tableHeader}>インセンティブ項目</Text>
                  <Text style={styles.tableHeader}>単価</Text>
                  <Text style={styles.tableHeader}>上限回数</Text>
                </View>

                {incentives.length > 0 && incentives.map((incentive, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{incentive.name}</Text>
                    <Text style={styles.tableCell}>{incentive.unit_price}</Text>
                    <Text style={styles.tableCell}>
                      {/* {incentivesGrade[incentive.name] > incentive.upper_limit ? incentive.upper_limit : incentivesGrade[incentive.name]}/{incentive.upper_limit} */}
                      {incentivesGrade[incentive.name]}/{incentive.upper_limit}
                    </Text>
                  </View>
                ))}
                {incentives.length == 0 &&
                  <View style={styles.tableRow}>
                    <Text style={styles.tablenone}>登録された項目はありません。</Text>
                  </View>
                }
              </View>
            </ScrollView>

            <TouchableOpacity onPress={() => setDataModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelText}>閉じる</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Input Modal */}
      <Modal visible={inputModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={styles.modalTitle}>{selectedDate} インセンティブ</Text>
              {notes[selectedDate] ? (
                notes[selectedDate].map((entry, idx) => (
                  <Text key={idx}>{entry.item} - {entry.quantity}</Text>
                ))
              ) : (
                <Text>入力したインセンティブはありません。</Text>
              )}
              <Text style={styles.modalSecondTitle}>{selectedDate} インセンティブ入力</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={staticItems}
                maxHeight={300}
                labelField="name"
                valueField="name"
                placeholder="Select item"
                value={selectedItem}
                onChange={(item: any) => {
                  setSelectedItem(item.name);
                }}
              />
              <TextInput
                value={inputQuantity}
                onChangeText={setInputQuantity}
                placeholder="実施回数"
                keyboardType="numeric"
                style={styles.input}
              />
              <TouchableOpacity onPress={saveInput} style={styles.saveButton}>
                <Text style={styles.saveText}>保管</Text>
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity onPress={() => setInputModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelText}>閉じる</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', minHeight: '100%' },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginInline: "auto"
  },
  subHeader: {
    fontSize: 18,
    color: "#555",
    marginBottom: 50,
    marginInline: "auto"
  },
  title: {
    fontSize: 18,
    color: "#000000",
    marginBottom: 40,
    marginInline: "auto",
    fontWeight: "bold"
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'},
  modalContent: { width: '85%', backgroundColor: '#fff', padding: 20, borderRadius: 10, marginTop: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalSecondTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 20 },
  scrollContent: {
    paddingBottom: 0,
  },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 5, marginVertical: 10 },
  saveButton: { backgroundColor: '#2B5DAE', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  saveText: { color: '#fff', fontWeight: 'bold' },
  cancelButton: { marginTop: 10, alignItems: 'center', backgroundColor: "#999", borderRadius: 5 },
  cancelText: { color: '#FFFFFF', marginTop: 5, marginBottom: 10, fontWeight: 'bold' },
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
  dropdown: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default ActivityScreen;