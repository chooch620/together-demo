import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Modal,
} from 'react-native';

import {IMAGES} from './src/data';
import {ProfileImageContainer} from './src/ProfileImageContainer';
import {Camera} from './src/camera';
import {APIPhoto} from './src/types';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [profileImages, setProfileImages] = useState(
    IMAGES.map((profileImage, index) => (
      <ProfileImageContainer
        key={index}
        deleteImage={(image: APIPhoto) => handleOnDelete(image)}
        addImage={() => setShowCamera(!showCamera)}
        image={profileImage}
      />
    )),
  );

  const handleOnDelete = (image: APIPhoto) => {
    let imageRemoved = false;
    const newProfileImages = [...profileImages];
    for (const profileImageContainer of profileImages) {
      const imageObj = profileImageContainer.props.image;
      if (imageObj.id === image.id) {
        newProfileImages.splice(profileImageContainer.key as number, 1);
        imageRemoved = true;
      }
    }
    setProfileImages(newProfileImages);
  };

  const handleImageConfirmed = (confirmedImage: APIPhoto) => {
    const newImages = [...profileImages];
    console.log('confirmedImage: ', confirmedImage);
    newImages.push(
      <ProfileImageContainer
        deleteImage={(image: APIPhoto) => handleOnDelete(image)}
        addImage={() => setShowCamera(!showCamera)}
        image={confirmedImage}
        key={profileImages.length}
      />,
    );
    setProfileImages(newImages);
    setShowCamera(!showCamera);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.images}>{profileImages}</View>
      {/*<View style={styles.images}>{blankImages}</View>*/}
      <TouchableHighlight
        style={styles.addImageButton}
        onPress={() => setShowCamera(!showCamera)}
        testID="fabButton">
        <Text style={styles.addButtonText}>Add Image</Text>
      </TouchableHighlight>
      <Modal animationType="slide" visible={showCamera}>
        <Camera
          onFinish={(photo: APIPhoto) => handleImageConfirmed(photo)}
          onCancel={() => setShowCamera(!showCamera)}
        />
      </Modal>
    </SafeAreaView>
  );
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  images: {
    flex: 1,
    alignItems: 'stretch',
    // justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  addImageButton: {
    backgroundColor: 'red',
    margin: 10,
    width: deviceWidth / 1.5,
    height: deviceHeight / 20,
    borderRadius: 10,
    alignSelf: 'center',
  },

  addButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});

export default App;
