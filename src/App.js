import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { usePermission } from './hooks/usePermission'
import { TextLinking } from './components/TextLinking'

export default function App() {
  const [scanned, setScanned] = useState(false)
  const [text, setText] = useState('')
  const { hasPermission, PermissionViewStatus } = usePermission()

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    setText(data)
    console.log(`Type: ${type}\nData: ${data}`)
  }

  const handleScanner = () => setScanned(!scanned)

  if (!hasPermission) return <PermissionViewStatus />

  return (
    <View style={styles.container}>
      <View style={styles.barCodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ width: '100%', height: '100%' }}
        />
        <TextLinking
          urlOrText={text}
          scanned={scanned}
          stylesButton={styles.buttonTextOrUrl}
        />
        {scanned && (
          <TouchableHighlight onPress={handleScanner} style={styles.button}>
            <Text style={styles.textButton}>volver a escanear</Text>
          </TouchableHighlight>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barCodeBox: {
    backgroundColor: '#0D1117',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 5,
    position: 'relative',
  },
  buttonTextOrUrl: {
    position: 'absolute',
    bottom: '20%',
    backgroundColor: 'rgba(13,17,23, .5)',
    zIndex: 999,
  },
  button: {
    position: 'absolute',
    zIndex: 999,
    backgroundColor: '#09f',
    bottom: '10%',
    padding: 10,
    borderRadius: 5,
  },
  textButton: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
})
