import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Nav() {
  return (
    <View style={styles.nav}>
      <Pressable>
        <Image source={require('@/assets/images/nav_cal.png')} />
      </Pressable>
      <Pressable>
        <Image source={require('@/assets/images/nav_plus.png')} />
      </Pressable>
      <Pressable>
        <Image source={require('@/assets/images/nav_set.png')} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    paddingVertical: 25,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
