import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';

const RateGradient: React.FC<{ rate: number }> = ({ rate }) => {
  const size = 30;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const angle = rate * 3.6;

  const backgroundPath = Skia.Path.Make();
  backgroundPath.addCircle(size / 2, size / 2, radius);

  const foregroundPath = Skia.Path.Make();
  foregroundPath.addArc(
    {
      x: strokeWidth / 2,
      y: strokeWidth / 2,
      width: size - strokeWidth,
      height: size - strokeWidth,
    },
    -90, // 12시 방향에서 시작
    angle, // rate에 따른 끝 각도
  );

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        {/* 배경 도넛 */}
        <Path
          path={backgroundPath}
          style="stroke"
          strokeWidth={strokeWidth}
          color="#EAEAEA"
        />
        {/* 색 채워진 도넛 */}
        <Path
          path={foregroundPath}
          style="stroke"
          strokeWidth={strokeWidth}
          color="#9AD69D"
        />
      </Canvas>
      <Text style={styles.text}>{rate}</Text>
    </View>
  );
};

export default RateGradient;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    fontSize: 11,
    fontWeight: 300,
  },
  canvas: {
    width: 30,
    height: 30,
  },
});
