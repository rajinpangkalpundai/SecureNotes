import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { saveEncryptedValue, getEncryptedValue } from '_services/EncryptedStorage';
import NavigationService from '_navigations';
import routes from '_navigations/Routes';
import { Section, Input, Button } from '_components';
import colors from '_styles/Colors';
import fonts from '_styles/Fonts';

export default ({ route, navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [isBtnSaveDisabled, setIsButtonSaveDisabled] = useState(true);

  const publicKey = useStoreState((state) => state.login.publicKey);
  const logout = useStoreActions((action) => action.login.logout);

  useFocusEffect(
    useCallback(() => {
      if (title != null && content != '') {
        setIsButtonSaveDisabled(false);
      } else {
        setIsButtonSaveDisabled(true);
      }
    }, [title, content]),
  );

  const onPressSaveNote = async () => {
    let newNote = [];
    try {
      /*
          this simulates the process of verifying the public key with the collection of keys in the server, 
          but in this case we are using local storage as comparison. logout if there aren't any that matches
        */
      if (
        publicKey == (await getEncryptedValue('publicKey_Biometrics')) ||
        publicKey == (await getEncryptedValue('publicKey_TouchId')) ||
        publicKey == (await getEncryptedValue('publicKey_FaceId')) ||
        publicKey == (await getEncryptedValue('textPassword'))
      ) {
        let storedNotes = await getEncryptedValue('encryptedNotes');

        if (storedNotes) {
          storedNotes = JSON.parse(storedNotes);

          newNote = [
            ...storedNotes,
            {
              id: storedNotes.length + 1,
              title: title,
              content: content,
              last_modified: moment().format(),
            },
          ];
        } else {
          newNote = [
            {
              id: 1,
              title: title,
              content: content,
              last_modified: moment().format(),
            },
          ];
        }

        await saveEncryptedValue('encryptedNotes', JSON.stringify(newNote));

        NavigationService.navigate(routes.NOTES_LIST_SCREEN);
      } else {
        logout();
      }
    } catch (error) {}
  };

  return (
    <Section flex={1} backgroundColor={colors.lightGrey} justifyContent={'space-between'}>
      <Section marginTop={20} paddingHorizontal={20}>
        <Input
          mode={'outlined'}
          label={'Title'}
          outlineColor={colors.grey}
          activeOutlineColor={colors.yellow}
          marginTop={5}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Input
          mode={'outlined'}
          label={'Note Content'}
          outlineColor={colors.grey}
          activeOutlineColor={colors.yellow}
          marginTop={5}
          value={content}
          onChangeText={(text) => setContent(text)}
          multiline
        />
      </Section>
      <Section backgroundColor={colors.white} padding={20}>
        <Button
          label={'Save'}
          color={colors.yellow}
          fontFamily={fonts.default.regular}
          mode={'contained'}
          fontSize={20}
          onPress={onPressSaveNote}
          disabled={isBtnSaveDisabled}
        />
      </Section>
    </Section>
  );
};
