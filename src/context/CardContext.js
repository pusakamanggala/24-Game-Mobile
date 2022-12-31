import React from 'react';
import {createContext} from 'react';
import {View, Image, Text, Alert} from 'react-native';
import {useEffect} from 'react';
import axios from 'axios';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {ImageBackground} from 'react-native';
import {NavigationHelpersContext} from '@react-navigation/native';
import useNavigation from '@react-navigation/native';

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
  const [fetchStatus, setFetchStatus] = useState(false);

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

  const handleRealCardValue = param => {
    if (param === 'ACE') {
      setRealCardValue([...realCardValue, 11]);
    } else if (param === 'KING' || param === 'QUEEN' || param === 'JACK') {
      setRealCardValue([...realCardValue, 10]);
    } else {
      setRealCardValue([...realCardValue, param]);
    }
  };

  const handleCalculate = () => {
    if (pickedCard.length === 6) {
      let result = eval(userSolutions.join(''));
      if (result === 24) {
        alert('You win');
      } else {
        alert('Worng Answer');
        console.log(result);
      }
    } else {
      alert('You need to pick all 6 cards');
    }
  };
  console.log(cardValue);
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

  console.log('ini real', realCardValue);

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

  const handleReset = () => {
    setUserSolutions('');
    setPickedCard([]);
    setShouldBeOperator(false);
  };

  console.log(userSolutions);

  // const handleCardValue = (arr1, arr2) => {
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr1[i] == 'ACE') {
  //       arr2[i].push(11);
  //     } else if (arr[i] == 'KING' || arr[i] == 'QUEEN' || arr[i] == 'JACK') {
  //       arr2[i].push(10);
  //     } else {
  //       arr2[i].push(arr[i]);
  //     }
  //   }
  // };
  // const handleCardValue = param => {
  //   for (let i = 0; i < numberOfCards; i++) {
  //     if (param[i] === 'ACE') {
  //       cardValueArr.push(11);
  //     } else if (
  //       param[i] === 'KING' ||
  //       param[i] === 'QUEEN' ||
  //       param[i] === 'JACK'
  //     ) {
  //       cardValueArr.push(10);
  //     } else {
  //       cardValueArr.push(param[i]);
  //     }
  //   }
  // };
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
                      onPress={() => handleCalculate()}>
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
      //           style={{width: 97.89, height: 136, margin: 5}}
      //           source={{uri: cardImages[0]}}
      //         />
      //         <Image
      //           style={{width: 97.89, height: 136, margin: 5}}
      //           source={{uri: cardImages[1]}}
      //         />
      //       </View>
      //       <View style={{flexDirection: 'row'}}>
      //         <Image
      //           style={{width: 97.89, height: 136, margin: 5}}
      //           source={{uri: cardImages[2]}}
      //         />
      //         <Image
      //           style={{width: 97.89, height: 136, margin: 5}}
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
