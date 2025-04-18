import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';

const BatchExcelOutput = async (regularData: [], partTimeData: [], fileName: String) => {
  try {
    const ws = XLSX.utils.json_to_sheet(regularData);
    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.json_to_sheet(partTimeData);

    XLSX.utils.book_append_sheet(wb, ws, '社員');
    XLSX.utils.book_append_sheet(wb, ws1, 'パートアルバイト');

    const excelBase64 = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

    const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}.xlsx`;

    await RNFS.writeFile(filePath, excelBase64, 'base64');

    console.log('✅ First Half Excel saved at:', filePath);

  } catch (error: any) {
    Alert.alert('Error', error.message || String(error));
  }
};

export default BatchExcelOutput;
