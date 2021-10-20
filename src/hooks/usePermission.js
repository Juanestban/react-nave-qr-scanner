import React, { useState, useEffect } from 'react'
import { View, Text, Button, ActivityIndicator } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

// hook para conocer si el usuario otorgo permisos de camara
export const usePermission = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [loading, setLoading] = useState(false)
  const stylesView = {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  }

  // ejecuta cuando inicia el hook y permite preguntar al usuario si concede permisos de uso para la camara
  const getPermissions = async () => {
    setLoading(true)
    const { status } = await BarCodeScanner.requestPermissionsAsync()
    const accessPermission = status === 'granted'

    setLoading(false)
    setHasPermission(accessPermission)
  }

  // si no tiene permisos renderizara un texto
  const PermissionNull = () => (
    <Text>Necesitas permisos para usar la camara</Text>
  )

  // si no concedio permisos renderizara texto con boton para volver a preguntar
  const PermissionDenegated = () => (
    <>
      <Text style={{ textAlign: 'center' }}>No hay acceso a la camara</Text>
      <Button title="obtener acceso" onPress={getPermissions} />
    </>
  )

  // componente para mostrar un spinner mientras carga o acepta los permisos
  const PermissionViewStatus = () => {
    if (loading)
      return (
        <View style={stylesView}>
          <ActivityIndicator size="large" />
        </View>
      )

    // renderiza un contentedor o caja donde mostrara dependiendo de la respuesta del permiso
    // un componente u otro
    return (
      <View style={stylesView}>
        {hasPermission === false && <PermissionDenegated />}
        {hasPermission === null && <PermissionNull />}
      </View>
    )
  }

  // el efecto se ejecuta una unica vez despues del primer render
  useEffect(() => {
    getPermissions()
  }, [])

  // retorna resultados del estado de react (useState) y el componente que retorno dependiendo de este estado
  return { hasPermission, PermissionViewStatus }
}
