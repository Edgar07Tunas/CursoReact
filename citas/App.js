import React,{useState} from 'react';
import {Text, StyleSheet, View, FlatList,TouchableHighlight, TouchableWithoutFeedback, Keyboard,Platform, TouchableWithoutFeedbackBase} from 'react-native';

import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';


const App = () => {
  //Definir el state de citas
  const [citas,setCitas] = useState([
    {id: "1", paciente: "Hook", propietario: 'Juan', sintomas: "No Come"},
    {id: "2", paciente: "Hook", propietario: 'Dafne', sintomas: "No Duerme"},
    {id: "3", paciente: "Hook", propietario: 'Carlos', sintomas: "No Cena"}
  ]);

  //Elimina los pacientes
  const eliminarPaciente = (id) =>{
    setCitas((citasActuales) =>{
      return citasActuales.filter( cita => cita.id !== id);
    })
  }

  const [mostrarForm,guardarMostrarForm] = useState(false);

  const mostrarFormulario = ()=>{
    guardarMostrarForm(!mostrarForm);
  }

  const cerrarTeclado = () =>{
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style = {styles.contenedor}>
      <Text style ={styles.titulo}>Administrador de Citas</Text>

      <View>
        <TouchableHighlight onPress={()=> mostrarFormulario()} style = {styles.btnMostrar}> 
          <Text style = {styles.txtBtn}>{mostrarForm ? 'Cancelar Cita' : 'Crear Nueva Cita'}</Text>
        </TouchableHighlight>
      </View>

      <View style = {styles.contenido}>

        {mostrarForm ? (
          <>
            <Text style = {styles.titulo}>Nueva Cita</Text>
            <Formulario
              citas={citas}
              setCitas = {setCitas}
              guardarMostrarForm = {guardarMostrarForm}
            />
          </>
          
        ) : (
          <>
            <Text style = {styles.titulo}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas!, agrega una' }</Text>
            <FlatList
              style = {styles.listado}
              data={citas}
              renderItem = {({item}) => <Cita cita={item} eliminarPaciente={eliminarPaciente}/>}
              keyExtractor = {cita => cita.id}
            />
          </>
        )}
      </View>
  
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor:'#aa076b',
    flex:1
  },
  contenido:{
    flex:1,
    marginHorizontal: '2.5%'
  },
  listado:{
    flex:1
  },
  titulo:{
    color:'#fff',
    marginTop: Platform.OS === 'ios' ?  40: 10,
    marginBottom:20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center',
  },
  btnMostrar:{
    padding:10,
    backgroundColor:'#7d024e',
    marginVertical: 10
  },
  txtBtn:{
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default App;


