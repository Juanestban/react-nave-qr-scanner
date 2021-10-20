import React, { useCallback } from 'react'
import { Text, Linking, TouchableHighlight, StyleSheet } from 'react-native'

// componente del que mostrara el significado del codigo descifrado
export const TextLinking = ({
  urlOrText = '',
  scanned = false,
  stylesButton = {},
}) => {
  // para no perder el dato usando props por medio de funciones y persistirlos al momento de hacer re-render
  const handlePress = useCallback(async () => {
    // funcion para conocer si es una url
    const supported = await Linking.canOpenURL(urlOrText)

    if (supported) {
      // abriendo dicha url siendo una promesa con tiempo de espera
      await Linking.openURL(urlOrText)
      return
    }
  }, [urlOrText])

  // asi no existe ningun resultado del escaneo no renderiza nada
  if (!scanned) return null

  // TouchableHighlight:  boton con el click a la url para ejecutar funcion "handlePress"
  // Text: texto para mostrar el contenido del escaneo descifrado
  return (
    <TouchableHighlight onPress={handlePress} style={stylesButton}>
      <Text style={styles.textPrincipal}>{urlOrText}</Text>
    </TouchableHighlight>
  )
}

// estilos que tendra el texto
const styles = StyleSheet.create({
  textPrincipal: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    margin: 10,
  },
})
