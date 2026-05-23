import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Movie } from "../types/movie";
import { Ionicons } from "@expo/vector-icons";

const posterStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 150,
    height: 150
  }
})

function MovieCard({ movie, onPress, onRemove }: { movie: Movie, onPress: () => void, onRemove?: () => void }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image
          style = {styles.poster}
          source={{ uri: movie.Poster }}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{movie.Title}</Text>
          <Text style={styles.subtitle}>{movie.Year}</Text>
          <Text style={styles.subtitle}>{movie.Type}{/*Aquí debe ir un icono*/}</Text>
          {onRemove && (
            <TouchableOpacity
              onPress={onRemove} style={styles.removeButton}>
                <Ionicons name="heart" color="#ff6b9d" size={28}/>
                <Text style={styles.removeText}>Quitar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles =  StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 6,
    overflow: 'hidden'
  },
  poster: {
    width: 80,
    height: 120
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center'
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#aaaaaa',
    fontSize: 14,
    marginTop: 4
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    alignSelf: 'flex-end'
  },
  removeText: {
    color: '#ff6b9d',
    fontSize: 16
  }
})

export default MovieCard;