import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Nav() {
  return (
    <View>
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

const styles = StyleSheet.create({});
