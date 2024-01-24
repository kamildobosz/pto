import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const DiseaseDetailScreen = ({ route }) => {
  const { disease } = route.params
  const navigation = useNavigation()
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0)

  const properties = [
    'icd10',
    'cel diagnostyczny',
    'badania genetyczne',
    'metodyka badawcza',
    'materiał',
  ]

  const handleNext = () => {
    const nextIndex = currentPropertyIndex + 1
    if (nextIndex < properties.length) {
      setCurrentPropertyIndex(nextIndex)
    } else {
      setCurrentPropertyIndex(0)
    }
  }

  const handleBack = () => {
    const prevIndex = currentPropertyIndex - 1
    if (prevIndex >= 0) {
      setCurrentPropertyIndex(prevIndex)
    } else {
      setCurrentPropertyIndex(properties.length - 1)
    }
  }

  const currentProperty = properties[currentPropertyIndex]
  const isNextDisabled = currentPropertyIndex === properties.length - 1
  const isBackDisabled = currentPropertyIndex === 0

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.propertyName}>{currentProperty}</Text>
        <Text style={styles.propertyValue}>{disease[currentProperty]}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isBackDisabled && styles.disabledButton]}
          onPress={handleBack}
          disabled={isBackDisabled}
        >
          <Text style={styles.buttonText}>Powrót</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isNextDisabled && styles.disabledButton]}
          onPress={handleNext}
          disabled={isNextDisabled}
        >
          <Text style={styles.buttonText}>Dalej</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  propertyValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  button: {
    flex: 1,
    backgroundColor: '#004b77',
    padding: 10,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
})

export default DiseaseDetailScreen
