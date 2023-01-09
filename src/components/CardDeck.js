import React from 'react';
import {View} from 'react-native';
import {CardContext} from '../context/CardContext';
import {useContext} from 'react';

const CardDeck = () => {
  const {handleCard} = useContext(CardContext);

  return (
    <>
      <View
        style={{
          backgroundColor: '#13C8EF',
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {handleCard()}
      </View>
    </>
  );
};

export default CardDeck;
