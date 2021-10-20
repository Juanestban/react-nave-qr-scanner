import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { usePermission } from './hooks/usePermission'
import { TextLinking } from './components/TextLinking'

// primer render de la apliacion // Primer Componente
export default function App() {
  // hooks de  estados para persistir el dato si este llega a mutar
  const [scanned, setScanned] = useState(false)
  const [text, setText] = useState('')
  // retorna un boolean o null y el componente que conlleva el anterior resultado useState => "hasPermission"
  const { hasPermission, PermissionViewStatus } = usePermission()

  // funcion que ejecuta al precionar "scanear"
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    setText(data)
    console.log(`Type: ${type}\nData: ${data}`)
  }

  // si escaneo por primera vez aparece texto y permite mediante un boton volver a escanear
  const handleScanner = () => setScanned(!scanned)

  if (!hasPermission) return <PermissionViewStatus />

  // BarCodeScanner => libreria para poder escanear cualquier codigo como "codigo de barra", "QR" entre otros
  return (
    <View style={styles.container}>
      <View style={styles.barCodeBox}>
        <BarCodeScanner
          // si "scanned" es true => ya escaneo y no vuelve a realizarlo a menos que "scanned" regrese a ser false
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ width: '100%', height: '100%' }}
        />
        <TextLinking
          urlOrText={text}
          scanned={scanned}
          stylesButton={styles.buttonTextOrUrl}
        />
        {scanned && (
          // si presiona el boton el estado de "scanned" se invierte => pasa a ser falso para volver a escanear
          <TouchableHighlight onPress={handleScanner} style={styles.button}>
            <Text style={styles.textButton}>volver a escanear</Text>
          </TouchableHighlight>
        )}
      </View>
      {/* barra superior donde muestra la fecha, bateria, etc, esto permite darle color o estilo a dicha barra */}
      <StatusBar style="auto" />
    </View>
  )
}

// estilos de toda la aplicacion
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
