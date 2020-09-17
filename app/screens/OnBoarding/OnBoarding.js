import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  FlatList,
  TouchableOpacity,
} from "react-native";

import Screen from "../../components/Screen";
import { theme, images } from "../../contants";
const { onboarding1, onboarding2, onboarding3 } = images;
const { COLORS, FONTS, SIZES } = theme;

const onBoardings = [
  {
    id: 1,
    title: "Let's Travelling",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: onboarding1,
  },
  {
    id: 2,
    title: "Navigation",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: onboarding2,
  },
  {
    id: 3,
    title: "Destination",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: onboarding3,
  },
];

function OnBoarding(props) {
  const [completed, setCompleted] = React.useState(false);

  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
        setCompleted(true);
      }
    });

    return () => scrollX.removeListener();
  }, []);

  function renderContent() {
    return (
      <FlatList
        data={onBoardings}
        decelerationRate={0}
        horizontal
        keyExtractor={(item, index) => `${item.id}`}
        pagingEnabled
        scrollEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: scrollX } },
            },
          ],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <View style={{ width: SIZES.width }}>
            {/* Image */}
            <View
              style={{
                flex: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={item.img}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            {/* Image */}
            <View
              style={{
                position: "absolute",
                bottom: "10%",
                left: 40,
                right: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color: COLORS.gray,
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  color: COLORS.gray,
                  marginTop: SIZES.base,
                }}
              >
                {item.description}
              </Text>
            </View>
            {/** Button */}
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.blue,
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                justifyContent: "center",
                paddingLeft: 20,
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 150,
                height: 60,
                marginBottom: 5,
              }}
              onPress={() => console.log("Buttton on pressed")}
            >
              <Text
                style={{ fontSize: 28, fontWeight: "700", color: COLORS.white }}
              >
                {completed ? "Let's Go" : "Skip"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    );
  }

  function renderDot() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.stepContainer}>
        {onBoardings.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={[styles.dot, { width: dotSize, height: dotSize }]}
            />
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>{renderContent()}</View>
      <View>{renderDot()}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  stepContainer: {
    position: "absolute",
    bottom: SIZES.base * 24,
    right: 0,
    left: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
});

export default OnBoarding;
