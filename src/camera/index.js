import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Modal, TouchableHighlight} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {ConfirmationPageOne} from './confirmation/ConfirmationPageOne';
import {TextButton} from 'tht-buttons';

export const Camera = (props) => {
  const [camera, setCamera] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [uri, setUri] = useState('');
  const [isVideo, setIsVideo] = useState(false);

  const takePicture = async () => {
    setIsVideo(false);
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
      setUri(data.uri);
    }
  };

  useEffect(() => {
    if (uri) {
      setShowConfirmation(true);
    }
  }, [uri]);

  const mediaConfirmed = (media) => {
    console.log('media confirmed', media);
    const photo = {
      id: '1',
      url: media,
      width: 500,
      height: 500,
    };
    // setShowConfirmation(false);
    props.onFinish(photo);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={(ref) => setCamera(ref)}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          console.log(barcodes);
        }}>
        <View style={styles.container}>
          <View style={styles.topButtons}>
            <TextButton
              text="X"
              onPress={() => props.onCancel()}
              style={styles.topText}
              buttonStyle={styles.topButton}
            />
            <TextButton
              text="Flip"
              onPress={() => props.onCancel()}
              style={styles.topText}
              buttonStyle={[styles.topButton, styles.flipButton]}
            />
          </View>
          <SnapButton onPress={() => takePicture()} />
        </View>
      </RNCamera>
      <Modal animationType="slide" visible={showConfirmation}>
        <ConfirmationPageOne
          uri={uri}
          isVideo={isVideo}
          onConfirm={(confirmedUri) => mediaConfirmed(confirmedUri)}
          onCancel={() => setShowConfirmation(!showConfirmation)}
        />
      </Modal>
    </View>
  );
};

const SnapButton = ({onPress, onLongPress}) => {
  return (
    <View>
      <TouchableHighlight
        onPress={() => onPress()}
        onLongPress={() => onLongPress()}>
        <View style={styles.capture} />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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

  flipButton: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
  },

  capture: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    alignSelf: 'center',
    marginBottom: 20,
  },
});
