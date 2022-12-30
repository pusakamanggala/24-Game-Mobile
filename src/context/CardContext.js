import React from 'react';
import {createContext} from 'react';
import {View, Image} from 'react-native';
import {useEffect} from 'react';
import axios from 'axios';
import {useState} from 'react';

export const CardContext = createContext();

export const CardProvider = props => {
  const [numberOfCards, setNumberOfCards] = useState(4);
  const [data, setData] = useState(null);
  const [cardImages, setCardImages] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/new/draw/?count=${numberOfCards}`,
      )
      .then(res => {
        let data = [...res.data.cards];
        setData(data);
        let cardImages = data.map(card => {
          return card.image;
        });
        setCardImages(cardImages);
      })
      .catch(error => {});
  }, []);

 

  console.log(cardImages);

  const cardDeck = [
    {
      code: 'AH',
      image: 'https://deckofcardsapi.com/static/img/AH.png',
      images: {
        png: 'https://deckofcardsapi.com/static/img/AH.png',
        svg: 'https://deckofcardsapi.com/static/img/AH.svg',
      },
      suit: 'HEARTS',
      value: 'ACE',
    },
    {
      code: '0D',
      image: 'https://deckofcardsapi.com/static/img/0D.png',
      images: {
        png: 'https://deckofcardsapi.com/static/img/0D.png',
        svg: 'https://deckofcardsapi.com/static/img/0D.svg',
      },
      suit: 'DIAMONDS',
      value: '10',
    },
    {
      code: 'JD',
      image: 'https://deckofcardsapi.com/static/img/JD.png',
      images: {
        png: 'https://deckofcardsapi.com/static/img/JD.png',
        svg: 'https://deckofcardsapi.com/static/img/JD.svg',
      },
      suit: 'DIAMONDS',
      value: 'JACK',
    },
    {
      code: '6C',
      image: 'https://deckofcardsapi.com/static/img/6C.png',
      images: {
        png: 'https://deckofcardsapi.com/static/img/6C.png',
        svg: 'https://deckofcardsapi.com/static/img/6C.svg',
      },
      suit: 'CLUBS',
      value: '6',
    },
  ];
  var cardImage = cardDeck.map(card => {
    return card.image;
  });

  const handleCard = numberOfCards => {
    if (cardImages !== null) {
      if (numberOfCards === 4) {
        return (
          <>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 97.89, height: 136, margin: 5}}
                source={{uri: cardImages[0]}}
              />
              <Image
                style={{width: 97.89, height: 136, margin: 5}}
                source={{uri: cardImages[1]}}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 97.89, height: 136, margin: 5}}
                source={{uri: cardImages[2]}}
              />
              <Image
                style={{width: 97.89, height: 136, margin: 5}}
                source={{uri: cardImages[3]}}
              />
            </View>
          </>
        );
      }
    }
  };

  return (
    <CardContext.Provider
      value={{
        cardDeck,
        cardImage,
        handleCard,
        numberOfCards,
        setNumberOfCards,
      }}>
      {props.children}
    </CardContext.Provider>
  );
};
