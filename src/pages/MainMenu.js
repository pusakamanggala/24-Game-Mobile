import React from 'react';
import MainMenuButton from '../components/MainMenuButton';
import {View, Text, Image, ImageBackground} from 'react-native';

const MainMenu = () => {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#13C8EF',
      }}>
      <View
        style={{
          height: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../img/appLogo.png')} />
      </View>

      <View style={{height: '50%'}}>
        <ImageBackground
          source={require('../img/waveBackground.png')}
          style={{height: '100%'}}>
          <MainMenuButton />
        </ImageBackground>
      </View>
    </View>
  );
};

export default MainMenu;
