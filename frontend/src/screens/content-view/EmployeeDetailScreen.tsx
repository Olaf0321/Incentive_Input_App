import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get("window");
const EmployeeDetailScreen = ({ route }: any) => {
  const { employee } = route.params;
  const [name, setName] = useState(employee.name);
  const [type, setType] = useState(employee.role);
  const [classroom, seClassroom] = useState(employee.area);

  const handleEdit = () => {
    
  }

  const handleDelete = () => {

  }

  return (

    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>全体</Text>
        <Text style={styles.subtitle}>スタッフ詳細</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>氏名: {name}</Text>
        <Text style={styles.label}>職別: {type}</Text>
        <Text style={styles.label}>教室: {classroom}</Text>
      </View>
      
      <View style = {styles.buttonArr}>
      <TouchableOpacity style={styles.button} onPress={handleEdit}>
        <Text style={styles.buttonText}>編集</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
        <Text style={styles.buttonText}>消去</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmployeeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginTop: 5,
    marginBottom: 100
  },
  content: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: 'left',
    gap: 15,
  },
  buttonArr: {
    flexDirection: 'row',

  },
  label: {
    fontSize: 16,
    width: 100,
    marginRight: 10,
    textAlign: "right",
  },
  button: {
    width: width * 0.4, // 40% of screen width
    height: 50,
    backgroundColor: "#2B5DAE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 30
  },
  buttonDelete: {
    width: width * 0.4, // 40% of screen width
    height: 50,
    backgroundColor: 'red',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 30
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
