import React from 'react';
import {View, Image, Text} from 'react-native';

const SplashScreens = () => {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#13C8EF',
        justifyContent: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <Image source={require('../img/appLogo.png')} />
        <Text style={{padding: 20, fontSize: 24, fontWeight: 'bold'}}>
          24 Game
        </Text>
      </View>
    </View>
  );
};
export default SplashScreens;
