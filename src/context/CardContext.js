import React from 'react';
import {createContext} from 'react';
import {View, Image, Text, Alert} from 'react-native';
import {useEffect} from 'react';
import axios from 'axios';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {ImageBackground} from 'react-native';

export const CardContext = createContext();

export const CardProvider = props => {
  const [numberOfCards, setNumberOfCards] = useState(6);
  const [cardImages, setCardImages] = useState(null);
  const [cardValue, setCardValue] = useState([]);
  const [userSolutions, setUserSolutions] = useState('');
  const [cardCode, setCardCode] = useState([]);
  const [pickedCard, setPickedCard] = useState([]);
  const [shouldBeOperator, setShouldBeOperator] = useState(false);
  const [solution, setSolution] = useState('');

  const handleInput = (value, cardCode) => {
    if (shouldBeOperator === false) {
      if (pickedCard.includes(cardCode)) {
        alert('You already picked this card');
      } else {
        setPickedCard([...pickedCard, cardCode]);
        setShouldBeOperator(true);
        if (value === 'ACE') {
          setUserSolutions([...userSolutions, 11]);
          setShouldBeOperator(true);
        } else if (value === 'KING' || value === 'QUEEN' || value === 'JACK') {
          setUserSolutions([...userSolutions, 10]);
          setShouldBeOperator(true);
        } else {
          setUserSolutions([...userSolutions, value]);
          setShouldBeOperator(true);
        }
      }
    }
  };

  // to change card image when picked
  const handleImageStatus = (cardCode, imageInactive, imageActive) => {
    if (pickedCard.includes(cardCode)) {
      return imageActive;
    } else {
      return imageInactive;
    }
  };

  // to check user solutions
  const handleCalculate = () => {
    try {
      if (pickedCard.length === 6) {
        let result = eval(userSolutions.join(''));
        if (result === 24) {
          Alert.alert('Congratulation', 'You Win', [{text: 'OK'}], {
            cancelable: false,
          });
        } else {
          Alert.alert(
            'Wrong Answer',
            'Your solution should return a value of 24',
            [{text: 'OK'}],
            {
              cancelable: false,
            },
          );
          console.log(result);
        }
      } else {
        alert('You need to pick all 6 cards');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Please use proper mathematical operation rules',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
    }
  };

  // to define Card Value
  var realCardValue = [];
  if (cardValue !== null) {
    for (let i = 0; i < cardValue.length; i++) {
      if (cardValue[i] === 'ACE') {
        realCardValue.push(11);
      } else if (
        cardValue[i] === 'KING' ||
        cardValue[i] === 'QUEEN' ||
        cardValue[i] === 'JACK'
      ) {
        realCardValue.push(10);
      } else {
        realCardValue.push(cardValue[i]);
      }
    }
  }

  // to get solution
  const handleSeeSolution = () => {
    axios
      .get(
        `https://24-game-api.vercel.app/game?numbers=${realCardValue[0]},${realCardValue[1]},${realCardValue[2]},${realCardValue[3]},${realCardValue[4]},${realCardValue[5]}`,
      )
      .then(res => {
        setSolution(res.data.equation);
        console.log(res.data.equation);

        Alert.alert('Solution', res.data.equation, [{text: 'OK'}], {
          cancelable: false,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // to limit user input
  const handleOperator = operator => {
    if (shouldBeOperator === true) {
      if (operator === 'X') {
        setUserSolutions([...userSolutions, '*']);
        setShouldBeOperator(false);
      } else {
        setUserSolutions([...userSolutions, operator]);
        setShouldBeOperator(false);
      }
    }
    if (operator === '(') {
      setUserSolutions([...userSolutions, operator]);
      setShouldBeOperator(false);
    }
    if (operator === ')') {
      setUserSolutions([...userSolutions, operator]);
      setShouldBeOperator(true);
    }
  };

  // to reset user solution
  const handleReset = () => {
    setUserSolutions('');
    setPickedCard([]);
    setShouldBeOperator(false);
  };

  //to fetch card deck
  useEffect(() => {
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/new/draw/?count=${numberOfCards}`,
      )

      .then(res => {
        let data = [...res.data.cards];

        let cardImages = data.map(card => {
          return card.image;
        });
        setCardImages(cardImages);

        let cardCode = data.map(card => {
          return card.code;
        });
        setCardCode(cardCode);
        // console.log(cardCode);

        let realCardValue = data.map(card => {
          return card.value;
        });
        setCardValue(realCardValue);
      })
      .catch(error => {});
  }, []);

  // to render card deck and keyboard
  const handleCard = () => {
    if (cardImages !== null) {
      if (cardImages.length === 6) {
        return (
          <View style={{height: '100%', width: '100%'}}>
            <View
              style={{
                height: '60%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => handleInput(cardValue[0], cardCode[0])}>
                  <Image
                    style={styles.card}
                    source={{
                      uri: handleImageStatus(
                        cardCode[0],
                        cardImages[0],
                        'https://opengameart.org/sites/default/files/card%20back%20red.png',
                      ),
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleInput(cardValue[1], cardCode[1])}>
                  <Image
                    style={styles.card}
                    source={{
                      uri: handleImageStatus(
                        cardCode[1],
                        cardImages[1],
                        'https://opengameart.org/sites/default/files/card%20back%20red.png',
                      ),
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleInput(cardValue[2], cardCode[2])}>
                  <Image
                    style={styles.card}
                    source={{
                      uri: handleImageStatus(
                        cardCode[2],
                        cardImages[2],
                        'https://opengameart.org/sites/default/files/card%20back%20red.png',
                      ),
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => handleInput(cardValue[3], cardCode[3])}>
                  <Image
                    style={styles.card}
                    source={{
                      uri: handleImageStatus(
                        cardCode[3],
                        cardImages[3],
                        'https://opengameart.org/sites/default/files/card%20back%20red.png',
                      ),
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleInput(cardValue[4], cardCode[4])}>
                  <Image
                    style={styles.card}
                    source={{
                      uri: handleImageStatus(
                        cardCode[4],
                        cardImages[4],
                        'https://opengameart.org/sites/default/files/card%20back%20red.png',
                      ),
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleInput(cardValue[5], cardCode[5])}>
                  <Image
                    style={styles.card}
                    source={{
                      uri: handleImageStatus(
                        cardCode[5],
                        cardImages[5],
                        'https://opengameart.org/sites/default/files/card%20back%20red.png',
                      ),
                    }}
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
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  {userSolutions}
                </Text>
              </View>
            </View>

            <View
              style={{
                height: '50%',
                width: '100%',
                backgroundColor: '#13C8EF',
              }}>
              <ImageBackground
                source={require('../img/waveBackground.png')}
                style={{height: '100%', width: '100%'}}>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    height: '80%',
                    alignItems: 'center',
                  }}>
                  {/* row 1 */}
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{padding: 5}}
                      onPress={() => handleOperator('X')}>
                      <View style={styles.button}>
                        <Text style={styles.buttonTitle}>X</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{padding: 5}}
                      onPress={() => handleOperator('/')}>
                      <View style={styles.button}>
                        <Text style={styles.buttonTitle}>/</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{padding: 5}}
                      onPress={() => handleOperator('+')}>
                      <View style={styles.button}>
                        <Text style={styles.buttonTitle}>+</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{padding: 5}}
                      onPress={() => handleOperator('-')}>
                      <View style={styles.button}>
                        <Text style={styles.buttonTitle}>-</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* row 2 */}
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{padding: 5}}
                      onPress={() => handleOperator('(')}>
                      <View style={styles.button}>
                        <Text style={styles.buttonTitle}>(</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{padding: 5}}
                      onPress={() => handleOperator(')')}>
                      <View style={styles.button}>
                        <Text style={styles.buttonTitle}>)</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{padding: 5}}
                      onPress={() => handleReset()}>
                      <View style={styles.resetButton}>
                        <Text style={{fontSize: 20, color: 'white'}}>
                          Reset
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* row 3 */}
                  <View style={{flexDirection: 'row', marginTop: 20}}>
                    <TouchableOpacity
                      style={{padding: 5}}
                      onPress={() => handleSeeSolution()}>
                      <View
                        style={{
                          width: 140,
                          height: 30,
                          backgroundColor: 'white',
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: '#FF0000',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#FF0000',
                            fontSize: 14,
                            fontWeight: 'bold',
                          }}>
                          Give up
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{padding: 5}}
                      onPress={() => {
                        handleCalculate();
                      }}>
                      <View
                        style={{
                          width: 140,
                          height: 30,
                          backgroundColor: '#4CAF50',
                          borderRadius: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 14,
                            fontWeight: 'bold',
                          }}>
                          Submit
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>
        );
      }

      // else if (cardImages.length === 4) {
      //   return (
      //     <>
      //       <View style={{flexDirection: 'row'}}>
      //         <Image
      //           style={styles.card}
      //           source={{uri: cardImages[0]}}
      //         />
      //         <Image
      //           style={styles.card}
      //           source={{uri: cardImages[1]}}
      //         />
      //       </View>
      //       <View style={{flexDirection: 'row'}}>
      //         <Image
      //           style={styles.card}
      //           source={{uri: cardImages[2]}}
      //         />
      //         <Image
      //           style={styles.card}
      //           source={{uri: cardImages[3]}}
      //         />
      //       </View>
      //       <View
      //         style={{
      //           backgroundColor: '#13C8EF',
      //           height: '10%',
      //           width: '100%',
      //           justifyContent: 'center',
      //           alignItems: 'center',
      //         }}>
      //         <Text>Your Answer</Text>
      //       </View>
      //     </>
      //   );
      // }
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
        handleOperator,
        handleInput,
      }}>
      {props.children}
    </CardContext.Provider>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 97.89,
    height: 136,
    margin: 5,
    borderRadius: 5,
  },

  button: {
    width: 45,
    height: 45,
    backgroundColor: '#13C8EF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  resetButton: {
    width: 100,
    height: 45,
    backgroundColor: '#13C8EF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
