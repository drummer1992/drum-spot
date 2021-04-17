import { Container } from "../../components/ui/Container"
import { FlatList } from "react-native"
import { Advertisement } from "./Advertisement"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAdvertisement } from "../../redux/reducers/advertisement"
import { fetchAdvertisements } from "../../redux/actions/advertisement"
import identity from 'lodash/identity'

export const Advertisements = ({ predicate = identity }) => {
  const { advertisements, loading, loaded } = useSelector(selectAdvertisement)
  const dispatch = useDispatch()

  const filtered = advertisements.filter(predicate)

  useEffect(() => {
    if (!loading && !loaded) {
      dispatch(fetchAdvertisements())
    }
  }, [advertisements, loading, loaded])

  return (
    <Container>
      <FlatList
        onRefresh={() => dispatch(fetchAdvertisements())}
        refreshing={loading}
        data={filtered}
        renderItem={({ item }) => <Advertisement item={item}/>}
        keyExtractor={(_, i) => `advertisement-${i}`}
      />
    </Container>
  )
}