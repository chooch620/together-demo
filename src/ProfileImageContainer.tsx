import React, {useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {APIPhoto, ProfileImageFAB} from './types';

interface Props {
  image?: APIPhoto;
  deleteImage: (item: APIPhoto) => void;
  addImage: () => void;
}

export const ProfileImageContainer: React.FC<Props> = (props: Props) => {
  // Determines what FAB to display
  const [FAB, setFAB] = useState<ProfileImageFAB>(
    props.image ? ProfileImageFAB.DELETE : ProfileImageFAB.ADD,
  );

  const handleFABPress = () => {
    if (props.image) {
      props.deleteImage(props.image);
    } else {
      props.addImage();
    }
  };

  return (
    <View style={styles.container}>
      {props.image && (
        <ImageBackground style={styles.image} source={{uri: props.image.url}}>
          <TouchableHighlight
            style={[styles.fab, props.image ? styles.delete : styles.add]}
            onPress={() => handleFABPress()}
            testID="fabButton">
            <Text
              style={[
                styles.fabText,
                props.image ? styles.deleteText : styles.addText,
              ]}>
              {FAB}
            </Text>
          </TouchableHighlight>
        </ImageBackground>
      )}
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  team: {
    alignSelf: 'center',
  },

  image: {
    width: deviceWidth / 3.3,
    height: deviceHeight / 4.5,
    // backgroundColor: "blue",
    // margin: 2,
    borderWidth: 1,
  },

  fab: {
    // flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    height: 25,
    width: 25,
    borderRadius: 13,
    alignItems: 'center',

    // width: deviceWidth / 10,
  },

  fabText: {
    fontSize: 20,
  },

  delete: {
    backgroundColor: 'white',
  },

  deleteText: {
    color: 'red',
  },

  add: {
    backgroundColor: 'red',
  },

  addText: {
    color: 'white',
  },
});
