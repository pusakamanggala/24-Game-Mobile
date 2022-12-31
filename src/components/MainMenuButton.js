import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MainMenuButton = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <TouchableOpacity onPress={() => navigation.navigate('SelectMode')}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>Play Game</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.buttonAlt}>
          <Text style={styles.buttonTitleAlt}>How To Play</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 50,
    backgroundColor: '#13C8EF',
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonAlt: {
    width: 250,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
    borderColor: '#13C8EF',
    borderWidth: 2,
  },
  buttonTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonTitleAlt: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#13C8EF',
  },
});

export default MainMenuButton;
