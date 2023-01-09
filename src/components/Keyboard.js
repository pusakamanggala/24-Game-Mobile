import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const Keyboard = () => {
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        height: '80%',
        alignItems: 'center',
      }}>
      {/* row 1 */}
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{padding: 5}} onPress={() => handleInput('X')}>
          <View style={styles.button}>
            <Text style={styles.buttonTitle}>X</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}}>
          <View style={styles.button}>
            <Text style={styles.buttonTitle}>:</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}}>
          <View style={styles.button}>
            <Text style={styles.buttonTitle}>+</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}}>
          <View style={styles.button}>
            <Text style={styles.buttonTitle}>-</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* row 2 */}
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{padding: 5}}>
          <View style={styles.button}>
            <Text style={styles.buttonTitle}>(</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}}>
          <View style={styles.button}>
            <Text style={styles.buttonTitle}>)</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}}>
          <View style={styles.resetButton}>
            <Text style={{fontSize: 20, color: 'white'}}>Reset</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* row 3 */}
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <TouchableOpacity style={{padding: 5}}>
          <View
            style={{
              width: 140,
              height: 30,
              backgroundColor: 'white',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#FF0000',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#FF0000', fontSize: 14, fontWeight: 'bold'}}>
              Give up
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5}}>
          <View
            style={{
              width: 140,
              height: 30,
              backgroundColor: '#4CAF50',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
              Submit
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 45,
    height: 45,
    backgroundColor: '#13C8EF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  resetButton: {
    width: 100,
    height: 45,
    backgroundColor: '#13C8EF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default Keyboard;
