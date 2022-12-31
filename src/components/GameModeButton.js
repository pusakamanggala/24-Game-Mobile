import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const GameModeButton = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <TouchableOpacity
        disabled={true}
        onPress={() => {
          navigation.navigate('Gameplay');
        }}>
        <View style={styles.buttonMute}>
          <Text style={styles.buttonTitle}>4 Card (Soon)</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Gameplay');
        }}>
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
  buttonMute: {
    width: 250,
    height: 50,
    backgroundColor: '#99E7F8',
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
