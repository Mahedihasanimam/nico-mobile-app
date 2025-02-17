import { View, Text, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SvgXml } from 'react-native-svg'
import { backIcon, NavigationIcon } from '../../../assets/Icons/icons'

const ChatDetails = () => {
  const navigation = useNavigation()
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet consectetur. Ultricies tincidunt et tortor tincidunt ridiculus.",
      timestamp: "10:20am",
      isSent: false
    },
    {
      id: 2, 
      text: "Lorem ipsum dolor sit amet consectetur. Ultricies tincidunt et tortor tincidunt ridiculus.",
      timestamp: "10:20am",
      isSent: true
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet consectetur. Ultricies tincidunt et tortor tincidunt ridiculus.", 
      timestamp: "10:20am",
      isSent: false
    },
    {
      id: 4,
      text: "Lorem ipsum dolor sit amet consectetur. Ultricies tincidunt et tortor tincidunt ridiculus.",
      timestamp: "10:20am", 
      isSent: true
    }
  ])
  
  const scrollViewRef = useRef()

  const handleSend = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }).toLowerCase()

      const newMsg = {
        id: messages.length + 1,
        text: newMessage.trim(),
        timestamp: currentTime,
        isSent: true
      }

      setMessages([...messages, newMsg])
      setNewMessage('')
      
      // Scroll to bottom after sending message
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
           <Text>
                          <SvgXml xml={backIcon                        } />
                        </Text>
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <Image 
            source={require('../../../assets/Icons/avater.png')}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>Jhon Doe</Text>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messageContainer}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <View 
            key={message.id}
            style={[
              styles.messageWrapper,
              message.isSent ? styles.sentWrapper : styles.receivedWrapper
            ]}
          >
            {!message.isSent && (
              <Image
                source={require('../../../assets/Icons/avater.png')}
                style={styles.messageAvatar}
              />
            )}
            <View
              style={[
                styles.message,
                message.isSent ? styles.sentMessage : styles.receivedMessage
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.timestamp}>{message.timestamp}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Chat Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          multiline
          maxHeight={100}
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            !newMessage.trim() && styles.sendButtonDisabled
          ]} 
          onPress={handleSend}
          disabled={!newMessage.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  backButton: {
    padding: 5,
    marginRight: 10
  },
  backButtonText: {
    fontSize: 24,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  userName: {
    fontSize: 16,
    fontWeight: '600'
  },
  messageContainer: {
    flex: 1,
    padding: 15
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-end'
  },
  sentWrapper: {
    justifyContent: 'flex-end'
  },
  receivedWrapper: {
    justifyContent: 'flex-start'
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8
  },
  message: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 20
  },
  sentMessage: {
    backgroundColor: '#e3f2fd',
    borderBottomRightRadius: 5
  },
  receivedMessage: {
    backgroundColor: '#f5f5f5',
    borderBottomLeftRadius: 5
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20
  },
  timestamp: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end'
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'flex-end'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
    minHeight: 40
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center'
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc'
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600'
  }
})

export default ChatDetails