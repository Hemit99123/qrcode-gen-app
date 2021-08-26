import { StatusBar } from 'expo-status-bar';

import React, { useRef,  useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import QRCode from "react-qr-code";

export default function App() {
  const [text, setText] = useState('')
  const viewRef = useRef();
  const Shareable = async () => {
try {
  const uri = await captureRef(viewRef, {
    format: 'png',
    quality: 0.7
  });
  await Share.open({url: uri})
} catch(err) {
  console.error(err);
}
  }

  return (
    <View style={styles.container}>
      <Text>Hemit's qr code generator</Text>
      <TextInput 
      style={styles.input}
      placeholder='Enter text here'
      onChangeText={(val) => setText(val)}
      />
      <Text>{text}</Text>
      <TouchableOpacity onPress={Shareable} ref={viewRef}>
      <QRCode value={text} />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
