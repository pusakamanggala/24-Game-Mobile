import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import GameModeButton from '../components/GameModeButton';

const SelectMode = () => {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#13C8EF',
      }}>
      <View
        style={{
          height: '60%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../img/appLogo.png')} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            position: 'absolute',
            bottom: 30,
          }}>
          SelectMode
        </Text>
      </View>

      <View style={{height: '40%'}}>
        <ImageBackground
          source={require('../img/waveBackground.png')}
          style={{height: '100%'}}>
          <GameModeButton />
        </ImageBackground>
      </View>
    </View>
  );
};

export default SelectMode;
