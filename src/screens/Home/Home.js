import React, { useEffect } from "react"
import { APP_NAME, Route as r } from "../../constants/app"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { HeaderIcon } from "../../components/ui/HeaderIcon"
import { Container } from "../../components/ui/Container"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from "react-redux"
import { selectAdvertisement } from "../../redux/reducers/advertisement"
import { fetchAdvertisements } from "../../redux/actions/advertisement"
import { FlatList } from "react-native"
import { Advertisement } from "./Advertisement"

export const HomeScreen = () => {
  const { advertisements, loading, loaded } = useSelector(selectAdvertisement)
  const dispatch = useDispatch()

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
        data={advertisements}
        renderItem={({ item }) => <Advertisement item={item}/>}
        keyExtractor={(_, i) => `advertisement-${i}`}
      />
    </Container>
  )
}

export const homeScreenOptions = ({ navigation }) => ({
  title      : APP_NAME,
  headerRight: () => (
    <HeaderButtons
      HeaderButtonComponent={props => <HeaderIcon {...props} IconComponent={Ionicons}/>}
    >
      <Item
        title={r.chat.title}
        iconName="chatbubble-outline"
        onPress={() => navigation.navigate(r.chat.name)}
      />
    </HeaderButtons>
  ),
  headerLeft : () => (
    <HeaderButtons
      HeaderButtonComponent={props => <HeaderIcon {...props} IconComponent={Ionicons}/>}
    >
      <Item
        title={r.favorites.title}
        iconName="ios-star-outline"
        onPress={() => navigation.navigate(r.favorites.name)}
      />
    </HeaderButtons>
  ),
})