import { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { searchMovies } from "../services/omdbApi"
import { Movie } from "../types/movie"
import MovieCard from "../components/MovieCard"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/AppNavigator"
import { useFonts } from "expo-font"
import { Oswald_700Bold } from "@expo-google-fonts/oswald"
import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView } from "react-native-safe-area-context"

function SearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [inputText, setInputText] = useState('')
  const [results, setResults] = useState<Movie[]>([])
  const [type, setType] = useState<'movie' | 'series' | ''>('')
  const [year, setYear] = useState('')

  const [fontsLoaded] = useFonts({
    Oswald_700Bold,
  })

  useEffect(() => {
    async function search() {
      const data = await searchMovies(inputText, type, year)
      if (data) {
        setResults(data)
      } else {
        setResults([])
      }
    }
    search()
  }, [inputText, type, year])

  if (!fontsLoaded) return null

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#3d2b00', '#1a1a1a']}
        style={styles.headerGradient}>
        <Text style={styles.header}>🎬 CineExplorer</Text>
      </LinearGradient>
      <TextInput
        onChangeText={setInputText}
        value={inputText}
        style={styles.searchInput}
        placeholder="Título..."
        placeholderTextColor={"#aaaaaa"}
        />
      <TextInput
        onChangeText={setYear}
        value={year}
        style = {styles.yearInput}
        placeholder="Año"
        placeholderTextColor={"#aaaaaa"}
      />
      <View
      style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, type === '' && styles.filterActiveButton]}
          onPress={() => setType('')}>
            <Text 
            style={[styles.filterText, type === '' && styles.filterTextActive]}
            >Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, type === 'movie' && styles.filterActiveButton]}
          onPress={() => setType('movie')}>
            <Text
            style={[styles.filterText, type === 'movie' && styles.filterTextActive]}
            >Película</Text></TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, type === 'series' && styles.filterActiveButton]}
          onPress={() => setType('series')}>
            <Text
            style={[styles.filterText, type === 'series' && styles.filterTextActive]}
            >Serie</Text></TouchableOpacity>
      </View>
      {inputText.length > 0 && results.length === 0 && (
        <Text style={styles.emptyText}> No se encontraron resultados </Text>
      )}
      <FlatList
        style={{ flex: 1}}
        data={results}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <MovieCard 
            movie={item}
            onPress={() => navigation.navigate('Detail', {imdbID: item.imdbID})}
           />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  header: {
    fontFamily: 'sans-serif-condensed',
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    padding: 6,
    letterSpacing: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(245, 197, 24, 0.3)',
    marginBottom: 0
  },
  headerGradient: {
    padding: 6,
    marginBottom: 8
  },
  searchInput: {
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    borderRadius: 8,
    padding: 10,
    margin: 16,
    fontSize: 16
  },
  yearInput: {
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 16,
    marginTop: 4,
    fontSize: 14
  },
  filterText: {
    color: '#ffffff',
    fontSize: 14
  },
  filterTextActive: {
    color: '#1a1a1a',
    fontWeight: 'bold'
  },

  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
    justifyContent: 'center'
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 24,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    marginTop: 12,
  },
  filterActiveButton: {
    backgroundColor: '#f5c518',
  },
  emptyText: {
    color: '#aaaaaa',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16
  }
})

export default SearchScreen;