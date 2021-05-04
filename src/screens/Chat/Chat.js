import React from "react"
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Color as c, Route as r } from "../../constants/app"
import { Container } from "../../components/ui/Container"
import { BoldText, RegularText } from "../../components/ui/Text"
import { useSelector } from "react-redux"
import { selectUser } from "../../redux/reducers/user"
import ChatAvatar from "./ChatAvatar"
import { useNavigation } from "@react-navigation/native"
import { last } from "../../utils/array"
import { selectConversations } from "../../redux/reducers/chat"

const byUnread = userId => (acc, { senderId, viewed }) => {
  return userId !== senderId ? (Number(!viewed) + acc) : acc
}

const ConversationRow = ({ participant, messages, user, _id }) => {
  const { text, viewed, senderId, createdAt } = last(messages) || {
    text: 'Ще немає повідомлень',
  }

  const unreadCount = messages.reduce(byUnread(user._id), 0)

  const { name, imageURL, isActive } = participant

  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate({
      name  : r.chatConversation.name,
      params: { participant },
    })
  }

  const handleLongPress = () => {

  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <View style={styles.conversation}>
        <View style={styles.conversationAvatar}>
          <ChatAvatar size={60} src={{ uri: imageURL }} isActive={isActive}/>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.conversationInfo}>
            <BoldText style={styles.textMain}>{name}</BoldText>
            <RegularText
              style={styles.textSecondary}
              numberOfLines={1}
            >{text}</RegularText>
          </View>
          <View style={styles.conversationBadges}>
            <RegularText
              style={styles.textSecondary}>{createdAt && new Date(createdAt).toLocaleTimeString()}</RegularText>
            <View style={styles.unreadBadge}>
              {unreadCount
                ? <RegularText style={styles.textBadge}>{unreadCount}</RegularText>
                : <MaterialCommunityIcons
                  color={c.primary}
                  size={18}
                  name={(viewed || senderId !== user._id) ? 'check-all' : 'check'}
                />}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const Chat = () => {
  const user = useSelector(selectUser)
  const conversations = useSelector(selectConversations)

  return (
    <Container>
      <FlatList
        data={conversations}
        renderItem={({ item }) => <ConversationRow user={user} {...item}/>}
        keyExtractor={(_, i) => `conversation-${i}`}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  conversation      : {
    flexDirection : 'row',
    height        : 70,
    marginVertical: 5,
  },
  conversationAvatar: {
    width         : '15%',
    height        : '100%',
    justifyContent: 'center',
    alignItems    : 'center',
    marginLeft    : 7,
  },
  conversationInfo  : {
    justifyContent: 'space-evenly',
    height        : '100%',
    width         : '63%',
  },
  conversationBadges: {
    justifyContent: 'space-evenly',
    height        : '100%',
    width         : '29%',
    alignItems    : 'center',
  },
  infoContainer     : {
    height           : '100%',
    flexDirection    : 'row',
    paddingBottom    : 5,
    borderBottomWidth: 1.1,
    marginHorizontal : 10,
    borderColor      : c.secondary,
  },
  textMain          : {
    fontSize: 18
  },
  textSecondary     : {
    fontSize: 14,
    color   : c.secondary,
    left    : 5,
    height  : 15,
  },
  unreadBadge       : {
    borderRadius   : 10,
    height         : '40%',
    width          : '40%',
    backgroundColor: '#e8e8e8',
    elevation      : 3,
    shadowOffset   : { width: 1, height: 1 },
    shadowColor    : '#333',
    shadowOpacity  : 0.1,
    shadowRadius   : 2,
    alignItems     : 'center',
    justifyContent : 'center',
  },
  textBadge         : {
    color: c.secondary,
  },
})