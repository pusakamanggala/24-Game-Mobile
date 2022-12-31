import React from 'react';
import {createContext} from 'react';
import {View, Image, Text} from 'react-native';
import {useEffect} from 'react';
import axios from 'axios';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {set} from 'react-native-reanimated';

export const CardContext = createContext();

export const CardProvider = props => {
  const [numberOfCards, setNumberOfCards] = useState(6);
  const [data, setData] = useState(null);
  const [cardImages, setCardImages] = useState(null);
  const [cardValue, setCardValue] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [userSolutions, setUserSolutions] = useState(' ');
  const [userInput, setUserInput] = useState([]);
  const [cardCode, setCardCode] = useState([]);
  const [pickedCard, setPickedCard] = useState([]);
 

  const handleInput = (value, cardCode) => {
    if (pickedCard.includes(cardCode)) {
      alert('You already picked this card');
    } else {
      setPickedCard([...pickedCard, cardCode]);

      if (value === 'ACE') {
        setUserSolutions([...userSolutions, 11]);
      } else if (value === 'KING' || value === 'QUEEN' || value === 'JACK') {
        setUserSolutions([...userSolutions, 10]);
      } else {
        setUserSolutions([...userSolutions, value]);
      }
    }
  };

  console.log(numberOfCards);

  console.log(pickedCard);

  const handleCardValue = param => {
    for (let i = 0; i < numberOfCards; i++) {
      if (param[i] === 'ACE') {
        setCardValue.push(11);
      } else if (
        param[i] === 'KING' ||
        param[i] === 'QUEEN' ||
        param[i] === 'JACK'
      ) {
        setCardValue.push(10);
      } else {
        setCardValue.push(param[i]);
      }
    }
  };
  useEffect(() => {
    if (fetchStatus === true) {
      axios
        .get(
          `https://deckofcardsapi.com/api/deck/new/draw/?count=${numberOfCards}`,
        )
        .then(res => {
          let data = [...res.data.cards];
          console.log(data);
          setData(data);

          let cardImages = data.map(card => {
            return card.image;
          });
          setCardImages(cardImages);

          let cardCode = data.map(card => {
            return card.code;
          });
          setCardCode(cardCode);
          console.log(cardCode);

          let realCardValue = data.map(card => {
            return card.value;
          });
          setCardValue(realCardValue);
        })
        .catch(error => {});
    }
  }, []);

  console.log(cardImages);
  console.log(cardValue);

  const handleCard = () => {
    if (cardImages !== null) {
      if (cardImages.length === 6) {
        return (
          <>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => handleInput(cardValue[0], cardCode[0])}>
                <Image
                  style={{width: 97.89, height: 136, margin: 5}}
                  source={{uri: cardImages[0]}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleInput(cardValue[1], cardCode[1])}>
                <Image
                  style={{width: 97.89, height: 136, margin: 5}}
                  source={{uri: cardImages[1]}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleInput(cardValue[2], cardCode[2])}>
                <Image
                  style={{width: 97.89, height: 136, margin: 5}}
                  source={{uri: cardImages[2]}}
                />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => handleInput(cardValue[3], cardCode[3])}>
                <Image
                  style={{width: 97.89, height: 136, margin: 5}}
                  source={{uri: cardImages[3]}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleInput(cardValue[4], cardCode[4])}>
                <Image
                  style={{width: 97.89, height: 136, margin: 5}}
                  source={{uri: cardImages[4]}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleInput(cardValue[5], cardCode[5])}>
                <Image
                  style={{width: 97.89, height: 136, margin: 5}}
                  source={{uri: cardImages[5]}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: '#13C8EF',
                height: '10%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Your Answer</Text>
              <Text>{userSolutions}</Text>
            </View>
          </>
        );
      } else if (cardImages.length === 4) {
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
            <View
              style={{
                backgroundColor: '#13C8EF',
                height: '10%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Your Answer</Text>
            </View>
          </>
        );
      }
    }
  };

  return (
    <CardContext.Provider
      value={{
        cardImages,
        setCardImages,
        handleCard,
        numberOfCards,
        setNumberOfCards,
      }}>
      {props.children}
    </CardContext.Provider>
  );
};
