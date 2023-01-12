import React from 'react';
import {View} from 'react-native';
import CardDeck from '../components/CardDeck';
import {CardProvider} from '../context/CardContext';

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
