import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';

const AreaExcelOutput = async (
  totalData: []
) => {
  try {
    for (let i = 0; i < totalData.length; i++) {
      const {data, title} = totalData[i];
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
  
      XLSX.utils.book_append_sheet(wb, ws, 'エリア');
  
      const excelBase64 = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
  
      const filePath = `${RNFS.DownloadDirectoryPath}/${title}.xlsx`;
  
      await RNFS.writeFile(filePath, excelBase64, 'base64');
  
      console.log('✅ Excel saved at:', filePath);
    }

  } catch (error: any) {
    Alert.alert('Error', error.message || String(error));
  }
};

export default AreaExcelOutput;
