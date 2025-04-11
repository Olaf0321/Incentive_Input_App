import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmployeeDetailScreen = ({ route }: any) => {
  const { employee } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>氏名: {employee.name}</Text>
      <Text style={styles.label}>職別: {employee.role}</Text>
      <Text style={styles.label}>教室: {employee.area}</Text>
    </View>
  );
};

export default EmployeeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF'
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  }
});
