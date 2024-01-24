import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native'
import LoginScreen from './LoginScreen'
import TileComponent from './TileComponent'
import DiseaseDetailScreen from './DiseaseDetailScreen'
import logoImage from './assets/pto.jpg'
import searchImage from './assets/search.png'

const Stack = createNativeStackNavigator()

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [diseasesData, setDiseasesData] = useState([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = require('./desc.json')
        setDiseasesData(data)
      } catch (error) {
        console.error('Błąd wczytywania danych z pliku JSON:', error)
      }
    }

    loadData()
  }, [])

  const handleLoginSuccess = () => {
    setLoggedIn(true)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            {/* <Stack.Screen name="DiseasesList" options={{ title: 'Lista Chorób' }}>
              {() => (
                <ScrollView style={{ flex: 1 }}>
                  <TileComponent diseases={diseasesData} />
                </ScrollView>
              )}
            </Stack.Screen> */}
            <Stack.Screen
              name="DiseasesList"
              options={{
                title: 'Lista Chorób',
                headerLeft: () => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={logoImage} style={{ width: 30, height: 30, marginRight: 10 }} />
                    {/* <Text>Lista Chorób</Text> */}
                  </View>
                ),
              }}
            >
              {() => (
                <ScrollView style={{ flex: 1 }}>
                  <TileComponent diseases={diseasesData} />
                </ScrollView>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="DiseaseDetail"
              component={DiseaseDetailScreen}
              options={({ route }) => ({
                title: 'Szczegóły',
                headerRight: () => (
                  <TouchableOpacity
                    style={{ marginRight: 10 }}
                    onPress={() => {
                      // Tutaj możesz otworzyć okno wyszukiwania na ekranie "Szczegóły"
                      // Możesz nawigować do odpowiedniego ekranu lub wyświetlić modal z wyszukiwarką
                    }}
                  >
                    <Image
                      source={searchImage} // Dodaj import ikony wyszukiwania
                      style={{ width: 30, height: 30 }}
                    />
                  </TouchableOpacity>
                ),
              })}
            />

            {/* <Stack.Screen
              name="DiseaseDetail"
              component={DiseaseDetailScreen}
              options={{ title: 'Szczegóły' }}
              TuMABYĆIKONAWYSZUKIWANIA
            /> */}
          </>
        ) : (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {() => <LoginScreen onLoginSuccess={handleLoginSuccess} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
