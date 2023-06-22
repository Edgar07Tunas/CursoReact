import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

const Header = () =>(
    <Text style = {styles.encabezado}>Criptomoneda</Text>
);

const styles = StyleSheet.create({
  encabezado:{
    paddingTop: Platform.OS === "ios" ? 50 : 10, 
    fontFamily: 'Lato-Black', //npx react-native link
    backgroundColor: '#5e49e2',
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: "uppercase",
    fontSize: 20,
    color: '#fff',
    marginBottom: 30,
  },
});

export default Header;