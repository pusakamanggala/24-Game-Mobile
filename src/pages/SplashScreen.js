import React from 'react';
import {View, Image, Text} from 'react-native';
import {useNavigation, StackActions} from '@react-navigation/native';
import {useEffect} from 'react';

const SplashScreens = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('MainMenu'));
    }, 3000);
  }, []);
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
