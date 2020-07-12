import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {TextButton} from 'tht-buttons';

export const ConfirmationPageOne = (props) => {
  // const [isVideo, setIsVideo] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  console.log('props: ', props);
  return (
    <View style={styles.container}>
      {!props.isVideo && (
        <ImageContainer
          uri={props.uri}
          onCancel={() => props.onCancel()}
          onAdd={() => props.onConfirm(props.uri)}
        />
      )}
    </View>
  );
};

const ImageContainer = ({uri, onCancel, onAdd}) => {
  return (
    <ImageBackground source={{uri: uri}} style={styles.image}>
      <View style={styles.container}>
        <View style={styles.topButtons}>
          <TextButton
            text="<"
            onPress={() => onCancel()}
            textStyle={styles.topText}
            buttonStyle={styles.topButton}
          />
        </View>
        <TextButton
          text="Add"
          onPress={() => onAdd()}
          textStyle={styles.topText}
          buttonStyle={[styles.topButton, styles.flipButton]}
        />
      </View>
    </ImageBackground>
  );
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  image: {
    height: deviceHeight,
    width: deviceWidth,
  },

  preview: {
    flex: 1,
  },

  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  topText: {
    fontSize: 25,
    // margin: 20,
  },

  topButton: {
    margin: 20,
  },
});
