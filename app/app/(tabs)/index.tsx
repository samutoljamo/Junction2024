import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.iphone13145}>
      <Image
        style={styles.iphone13145Child}
        resizeMode="cover"
        //source="Rectangle 2.png"
      />
      <View style={[styles.iphone13145Item, styles.iphone13145Layout]} />
      <Text style={[styles.imHere, styles.backTypo]}>Im here</Text>
      <View style={[styles.iphone13145Inner, styles.iphone13145Layout]} />
      <Text style={[styles.back, styles.backTypo]}>Back</Text>
      <Text style={[styles.kaapelitehdas, styles.stFloorTypo]}>
        Kaapelitehdas
      </Text>
      <Text style={[styles.needOfInspection, styles.stFloorTypo]}>
        Need of inspection XX
      </Text>
      <Text style={[styles.stFloor, styles.stFloorTypo]}>1:st Floor</Text>
      <Image
        style={styles.ellipseIcon}
        resizeMode="cover"
        // source="Ellipse 1.png"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  iphone13145Layout: {
  height: 50,
  width: 175,
  borderWidth: 1,
  borderColor: "#000",
  borderStyle: "solid",
  borderRadius: 50,
  top: 694,
  position: "absolute"
  },
  backTypo: {
  textAlign: "left",
  color: "#f7f7f7",
  fontFamily: "Inter-Regular",
  fontSize: 24,
  position: "absolute"
  },
  stFloorTypo: {
  color: "#fff",
  textAlign: "left",
  fontFamily: "Inter-Regular",
  position: "absolute"
  },
  iphone13145Child: {
  top: 136,
  left: 27,
  borderRadius: 23,
  width: 341,
  height: 487,
  position: "absolute"
  },
  iphone13145Item: {
  left: 200
  },
  imHere: {
  top: 704,
  left: 243
  },
  iphone13145Inner: {
  left: 20
  },
  back: {
  top: 702,
  left: 80
  },
  kaapelitehdas: {
  top: 41,
  left: 136,
  fontSize: 20,
  color: "#fff"
  },
  needOfInspection: {
  top: 96,
  left: 98,
  fontSize: 20,
  color: "#fff"
  },
  stFloor: {
  top: 639,
  left: 125,
  fontSize: 32
  },
  ellipseIcon: {
  top: 564,
  left: 151,
  width: 43,
  height: 43,
  position: "absolute"
  },
  iphone13145: {
  flex: 1,
  width: "100%",
  height: 844,
  overflow: "hidden"
  }
  });
  