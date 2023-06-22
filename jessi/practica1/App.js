import React from 'react';

import { StyleSheet, Text, View} from 'react-native';

const App = () => {

  return (
    <View style = {styles.contenedor}>
        
        <View style = {styles.caja1}></View> 

        <View style = {styles.caja2}></View>

        <View style = {styles.caja3}></View>

        <View style = {styles.caja4}></View>

    </View>
  );
};

const styles = StyleSheet.create({

  contenedor:{
    backgroundColor: 'cornflowerblue',
    flex:1,
  },

  caja1:{
    backgroundColor: 'navy',
    height: '40%'
  },

  caja2:{
    backgroundColor: 'yellow',
    padding:20
  },

  caja3:{
    backgroundColor: 'green',
    padding:20
  },
  
  caja4:{
    backgroundColor: 'teal',
    padding:20
  },

});

export default App;
