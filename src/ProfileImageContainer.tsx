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
  deleteImage?: (item: APIPhoto) => void;
  addImage?: () => void;
}

export const ProfileImageContainer: React.FC<Props> = (props: Props) => {
  console.log('image supplied: ', props);
  // Determines what FAB to display
  const [FAB, setFAB] = useState<ProfileImageFAB>(
    props.image ? ProfileImageFAB.DELETE : ProfileImageFAB.ADD,
  );

  const handleFABPress = () => {
    if (props.image) {
      props.deleteImage && props.deleteImage(props.image);
    } else {
      console.log('else: ', props.addImage);
      if (props.addImage !== undefined) {
        props.addImage();
      }
    }
  };

  return (
    <View style={styles.container}>
      {props.image && (
        <ImageBackground
          style={[styles.imageContainer]}
          source={{uri: props.image.url}}
          imageStyle={styles.image}>
          <FABButton
            text={FAB}
            onPress={() => handleFABPress()}
            isDeleteButton={true}
          />
        </ImageBackground>
      )}
      {props.image === undefined && (
        <View style={[styles.imageContainer, styles.blankImage]}>
          <FABButton
            text={FAB}
            onPress={() => handleFABPress()}
            isDeleteButton={false}
          />
        </View>
      )}
    </View>
  );
};

type FABButtonProps = {
  text: string;
  isDeleteButton: boolean;
  onPress: () => void;
};

const FABButton = (props: FABButtonProps) => {
  const {text, isDeleteButton, onPress} = props;
  return (
    <TouchableHighlight
      style={[styles.fab, isDeleteButton ? styles.delete : styles.add]}
      onPress={() => onPress()}
      testID="fabButton">
      <Text
        style={[
          styles.fabText,
          isDeleteButton ? styles.deleteText : styles.addText,
        ]}>
        {text}
      </Text>
    </TouchableHighlight>
  );
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    width: deviceWidth / 3.3,
    height: deviceHeight / 4.5,
    borderWidth: 1,
    borderRadius: 10,
  },
  team: {
    alignSelf: 'center',
  },

  imageContainer: {
    width: deviceWidth / 3.3,
    height: deviceHeight / 4.5,
    // backgroundColor: "blue",
    // margin: 2,
  },

  image: {
    borderRadius: 10,
  },

  blankImage: {
    backgroundColor: '#c1c1c1',
    borderRadius: 10,
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
