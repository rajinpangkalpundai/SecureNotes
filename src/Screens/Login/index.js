import React, { useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useStoreActions } from 'easy-peasy';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

import { isAndroid } from '_constants';
import { saveEncryptedValue, getEncryptedValue } from '_services/EncryptedStorage';
import { Section, Text, Input, Button, Divider, Modal, TextButton } from '_components';
import colors from '_styles/Colors';
import fonts from '_styles/Fonts';

export default () => {
  const [password, setPassword] = useState('');
  const [storedPassword, setStoredPassword] = useState('');
  const [isModalPasswordVisible, setIsModalPasswordVisible] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [isModalChangePasswordVisible, setIsModalChangePasswordVisible] = useState(false);

  const loginUser = useStoreActions((action) => action.login.loginUser);

  const onPressBiometrics = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();

      const { available, biometryType } = await rnBiometrics.isSensorAvailable();

      if (!available || biometryType !== BiometryTypes.Biometrics) {
        Alert.alert('Oops!', 'Biometrics is not available, try using Text Password instead.');
        return;
      }

      if (available || biometryType === BiometryTypes.Biometrics) {
        const { publicKey } = await rnBiometrics.createKeys();

        /*
          please assume that this simulates the public key being sent to the user's entity in the database 
          alongside with the access time (access time will be used to determine if the key is expired or not and
          if expired, user will be prompted to genereate public key again), the public key will be used
          for comparison when fetching, creating, or editing the notes later.
        */
        await saveEncryptedValue('publicKey_Biometrics', publicKey);

        const timestamp = Math.round(new Date().getTime() / 1000).toString();
        const payload = `__${timestamp}`;

        const { success } = await rnBiometrics.createSignature({
          promptMessage: 'Sign In using Biometrics',
          payload,
        });

        if (!success) {
          Alert.alert('Oops!', 'Something went wrong. Please try again.');
          return;
        } else {
          loginUser(publicKey);
        }
      }
    } catch (error) {}
  };

  const onPressFaceId = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();

      const { available, biometryType } = await rnBiometrics.isSensorAvailable();

      if (!available || biometryType !== BiometryTypes.FaceID) {
        Alert.alert('Oops!', 'Face ID is not available, try using Text Password instead.');
        return;
      }

      if (available || biometryType === BiometryTypes.FaceID) {
        const { publicKey } = await rnBiometrics.createKeys();

        /*
          please assume that this simulates the public key being sent to the user's entity in the database 
          alongside with the access time (access time will be used to determine if the key is expired or not and
          if expired, user will be prompted to genereate public key again), the public key will be used
          for comparison when fetching, creating, or editing the notes later.
        */
        await saveEncryptedValue('publicKey_FaceId', publicKey);

        const timestamp = Math.round(new Date().getTime() / 1000).toString();
        const payload = `__${timestamp}`;

        const { success } = await rnBiometrics.createSignature({
          promptMessage: 'Sign In using Face ID',
          payload,
        });

        if (!success) {
          Alert.alert('Oops!', 'Something went wrong. Please try again.');
          return;
        } else {
          loginUser(publicKey);
        }
      }
    } catch (error) {}
  };

  const onPressTouchId = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();

      const { available, biometryType } = await rnBiometrics.isSensorAvailable();

      if (!available || biometryType !== BiometryTypes.TouchID) {
        Alert.alert('Oops!', 'Touch ID is not available, try using Text Password instead.');
        return;
      }

      if (available || biometryType === BiometryTypes.TouchID) {
        const { publicKey } = await rnBiometrics.createKeys();

        /*
          please assume that this simulates the public key being sent to the user's entity in the database 
          alongside with the access time (access time will be used to determine if the key is expired or not and
          if expired, user will be prompted to genereate public key again), the public key will be used
          for comparison when fetching, creating, or editing the notes later.
        */
        await saveEncryptedValue('publicKey_TouchId', publicKey);

        const timestamp = Math.round(new Date().getTime() / 1000).toString();
        const payload = `__${timestamp}`;

        const { success } = await rnBiometrics.createSignature({
          promptMessage: 'Sign In using Touch ID',
          payload,
        });

        if (!success) {
          Alert.alert('Oops!', 'Something went wrong. Please try again.');
          return;
        } else {
          loginUser(publicKey);
        }
      }
    } catch (error) {}
  };

  const onPressSubmitPassword = async () => {
    try {
      setIsModalPasswordVisible(false);
      if (!password) {
        Alert.alert('Error', 'Password can not be empty.');
      } else if (!storedPassword) {
        await saveEncryptedValue('textPassword', password);
        Alert.alert(
          'Successfully create your password',
          'Please select Password button again to login',
        );
      } else if (storedPassword && storedPassword != password) {
        Alert.alert('Error', 'Wrong Password.');
      } else {
        loginUser(password);
      }
    } catch (error) {}
  };

  const onPressChangePassword = async () => {
    try {
      setIsModalChangePasswordVisible(false);
      setNewPassword('');

      if (!password || !newPassword) {
        Alert.alert('Error', 'All field must not empty.');
      } else if (password != storedPassword) {
        Alert.alert('Error', 'Old password is wrong.');
      } else if (password == newPassword) {
        Alert.alert('Error', 'New password can not be the same as old password.');
      } else {
        await saveEncryptedValue('textPassword', newPassword);
        Alert.alert(
          'Successfully changed your password',
          'Please select Password button again to login',
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    let mounted = true;

    checkStoredPassword();

    return () => (mounted = false);
  }, []);

  async function checkStoredPassword() {
    const storedTextPassword = await getEncryptedValue('textPassword');

    //this will simulate the password stored in the server-side, but in this case we are saving it to local
    setStoredPassword(storedTextPassword);
  }

  return (
    <Section flex={1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, justifyContent: 'center' }}
        style={{ backgroundColor: colors.lightGrey }}>
        <Section justifyContent={'center'} marginBottom={20} rowFlexDirection>
          <Text
            fontFamily={fonts.default.regular}
            fontSize={40}
            color={colors.black}
            label={'Secure'}
            textAlign={'center'}
          />
          <Text
            fontFamily={fonts.default.bold}
            fontSize={40}
            color={colors.yellow}
            label={'Notes'}
            textAlign={'center'}
          />
        </Section>
        <Section backgroundColor={colors.white} paddingHorizontal={35} paddingVertical={40}>
          <Text
            fontFamily={fonts.default.regular}
            fontSize={16}
            color={colors.black}
            label={'Choose your login method:'}
            textAlign={'center'}
          />
          {isAndroid ? (
            <Button
              label={'Biometric'}
              color={colors.yellow}
              fontFamily={fonts.default.regular}
              marginTop={20}
              mode={'contained'}
              fontSize={20}
              onPress={onPressBiometrics}
            />
          ) : (
            <Section>
              <Button
                label={'Face ID'}
                color={colors.yellow}
                fontFamily={fonts.default.regular}
                marginTop={20}
                mode={'contained'}
                fontSize={20}
                onPress={onPressFaceId}
              />
              <Button
                label={'Touch ID'}
                color={colors.yellow}
                fontFamily={fonts.default.regular}
                marginTop={20}
                mode={'contained'}
                fontSize={20}
                onPress={onPressTouchId}
              />
            </Section>
          )}
          <Section alignItems={'center'} marginVertical={20} rowFlexDirection>
            <Divider borderColor={colors.grey} />
            <Text
              fontFamily={fonts.default.light}
              fontSize={12}
              color={colors.grey}
              marginHorizontal={'5%'}
              label={'or, try different way'}
            />
            <Divider borderColor={colors.grey} />
          </Section>
          <Button
            label={'Password'}
            color={colors.lightGrey}
            fontFamily={fonts.default.regular}
            mode={'contained'}
            fontSize={20}
            onPress={() => {
              setIsModalPasswordVisible(true);
              setPassword('');
              checkStoredPassword();
            }}
          />
        </Section>
      </ScrollView>
      <Modal
        isVisible={isModalPasswordVisible}
        backdropOpacity={0.5}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        useNativeDriver={true}
        modalContent={
          <Section
            backgroundColor={colors.white}
            paddingTop={20}
            paddingHorizontal={20}
            paddingBottom={10}
            borderRadius={4}>
            <Text
              fontFamily={fonts.default.bold}
              fontSize={15}
              label={storedPassword ? 'Input your password' : 'Set up new password'}
              marginVertical={5}
            />
            <Input
              mode={'outlined'}
              outlineColor={colors.grey}
              activeOutlineColor={colors.yellow}
              label={'Password'}
              textContentType={'password'}
              marginTop={5}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Section
              justifyContent={storedPassword ? 'space-between' : 'flex-end'}
              rowFlexDirection
              marginVertical={15}>
              {storedPassword && (
                <TextButton
                  label={'Change Password'}
                  color={colors.grey}
                  fontFamily={fonts.default.regular}
                  fontSize={15}
                  onPress={() => {
                    setIsModalPasswordVisible(false);
                    setPassword('');
                    setIsModalChangePasswordVisible(true);
                  }}
                />
              )}
              <Section justifyContent={'flex-end'} rowFlexDirection marginVertical={15}>
                <TextButton
                  label={'Submit'}
                  color={colors.yellow}
                  fontFamily={fonts.default.regular}
                  fontSize={15}
                  onPress={onPressSubmitPassword}
                />
                <TextButton
                  label={'Cancel'}
                  color={colors.grey}
                  fontFamily={fonts.default.regular}
                  fontSize={15}
                  marginLeft={10}
                  onPress={() => {
                    setIsModalPasswordVisible(false);
                  }}
                />
              </Section>
            </Section>
          </Section>
        }
      />
      <Modal
        isVisible={isModalChangePasswordVisible}
        backdropOpacity={0.5}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        useNativeDriver={true}
        modalContent={
          <Section
            backgroundColor={colors.white}
            paddingTop={20}
            paddingHorizontal={20}
            paddingBottom={10}
            borderRadius={4}>
            <Text
              fontFamily={fonts.default.bold}
              fontSize={15}
              label={'Change password'}
              marginVertical={5}
            />
            <Input
              mode={'outlined'}
              outlineColor={colors.grey}
              activeOutlineColor={colors.yellow}
              label={'Current Password'}
              textContentType={'password'}
              marginTop={5}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Input
              mode={'outlined'}
              outlineColor={colors.grey}
              activeOutlineColor={colors.yellow}
              label={'New Password'}
              textContentType={'password'}
              marginTop={5}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            <Section justifyContent={'flex-end'} rowFlexDirection marginVertical={15}>
              <TextButton
                label={'Change'}
                color={colors.yellow}
                fontFamily={fonts.default.regular}
                fontSize={15}
                onPress={onPressChangePassword}
              />
              <TextButton
                label={'Cancel'}
                color={colors.grey}
                fontFamily={fonts.default.regular}
                fontSize={15}
                marginLeft={10}
                onPress={() => {
                  setIsModalChangePasswordVisible(false);
                }}
              />
            </Section>
          </Section>
        }
      />
    </Section>
  );
};
