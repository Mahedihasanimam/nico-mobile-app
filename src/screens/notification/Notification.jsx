import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const Notification = () => {
  const notifications = [
    {
      id: '1',
      title: 'Ticket received',
      date: '23/12/2024',
      time: '10:20am',
      company: 'ViewSonic',
      user: 'Jhon Doe',
      amount: '0',
    },
    {
      id: '2',
      title: 'New quotation',
      date: '23/12/2024',
      time: '10:20am',
      company: 'ViewSonic',
      user: 'Jhon Doe',
      amount: '$250',
    },
    {
      id: '3',
      title: 'New quotation',
      date: '23/12/2024',
      time: '10:20am',
      company: 'ViewSonic',
      user: 'Jhon Doe',
      amount: '$250',
    },
    {
      id: '4',
      title: 'Problem solved',
      date: '23/12/2024',
      time: '02:20pm',
      company: 'ViewSonic',
      user: 'Jhon Doe',
      amount: '-$250',
    },
  ];

  const NotificationItem = ({ item }) => (

    <TouchableOpacity>
      
    <View style={styles.itemContainer}>
      <View >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.company}>{item.company}</Text>
        <Text style={styles.user}>{item.user}</Text>


      </View>
      <View>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.date}>{item.time}</Text>
      </View>

      <View >


        {item.amount && (
          <Text style={[styles.amount, item.amount.startsWith('-') && styles.negative]}>
            {item.amount}
          </Text>
        )}
      </View>

    </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={false}
      />
    </View>
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    paddingVertical: 12,

    backgroundColor: '#0000000a',
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6769',
    paddingBottom: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    paddingBottom: 4,
  },
  negative: {
    color: '#F44336',
  },
  date: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
    paddingBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#000000',
    fontWeight:'medium',
    paddingBottom: 4,
  },
  user: {
    fontSize: 14,
    color: '#757575',
    paddingBottom: 4,
  },
});

export default Notification;