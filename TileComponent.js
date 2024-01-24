import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

const TileComponent = ({ diseases }) => {
  const navigation = useNavigation()

  const handlePress = (disease) => {
    navigation.navigate('DiseaseDetail', { disease })
  }

  return (
    <View style={styles.tileContainer}>
      {diseases.map((disease, index) => (
        <TouchableOpacity style={styles.tile} key={index} onPress={() => handlePress(disease)}>
          <Text style={styles.tileText}>{disease.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  tileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tile: {
    width: '90%',
    height: 50,
    margin: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  tileText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default TileComponent
