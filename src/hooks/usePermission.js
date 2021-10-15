import React, { useState, useEffect } from 'react'
import { View, Text, Button, ActivityIndicator } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

export const usePermission = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [loading, setLoading] = useState(false)
  const stylesView = {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  }

  const getPermissions = async () => {
    setLoading(true)
    const { status } = await BarCodeScanner.requestPermissionsAsync()
    const accessPermission = status === 'granted'

    setLoading(false)
    setHasPermission(accessPermission)
  }

  const PermissionNull = () => (
    <Text>Necesitas permisos para usar la camara</Text>
  )

  const PermissionDenegated = () => (
    <>
      <Text style={{ textAlign: 'center' }}>No hay acceso a la camara</Text>
      <Button title="obtener acceso" onPress={getPermissions} />
    </>
  )

  const PermissionViewStatus = () => {
    if (loading)
      return (
        <View style={stylesView}>
          <ActivityIndicator size="large" />
        </View>
      )

    return (
      <View style={stylesView}>
        {hasPermission === false && <PermissionDenegated />}
        {hasPermission === null && <PermissionNull />}
      </View>
    )
  }

  useEffect(() => {
    getPermissions()
  }, [])

  return { hasPermission, PermissionViewStatus }
}
