import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
// import { useNavigation } from "@react-navigation/native";
import { NetworkInfo } from "react-native-network-info";

import LoginForCard from "../components/LoginForCard";

import { Color } from "../constants/Color";
import axios from "axios";
import Dashboard from "./Dashboard";
import DashboardMultiDoc from "./DashboardMultiDoc";

const LoginScreen = () => {
  const [mob, setMob] = useState("");
  const [otp, setOTP] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOTPBoxVisible, setIsOTPBoxVisible] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isMultiSignIn, setIsMultiSignIn] = useState(false);
  const [err, setErr] = useState("");

  // const navigation = useNavigation();

  // manage state of login input and validate input data
  const numInput = (text) => {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert("please enter numbers only");
      }
    }
    setMob(newText);
  };

  //  Check if the user is signed in
  const checkSignIn = () => {
    console.log("result is: ", JSON.stringify(data, null, 4));

    if (data[0]?.statusFlag == 0) {
      setErr(data[0]?.message);
      setIsOTPBoxVisible(false);
    } else if (data[0]?.statusFlag == 1) {
      setIsSignIn(true);
      setIsMultiSignIn(false);
      setIsOTPBoxVisible(false);
    } else if (data[0]?.statusFlag == 2) {
      setIsMultiSignIn(true);
      setIsSignIn(false);
      setIsOTPBoxVisible(false);
    }
  };

  useEffect(() => {
    if (otp == "1234") {
      checkSignIn();
    }
  }, [data]);

  // fetch data from api to login
  const fetchData = async () => {
    var raw = JSON.stringify({
      MobileNo: mob,
      RemoteIp: "10.12.1.47",
    });

    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://10.12.1.170:8087/api/Login/GetLogin",
        requestOptions
      );
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();

      // console.log("result is: ", JSON.stringify(result, null, 4));
      setData(result);
    } catch (err) {
      console.log("Error: ", err);
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // OTP Generate and IP address tracking
  const generateOTP = () => {
    if (mob) {
      setIsOTPBoxVisible(true);
      fetchData();
    } else {
      setIsOTPBoxVisible(false);
      setErr("Please enter your mobile number");
    }
  };
  const confirmOTP = () => {
    if (mob) {
      setIsLoading(true);
      if (otp == "1234") {
        checkSignIn();
      }
      console.log("result is: ", JSON.stringify(data, null, 4));
    } else {
      setIsOTPBoxVisible(false);
      setErr("Please enter your mobile number");
    }
  };

  if (isSignIn) {
    return <Dashboard />;
  }
  if (isMultiSignIn) {
    return <DashboardMultiDoc />;
  }

  return (
    <>
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
          <Text style={styles.loginFor}>
            To avail the following services please login
          </Text>
          <LoginForCard />
        </View>
        <View style={styles.loginCard}>
          <View style={styles.loginCardHead}>
            <Text style={styles.loginCardHeadline}>DOCTOR LOGIN</Text>
          </View>
          {err ? <Text style={styles.errAlert}>{err}</Text> : <Text></Text>}
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            keyboardType="numeric"
            textContentType="telephoneNumber"
            onChangeText={(num) => numInput(num)}
            value={mob}
            maxLength={10}
          />

          {isOTPBoxVisible ? (
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="numeric"
              textContentType="oneTimeCode"
              onChangeText={(otp) => setOTP(otp)}
              value={otp}
              maxLength={10}
            />
          ) : (
            <Text></Text>
          )}

          {isOTPBoxVisible ? (
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => confirmOTP()}
            >
              <Text style={styles.btnStyleText}>Confirm OTP</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => generateOTP()}
            >
              <Text style={styles.btnStyleText}>GENERATE OTP</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.viewSpace}></View>
      </ScrollView>
    </>
  );
};

export default LoginScreen;

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
  },
  viewSpace: {
    height: 100,
  },
  errAlert: {
    fontSize: 16,
    marginBottom: 10,
  },
});
