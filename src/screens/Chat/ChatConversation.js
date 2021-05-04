import React, { useState, useEffect } from "react"
import { StyleSheet, View, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native"
import { Container } from "../../components/ui/Container"
import { HeaderButtons } from "react-navigation-header-buttons"
import { Color as c } from "../../constants/app"
import ChatAvatar from "./ChatAvatar"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { BoldText, RegularText } from "../../components/ui/Text"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../redux/reducers/user"
import { selectConversationByParticipantId } from "../../redux/reducers/chat"
import { createConversation, newMessage, setViewed } from "../../redux/actions/chat"
import { DEVICE_HEIGHT } from "../../utils/device"

const Message = ({
  text,
  viewed,
  senderId,
  createdAt,
  user,
}) => {
  const alignSelf = senderId === user._id ? 'flex-end' : 'flex-start'

  return (
    <View style={{ ...styles.messageContainer, alignSelf }}>
      <RegularText>{text}</RegularText>
      <View style={{ ...styles.messageFooter, alignSelf }}>
        <RegularText style={styles.messageDate}>{new Date(createdAt).toLocaleTimeString()}</RegularText>
        <MaterialCommunityIcons name={`check${viewed ? '-all' : ''}`} size={20} color={c.primary}/>
      </View>
    </View>
  )
}

export const ChatConversation = ({ route: { params: { participant } } }) => {
  const [input, setInput] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const conversation = useSelector(selectConversationByParticipantId(participant._id))

  const messages = conversation?.messages || []

  const byUnreadMessages = ({ senderId, viewed }) => senderId === participant._id && !viewed

  const hasUnreadMessages = messages.some(byUnreadMessages)

  useEffect(() => {
    if (!conversation) {
      dispatch(createConversation(participant._id))
    }
  }, [])

  useEffect(() => {
    hasUnreadMessages && dispatch(setViewed(conversation._id))
  }, [hasUnreadMessages])

  const handleMessageSend = () => {
    dispatch(newMessage(conversation._id, input))

    setInput('')
  }

  return (
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={DEVICE_HEIGHT / 7}
      >
        <Container>
          <View style={styles.container}>
            <FlatList
              data={conversation?.messages || []}
              renderItem={({ item }) => (
                <Message
                  user={user}
                  participant={participant}
                  {...item}
                />
              )}
              keyExtractor={({ _id }) => _id}
            />
          </View>
          <View style={styles.inputArea}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Введіть текст повідомлення..."
                onChangeText={setInput}
                value={input}
                multiline={true}
              />
            </View>
            <View style={styles.sendIcon}>
              <TouchableOpacity
                style={{ left: 2 }}
                onPress={handleMessageSend}
              >
                <MaterialCommunityIcons name="send" size={30} color={'#fff'}/>
              </TouchableOpacity>
            </View>
          </View>
        </Container>
      </KeyboardAvoidingView>
  )
}

export const chatConversationOptions = ({ route: { params: { participant } } }) => {
  return {
    headerTitle: () => {
      const conversation = useSelector(selectConversationByParticipantId(participant._id))

      const { lastSeen, name, isActive } = conversation?.participant || participant

      return (
        <View style={styles.headerContainer}>
          <BoldText
            style={styles.headerName}
          >
            {name}
          </BoldText>
          <RegularText
            style={styles.headerVisited}
          >
            {
              isActive
                ? 'online'
                : 'був в мережі ' + new Date(lastSeen).toLocaleDateString()
            }
          </RegularText>
        </View>
      )
    },
    headerRight: () => {
      const conversation = useSelector(selectConversationByParticipantId(participant._id))

      const { imageURL, isActive } = conversation?.participant || participant

      return (
        <HeaderButtons>
          <ChatAvatar
            size={40}
            src={{ uri: imageURL }}
            isActive={isActive}
          />
        </HeaderButtons>
      )
    },
  }
}

const styles = StyleSheet.create({
  headerContainer : {
    width     : '100%',
    height    : '100%',
    alignItems: 'center',
  },
  headerName      : {
    fontSize    : 17,
    color       : c.primary,
    marginBottom: 3,
  },
  headerVisited   : {
    fontSize: 14,
    color   : c.secondary,
  },
  container       : {
    height: '90%',
  },
  listStyle       : {
    flexDirection: 'row',
  },
  messageContainer: {
    marginHorizontal: 10,
    marginTop       : 10,
    borderRadius    : 25,
    padding         : 15,
    backgroundColor : '#e8e8e8',
    elevation       : 3,
    shadowOffset    : { width: 1, height: 1 },
    shadowColor     : '#000000',
    shadowOpacity   : 0.1,
    shadowRadius    : 2,
  },
  message         : {
    paddingHorizontal: 5,
  },
  messageFooter   : {
    flexDirection    : 'row',
    marginTop        : 5,
    alignSelf        : 'flex-end',
    alignItems       : 'flex-end',
    justifyContent   : 'space-evenly',
  },
  messageDate     : {
    fontSize   : 14,
    marginRight: 5,
  },
  inputContainer  : {
    left           : 10,
    height         : '100%',
    width          : '80%',
    justifyContent : 'center',
    padding        : 10,
    borderRadius   : 10,
    backgroundColor: '#e8e8e8',
  },
  inputArea       : {
    flexDirection: 'row',
    height       : DEVICE_HEIGHT / 17,
    width        : '100%',
    marginVertical: 8,
  },
  sendIcon        : {
    backgroundColor: c.primary,
    borderRadius   : 50,
    width          : 50,
    height         : 50,
    alignItems     : 'center',
    alignSelf      : 'center',
    justifyContent : 'center',
    marginLeft     : 20,
  }
})