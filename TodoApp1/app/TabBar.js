import React from 'react';
import {StyleSheet, View} from 'react-native';
import TabBarItem from './TabBarItem';
const TabBar = ({setType, type}) => (
  <View style={styles.container}>
    <TabBarItem type={type} title="All" setType={() => setType('All')} />
    <TabBarItem
      type={type}
      title="Active"
      border
      setType={() => setType('Active')}
    />
    <TabBarItem
      type={type}
      title="Complate"
      border
      setType={() => setType('Complate')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
});

export default TabBar;
