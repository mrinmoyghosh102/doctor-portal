import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { Color } from "../constants/Color";
import Dashboard from "./Dashboard";

const DashboardMultiDoc = () => {
  const [isDataGot, setIsDataGot] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [data, setData] = useState([]);
  const [isSignIn, setIsSignIn] = useState(false);

  // const [items, setItems] = useState([
  //   { key: "1", label: "Apple", value: "apple" },
  //   { key: "2", label: "Banana", value: "banana" },
  // ]);
  const [dropItem, setDropItem] = useState([]);

  const dataRetrive = async () => {
    // console.log('DATA', data[0]?.doctorDetails)
    var tempArr = [];
    await data[0]?.doctorDetails.map((item) => {
      // console.log('Item2', {"key": `${item.docRegNo}`, 'label': `${item.docName}`, "value": `${item.docRegNo}`})
      // setDropItem(dropItem.concat(item.docName));
      // setDropItem([...dropItem, {"key": `${item.docRegNo}`, 'label': `${item.docName}`, "value": `${item.docRegNo}`}]);
      tempArr.push({
        key: `${item.docRegNo}`,
        label: `${item.docName}: ${item.department}`,
        value: `${item.docRegNo}`,
      });
    });
    setDropItem(tempArr);
    // console.log("dataItem", dropItem);
  };

  const fetchDataFromAPI = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      MobileNo: "9433207027",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      "http://10.12.1.170:8087/api/DocSelect/GetDocList",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log("res", result[0].doctorDetails)
        setData(result);
        setIsDataGot(true);
        // console.log("hello", data[0].doctorDetails)
      })
      .catch((error) => console.log("error", error));
    await dataRetrive();
    // console.log(dropItem);
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, [isDataGot]);

  useEffect(() => {
    if (value !== null) {
      setIsSignIn(true);
    }
  }, [value]);
  console.log("value", value);
  console.log("open", open);
  console.log("dropItem", dropItem);
  console.log("isSignIn", isSignIn);

  if (isSignIn) {
    return <Dashboard />;
  }

  return (
    <View style={styles.container}>
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
          Select Doctor's Department From Following List
        </Text>

        <DropDownPicker
          open={open}
          value={value}
          items={dropItem}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setDropItem}
        />
      </View>
      <View style={styles.viewSpace}></View>
    </View>
  );
};

export default DashboardMultiDoc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.body,
    paddingVertical: 50,
    paddingHorizontal: 20,
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
    fontSize: 32,
    textAlign: "center",
  },
  loginFor: {
    color: Color.primary,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
