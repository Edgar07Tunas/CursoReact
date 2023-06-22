import React,{useState, useEffect} from 'react';
import { StyleSheet,Image, View, ScrollView, ActivityIndicator} from 'react-native';
import axios from 'axios';

import Header from './componentes/Header.js';
import Formulario from './componentes/Formulario.js';
import Cotisacion from './componentes/Cotisacion.js';

const App = () => {
  
  const [moneda, guardarMoneda] = useState('');
  const [criptoMoneda, guardarCriptoMoneda] = useState('');

  const [consultarApi, guardarConsultarApi] = useState(false);
  const [resultado, guardarResultado] = useState({});

  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if(consultarApi){        
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda},EUR`;
        
        const resultado = await axios.get(url);

        guardarCargando(true);
        
        setTimeout( ()=>{
          
          guardarResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
          guardarConsultarApi(false);
          guardarCargando(false);
        },3000 );
      }
    }
    cotizarCriptomoneda();
  }, [consultarApi])
  
  const componente = cargando ? <ActivityIndicator size ='large' color='#5e49e2' /> : <Cotisacion resultado = {resultado}/>;

  return (
    <>
      <Header/>
      <ScrollView>
      <Image
        style = {styles.imagen}
        source = { require('./assets/img/cryptomonedas.png') }
      />

      <View style = {styles.contenido}>
        
        <Formulario
          moneda = {moneda}
          criptoMoneda = {criptoMoneda}
          guardarMoneda = {guardarMoneda}
          guardarCriptoMoneda = {guardarCriptoMoneda}
          guardarConsultarApi = {guardarConsultarApi}
        />
      </View>

      <View style = {{marginTop: 20}}>
        {componente}
      </View>
      
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
imagen:{
  width: '100%',
  height: 150,
  marginHorizontal: '2.5%'
},
contenido:{
  marginHorizontal: '2.5%'
  
},
});

export default App;
