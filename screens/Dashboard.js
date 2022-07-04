import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";

import LoginForCard from "../components/LoginForCard";
import { Color } from "../constants/Color";

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.loginCard}>
        <View style={styles.loginCardTop}>
          <Image
            style={styles.loginCardImage}
            source={require("../assets/logo.png")}
          />
        </View>
        <View style={styles.loginCardHead}>
          <Text style={styles.loginCardHeadline}>Health Portal Kolkata</Text>
        </View>
        <Text style={styles.loginFor}>My Dashboard</Text>
        <Text style={styles.docName}>Mr. PRATIK MITRA</Text>
        <Text style={styles.docName}>MBBS, DNB(MEDICINE)</Text>
        <LoginForCard />
      </View>
      <View style={styles.viewSpace}></View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.body,
    padding: 50,
    paddingBottom: 20,
  },
  loginCard: {
    backgroundColor: Color.secondary,
    width: "100%",
    paddingVertical: 60,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  loginCardTop: {
    alignItems: "center",
    marginBottom: 10,
  },
  loginCardHead: {
    backgroundColor: Color.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  loginCardHeadline: {
    color: Color.white,
    textTransform: "uppercase",
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  btnStyle: {
    backgroundColor: Color.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  btnStyleText: {
    color: Color.white,
    fontSize: 18,
    textAlign: "center",
  },
  loginFor: {
    color: Color.primary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  docName: {
    color: Color.black,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  viewSpace: {
    height: 100,
  },
  errAlert: {
    fontSize: 16,
    marginBottom: 10,
  },
});
