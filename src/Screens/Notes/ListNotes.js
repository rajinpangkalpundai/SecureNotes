import React, { useState, useCallback } from 'react';
import { FlatList, TouchableHighlight } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { isAndroid } from '_constants';
import { getEncryptedValue } from '_services/EncryptedStorage';
import NavigationService from '_navigations';
import routes from '_navigations/Routes';
import { Section, Text, Spinner, Button } from '_components';
import colors from '_styles/Colors';
import fonts from '_styles/Fonts';

export default () => {
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const publicKey = useStoreState((state) => state.login.publicKey);
  const logout = useStoreActions((action) => action.login.logout);

  useFocusEffect(
    useCallback(() => {
      async function getNotes() {
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
          const storedNotes = await getEncryptedValue('encryptedNotes');
          if (storedNotes) {
            setNotes(JSON.parse(storedNotes));
          }
        } else {
          logout();
        }
      }

      getNotes();

      setIsLoading(false);
    }, []),
  );

  if (isLoading) {
    return <Spinner color={colors.yellow} />;
  }

  return (
    <Section flex={1} backgroundColor={colors.lightGrey}>
      <Section paddingHorizontal={20} paddingVertical={isAndroid ? 20 : 40} rowFlexDirection>
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
      {notes ? (
        <FlatList
          data={notes}
          style={{ width: '100%' }}
          contentContainerStyle={{
            paddingVertical: 25,
            paddingHorizontal: 16,
          }}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              underlayColor={colors.lightGrey}
              onPress={() => NavigationService.navigate(routes.EDIT_NOTE_SCREEN, { id: item.id })}>
              <Section
                key={item.id}
                backgroundColor={colors.white}
                borderRadius={10}
                padding={20}
                marginTop={index > 0 ? 10 : 0}>
                <Text
                  fontFamily={fonts.default.bold}
                  fontSize={14}
                  color={colors.black}
                  label={item.title}
                />
                <Text
                  fontFamily={fonts.default.regular}
                  fontSize={12}
                  color={colors.grey}
                  label={item.content}
                  marginTop={7}
                />
                <Text
                  fontFamily={fonts.default.regular}
                  fontSize={10}
                  color={colors.yellow}
                  label={moment(item.last_modified).format('DD MMMM YYYY HH:mm')}
                  marginTop={12}
                />
              </Section>
            </TouchableHighlight>
          )}
        />
      ) : (
        <Section flex={1} justifyContent={'center'}>
          <Text
            fontFamily={fonts.default.regular}
            fontSize={14}
            color={colors.grey}
            label={'No notes found.'}
            textAlign={'center'}
          />
        </Section>
      )}
      <Section backgroundColor={colors.white} padding={20}>
        <Button
          label={'Add Note'}
          color={colors.yellow}
          fontFamily={fonts.default.regular}
          mode={'contained'}
          fontSize={20}
          onPress={() => NavigationService.navigate(routes.CREATE_NOTE_SCREEN)}
        />
      </Section>
    </Section>
  );
};
