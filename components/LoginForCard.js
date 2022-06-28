import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import { Data } from "../constants/Data";

import { Color } from "../constants/Color";

const LoginForCard = () => {
  return (
    <>
      {Data.map((item) => {
        return (
          <View style={styles.card} key={item.id}>
            <View style={styles.cardImgView}>
              <Image source={item.imageURI} style={styles.cardImg} />
            </View>
            <Text style={styles.headline}>{item.headline}</Text>
            <Text style={styles.para}>{item.paragraph}</Text>
          </View>
        );
      })}
    </>
  );
};

export default LoginForCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.white,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  cardImgView: {
    alignItems: "center",
  },
  headline: {
    color: Color.primary,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  para: {
    textAlign: "center",
    lineHeight: 20,
    fontSize: 14,
  },
});
