import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

const GameModeButton = () => {
  return (
    <View
      style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <TouchableOpacity>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>4 Card</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>6 Card</Text>
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
    marginTop: 10,
  },
  buttonTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default GameModeButton;
