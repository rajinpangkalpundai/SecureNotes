import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import { Section } from '_atoms';

export default ({
  modalStyle,
  isVisible,
  onBackdropPress,
  onModalHide,
  backdropOpacity,
  animationIn,
  animationOut,
  animationInTiming,
  animationOutTiming,
  backdropTransitionInTiming,
  backdropTransitionOutTiming,
  useNativeDriver,
  modalContent,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={modalStyle}
      onBackdropPress={onBackdropPress}
      onModalHide={onModalHide}
      backdropOpacity={backdropOpacity}
      animationIn={animationIn}
      animationOut={animationOut}
      animationInTiming={animationInTiming}
      animationOutTiming={animationOutTiming}
      backdropTransitionInTiming={backdropTransitionInTiming}
      backdropTransitionOutTiming={backdropTransitionOutTiming}
      useNativeDriver={useNativeDriver}>
      <View>{modalContent}</View>
    </Modal>
  );
};
