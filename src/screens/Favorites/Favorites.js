import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container } from "../../components/ui/Container"
import { FlatList } from "react-native"
import { Advertisement } from "../Advertisement/Advertisement"
import { fetchFavorites } from "../../redux/actions/user"
import { selectFavoritesState } from "../../redux/reducers/user"

export const Favorites = () => {
  const { favorites, loading, loaded, error } = useSelector(selectFavoritesState)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading && !loaded && !error) {
      dispatch(fetchFavorites())
    }
  }, [favorites, loading, loaded])

  return (
    <Container>
      <FlatList
        onRefresh={() => dispatch(fetchFavorites())}
        refreshing={loading}
        data={favorites}
        renderItem={({ item }) => <Advertisement item={item}/>}
        keyExtractor={(_, i) => `favorite-${i}`}
      />
    </Container>
  )
}