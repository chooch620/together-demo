import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Modal,
  TouchableHighlight,
  Text,
} from 'react-native';

import {IMAGES} from './src/data';
import {ProfileImageContainer} from './src/ProfileImageContainer';
import {Camera} from './src/camera';
import {APIPhoto} from './src/types';

const App = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [numOfImages, setNumOfImages] = useState(IMAGES.length);

  const createImageGrid = () => {
    const uploadedImages = createProfileImages();

    const blankImages = createBlankImages();
    console.log('images: ', [...uploadedImages, ...blankImages]);
    return [...uploadedImages, ...blankImages];
  };

  const [profileImages, setProfileImages] = useState(createImageGrid());

  function createProfileImages() {
    return IMAGES.map((profileImage: APIPhoto) => (
      <ProfileImageContainer
        key={profileImage.id}
        deleteImage={(imageToDelete: APIPhoto) => handleOnDelete(imageToDelete)}
        addImage={() => setShowCamera(!showCamera)}
        image={profileImage}
      />
    ));
  }

  function createBlankImages() {
    const blankImages = [];
    console.log('numOfImages: ', numOfImages);
    for (let i = numOfImages; i < 9; i++) {
      blankImages.push(createBlankImage(i));
    }
    return blankImages;
  }

  function createBlankImage(index: number) {
    return (
      <ProfileImageContainer
        key={`blankImage${index + 1}`}
        addImage={() => setShowCamera(!showCamera)}
      />
    );
  }

  const handleOnDelete = (imageToDelete: APIPhoto) => {
    let imageRemoved = false;
    const newProfileImages = [...profileImages];
    for (let i = 0; i < profileImages.length; i++) {
      const profileImageContainer = profileImages[i];
      // console.log('profileImageContainer: ', profileImageContainer);
      const {image} = profileImageContainer.props;
      // found image to be deleted
      if (image && image.id === imageToDelete.id) {
        newProfileImages[i] = createBlankImage(i);
        setNumOfImages(numOfImages - 1);
        imageRemoved = true;
      } else {
        if (imageRemoved) {
        }
      }
    }
    console.log('newProfileImages: ', newProfileImages);
    setProfileImages(newProfileImages);
  };

  useEffect(() => {
    console.log('profileImages useEffect: ', profileImages);
  }, [profileImages]);

  const handleImageConfirmed = (confirmedImage: APIPhoto) => {
    const newImages = [...profileImages];
    console.log('confirmedImage: ', confirmedImage);
    let indexToInsertImageAt = 0;
    for (let i = 0; i < profileImages.length; i++) {
      console.log('item: ', profileImages[i]);
      const key = profileImages[i].key as string;
      if (key.substring(0, 3) === 'bla') {
        indexToInsertImageAt = i;
        setNumOfImages(numOfImages + 1);
        break;
      }
    }
    newImages[indexToInsertImageAt] = (
      <ProfileImageContainer
        deleteImage={(image: APIPhoto) => handleOnDelete(image)}
        image={confirmedImage}
        key={profileImages.length}
      />
    );

    setProfileImages(newImages);
    setShowCamera(!showCamera);
  };

  async function makeFetch() {
    console.log('makeFetch called');
    const options = {
      method: 'GET'
    };

    await fetch('http://localhost:3000/member/1/photos', options)
      .then((resp) => resp.json())
      .then((data) => console.log('data: ', data))
      .catch((err) => console.log('err: ', err));
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.images}>{profileImages}</View>
      <TouchableHighlight
        style={[styles.fetchButton]}
        onPress={() => makeFetch()}
        testID="basebutton">
        <Text>Fetch</Text>
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

  fetchButton: {
    width: deviceWidth / 1.5,
    height: deviceHeight / 10,
  },
});

export default App;
