import React,{useState, useEffect} from 'react';
import {Keyboard, StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';

import Formulario from './componentes/Formulario';

const App = () => {

  const  [busqueda, guardarBusqueda] = useState(
    { ciudad:'', pais:''}
  );

  const  [consulta, guardarConsulta] = useState(false);

  const {ciudad, pais} = busqueda;

  useState (()=>{
    if(consulta){
      const appId ='123456';
      const url = `api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}` 
      
      console.log(url);
    }
  }, [consulta]);

  const ocultarTeclado = () =>{
    Keyboard.dismiss();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={()=>ocultarTeclado()}>
        <View style = {styles.app}>
          <View styles = {styles.contenido}>
            <Formulario
              busqueda = {busqueda}
              guardarBusqueda = {guardarBusqueda}
              guardarConsulta = {guardarConsulta}
            />
          </View>
        </View>
      </TouchableWithoutFeedback> 
    </>
  );
};

const styles = StyleSheet.create({
  app:{
    flex: 1,
    backgroundColor: 'rgb(71, 149, 212)',
    justifyContent: 'center',
  },
  contenido:{
    marginHorizontal: '5%',
  }
});

export default App;
