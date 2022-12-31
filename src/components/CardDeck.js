import React from 'react';
import {View, Text} from 'react-native';
import {CardContext} from '../context/CardContext';
import {useContext} from 'react';

const CardDeck = () => {
  const {handleCard} = useContext(CardContext);

  return (
    <>
      <View
        style={{
          backgroundColor: '#13C8EF',
          height: '60%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {handleCard(4)}
      </View>
    </>
  );
};

export default CardDeck;
