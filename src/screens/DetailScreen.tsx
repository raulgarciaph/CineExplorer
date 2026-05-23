import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../services/omdbApi";
import { MovieDetail } from "../types/movie";
import { useFavorites } from "../context/FavoritesContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

function DetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>()
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null)
  const { favorites, addFavorite, confirmRemoveFavorite } = useFavorites()
  const navigation = useNavigation()

  useEffect(() => {
    async function loadDetail () {
      const movie = await getMovieDetail(route.params.imdbID) as MovieDetail | null
      if (movie) {
        setMovieDetail(movie)
        }
      }
      loadDetail()
  }, [])

  if (!movieDetail) return <Text>Cargando...</Text>
  const isFavorite = favorites.some(m => m.imdbID === movieDetail.imdbID)

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" color='#ffffff' size={26}/>
      </TouchableOpacity>
      
      <ScrollView>
        <View style={styles.movieHeader}>
          <Image style={styles.poster} source={{ uri: movieDetail.Poster }}/>
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{movieDetail.Title}</Text>

            <Text style={styles.label}>Genero</Text>
            <Text style={styles.value}>{movieDetail.Genre}</Text>

            <Text style={styles.label}>Duración</Text>
            <Text style={styles.value}>{movieDetail.Runtime}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style= {styles.label}>Valoraciones</Text>
          {movieDetail.Ratings.map((rating) => (
            <Text key={rating.Source} style={styles.value}>{rating.Source}: {rating.Value}</Text>
          ))}

          <Text style={styles.label}>Reparto</Text>
          <Text style={styles.value}>{movieDetail.Actors}</Text>

          <Text style={styles.label}>Director</Text>
          <Text style={styles.value}>{movieDetail.Director}</Text>

          <Text style={styles.label}>Año</Text>
          <Text style={styles.value}>{movieDetail.Year}</Text>

          <Text style={styles.label}>Sinopsis</Text>
          <Text style={styles.value}>{movieDetail.Plot}</Text>
        </View>
      </ScrollView>
        <TouchableOpacity 
          style={[styles.favButton, isFavorite && styles.favButtonActive]}
          onPress={() => isFavorite ? confirmRemoveFavorite(movieDetail.imdbID) : addFavorite(movieDetail)}>
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              color={isFavorite ? '#ff6b9d' : '#ffffff'} 
              size={20}/>
            <Text style={styles.favText}>{isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}</Text>
        </TouchableOpacity>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  movieHeader: {
    flexDirection: 'row',
    padding: 16,
    gap: 12
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center'
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover'
  },
  posterGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80
  },
  backButton: {
    padding: 16
  },
  backText: {
    color: '#ffffff',
    fontSize: 20
  },
  content: {
    padding: 16
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed',
    letterSpacing: 1,
    marginBottom: 8
  },
  label: {
    color: '#aaaaaa',
    fontSize: 14,
    marginTop: 4,
  },
  value: {
    color: '#ffffff',
    fontSize: 15,
    marginBottom: 8
  },
  favButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    gap: 8,
    alignSelf: 'center',
    paddingHorizontal: 24

  },
  favButtonActive: {
    borderWidth: 1,
    borderColor: '#ff6b9d'
  },
  favText: {
    color: '#ffffff',
    fontSize: 15
  }
})

export default DetailScreen;