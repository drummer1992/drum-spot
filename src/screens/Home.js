import React from "react"
import { APP_NAME, Route as r } from "../constants/app"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { HeaderIcon } from "../components/ui/HeaderIcon"
import { Container } from "../components/ui/Container"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AdvertisementList } from "../components/AdvertisementList"

const data = [
  // {
  //   img  : require('../../assets/gibson.jpeg'),
  //   title: 'Gibson Les Paul',
  //   price: 34000
  // },
  {
    img  : require('../../assets/zildjian.jpeg'),
    title: 'Zildjian A Custom Hi-Hat 14',
    price: 12000
  },
  {
    img  : require('../../assets/shure.jpeg'),
    title: 'Shure SM 58',
    price: 6000
  },
]

export const HomeScreen = () => {
  return (
    <Container>
     <AdvertisementList data={data}/>
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
  headerLeft: () => (
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
