import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

function FavoritesScreen() {
  const { favorites, confirmRemoveFavorite } = useFavorites()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
              colors={['#3d2b00', '#1a1a1a']}
              style={styles.headerGradient}>
              <Text style={styles.header}>🎬 Favoritos</Text>
      </LinearGradient>
      {favorites.length === 0 && (
        <Text style={styles.emptyText}>No hay favoritos guardados</Text>
      )}
      <FlatList<Movie>
        data = {favorites}
        keyExtractor={(item: Movie) => item.imdbID}
        renderItem={({ item }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <View style={{ flex: 1 }}>
            <MovieCard 
            movie={item} 
            onPress={() => navigation.navigate('Detail', { imdbID: item.imdbID })}
            onRemove={() => confirmRemoveFavorite(item.imdbID)}
            />
          </View>
        </View>
      )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
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
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingBottom: 8,
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ff6b9d',
    alignSelf: 'center',
    marginRight: 16

  },
  removeText: {
    color: '#ff6b9d',
    fontSize: 14
  },
  emptyText: {
    color: '#aaaaaa',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16
  }
})

export default FavoritesScreen;