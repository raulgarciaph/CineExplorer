import { createContext, useContext, useEffect, useState } from "react";
import { Movie } from "../types/movie";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesContext = createContext<{
  favorites: Movie[],
  addFavorite: (movie: Movie) => void,
  removeFavorite: (imdbID: string) => void,
  confirmRemoveFavorite: (imdbID: string) => void
  }>({
    favorites: [],
    addFavorite: () => {},
    removeFavorite: () => {},
    confirmRemoveFavorite: () => {}
})

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([])

  useEffect(() => {
    async function loadFavorites() {
      const stored = await AsyncStorage.getItem('favorites')
      if (stored) {
        setFavorites(JSON.parse(stored))
      }
    }
    loadFavorites()
  }, [])

  async function addFavorite(movie: Movie) {
    const updated = [...favorites, movie]
    setFavorites(updated)
    await AsyncStorage.setItem('favorites', JSON.stringify(updated))
  }

  async function removeFavorite(imdbID: string) {
    const updated = (favorites.filter(m => m.imdbID !== imdbID))
    setFavorites(updated)
    await AsyncStorage.setItem('favorites', JSON.stringify(updated))
  }

  function confirmRemoveFavorite(imdbID: string) {
    Alert.alert(
      'Eliminar favorito',
      '¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => removeFavorite(imdbID) }
      ]
    )
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, confirmRemoveFavorite}}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
