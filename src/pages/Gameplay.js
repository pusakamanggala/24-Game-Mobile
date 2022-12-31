import React from 'react';
import {View, Text} from 'react-native';
import CardDeck from '../components/CardDeck';
import {CardProvider} from '../context/CardContext';
import {ImageBackground} from 'react-native';
import Keyboard from '../components/Keyboard';
import {CardContext} from '../context/CardContext';
import {useContext} from 'react';

const Gameplay = () => {
  return (
    <View style={{height: '100%', backgroundColor: 'yellow'}}>
      <CardProvider>
        <CardDeck />
      </CardProvider>
    </View>
  );
};

export default Gameplay;
