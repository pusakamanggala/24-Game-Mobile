import React from 'react';
import {View, Text, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const Tutorial = () => {
  return (
    <View
      style={{
        width: '100%',
        padding: 20,
        backgroundColor: '#13C8EF',
        height: '100%',
      }}>
      <Text
        style={{
          fontSize: 24,
          textAlign: 'center',
          color: 'white',
          marginBottom: 20,
        }}>
        How to play
      </Text>
      <ScrollView style={{height: '100%'}}>
        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 1,
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: 'white',
              borderBottomColor: 'white',
              borderBottomWidth: 1,
              paddingVertical: 10,
            }}>
            Card Value
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 97.89, height: 136, margin: 5, borderRadius: 5}}
              source={{
                uri: 'https://deckofcardsapi.com/static/img/AH.png',
              }}
            />
          </View>
          <Text
            style={{
              color: 'white',
            }}>
            ACE has a value of 11
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 97.89, height: 136, margin: 5, borderRadius: 5}}
              source={{
                uri: 'https://deckofcardsapi.com/static/img/KH.png',
              }}
            />
            <Image
              style={{width: 97.89, height: 136, margin: 5, borderRadius: 5}}
              source={{
                uri: 'https://deckofcardsapi.com/static/img/QH.png',
              }}
            />
            <Image
              style={{width: 97.89, height: 136, margin: 5, borderRadius: 5}}
              source={{
                uri: 'https://deckofcardsapi.com/static/img/JH.png',
              }}
            />
          </View>
          <Text
            style={{
              color: 'white',
            }}>
            KING, JACK, and QUEEN each has a value of 10
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 97.89, height: 136, margin: 5, borderRadius: 5}}
              source={{
                uri: 'https://deckofcardsapi.com/static/img/2H.png',
              }}
            />
            <View style={{height: 136, justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', color: 'white'}}>.....</Text>
            </View>

            <Image
              style={{width: 97.89, height: 136, margin: 5, borderRadius: 5}}
              source={{
                uri: 'https://deckofcardsapi.com/static/img/0H.png',
              }}
            />
          </View>
          <Text
            style={{
              color: 'white',
            }}>
            The other cards (2 to 10) have their original values
          </Text>
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 97.89, height: 136, margin: 5, borderRadius: 5}}
              source={{
                uri: 'https://deckofcardsapi.com/static/img/AH.png',
              }}
            />
            <Image
              style={{width: 97.89, height: 136, margin: 5, borderRadius: 5}}
              source={{
                uri: 'https://deckofcardsapi.com/static/img/4S.png',
              }}
            />
            <Image
              style={{width: 97.89, height: 136, margin: 5, borderRadius: 5}}
              source={{
                uri: 'https://deckofcardsapi.com/static/img/9C.png',
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 97.89, height: 136, margin: 5, borderRadius: 5}}
              source={{
                uri: 'https://deckofcardsapi.com/static/img/0H.png',
              }}
            />
            <Image
              style={{width: 97.89, height: 136, margin: 5, borderRadius: 5}}
              source={{
                uri: 'https://deckofcardsapi.com/static/img/3C.png',
              }}
            />
            <Image
              style={{width: 97.89, height: 136, margin: 5, borderRadius: 5}}
              source={{
                uri: 'https://deckofcardsapi.com/static/img/0S.png',
              }}
            />
          </View>
          <Text
            style={{
              color: 'white',
            }}>
            The rules of the game is simple, you have to use matematical
            calculations based on the value of the cards in your deck. The goal
            is to get the value to 24. You can use simple mathematical
            operations (X - + :), but remember to use them according to the
            rules of mathematical operations.
          </Text>
          <Text
            style={{
              color: 'white',
            }}>
            For example the deck above will have a value of 24 if you use this
            solution : (10+10+4) * ((9+3)-11)
          </Text>
          <Image
            style={{width: 97.89, height: 136, margin: 5, borderRadius: 5}}
            source={{
              uri: 'https://opengameart.org/sites/default/files/card%20back%20red.png',
            }}
          />
        </View>
        <Text
          style={{
            color: 'white',
          }}>
          once the card has been chosen, the card will be close and you won't be
          able to choose the same card again
        </Text>
      </ScrollView>
    </View>
  );
};

export default Tutorial;
