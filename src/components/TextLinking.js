import React, { useCallback } from 'react'
import { Text, Linking, TouchableHighlight, StyleSheet } from 'react-native'

export const TextLinking = ({
  urlOrText = '',
  scanned = false,
  stylesButton = {},
}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(urlOrText)

    if (supported) {
      await Linking.openURL(urlOrText)
      return
    }
  }, [urlOrText])

  if (!scanned) return null

  return (
    <TouchableHighlight onPress={handlePress} style={stylesButton}>
      <Text style={styles.textPrincipal}>{urlOrText}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  textPrincipal: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    margin: 10,
  },
})
