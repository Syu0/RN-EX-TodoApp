import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {theme} from '../colors.js';
const Header = ({mode, setMode}) => (
  <View style={styles.header}>
    <TouchableOpacity
      onPress={() => {
        setMode('work');
      }}>
      <Text
        style={{
          ...styles.headerText,
          color: mode ? 'white' : theme.grey,
        }}>
        Work
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => {
        setMode('travel');
      }}>
      <Text
        style={{
          ...styles.headerText,
          color: !mode ? 'white' : theme.grey,
        }}>
        Travel
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.darkbg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  headerText: {
    fontSize: 38,
    fontWeight: '600',
  },
});

export default Header;
