import React, {useState}from 'react';
import {Text, StyleSheet, View, TextInput, Button,TouchableHighlight, Alert, ScrollView} from 'react-native';
import shortid from 'shortid';

import DateTimePickerModal from "react-native-modal-datetime-picker";

const Formulario = ({citas, setCitas, guardarMostrarForm}) =>{
    
    //Calendario
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = (date) => {
        const opciones = {year: 'numeric', month: 'long', day: "2-digit"};
        guardarfecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };

    //Relog

    const [isTimePickerVisible, setTimeDatePikerVisibility] = useState(false);

    const showTimePicker = () => {
        setTimeDatePikerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimeDatePikerVisibility(false);
    };

    const confirmarHora = (time) => {
        const opciones = {hour: 'numeric', minute: '2-digit'};
        guardarhora(time.toLocaleString('es-US',opciones));
        hideTimePicker();
    };
    
    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [fecha, guardarfecha] = useState('');
    const [hora, guardarhora] = useState('');
    const [sintomas, guardarSintomas] = useState('');

    //Crear Nueva Cita
    const crearNuevaCita = () =>{
        //Validar
        if( paciente.trim() === '' ||
            propietario.trim() === '' ||
            telefono.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === '' ||
            sintomas.trim() === ''){
              mostrarAlerta()
              return;  
            }
        
        //Crear nueva cita
        const cita = {paciente, propietario, telefono, fecha, hora, sintomas};

        cita.id = shortid.generate();

        //console.log(cita);

        //Agregar al State
        const NuevaCitas = [...citas, cita];
        setCitas(NuevaCitas);
            
        //Ocultar el Formulario
        guardarMostrarForm(false);
        
        //Resetear al Formulario
    }

    //Alerta
    const mostrarAlerta = () =>{
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            [{
                text: 'OK'
            }]
        )
    }

    return(
        <>
            <ScrollView style = {styles.formulario}>
               
                <View>
                    <Text style = {styles.label}>Paciente:</Text>
                    <TextInput 
                        style = {styles.input}
                        onChangeText = { (texto) => guardarPaciente(texto)}
                    />
                </View>
                
                <View>
                    <Text style = {styles.label}>Dueño:</Text>
                    <TextInput 
                        style = {styles.input}
                        onChangeText = {(texto) => guardarPropietario(texto)}
                    />
                </View>
                
                <View>
                    <Text style = {styles.label}>Telefono:</Text>
                    <TextInput 
                        style = {styles.input}
                        onChangeText = {(texto) => guardarTelefono(texto)}
                        keyboardType = {'numeric'}
                    />
                </View>
                
                <View>
                    <Text style={styles.label}>Fecha:</Text>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        locale={'es_ES'}
                        headerTextIOS="Elige la Fecha"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                     />
                     <Text>{fecha}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Hora:</Text>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        locale={'es_ES'}
                        headerTextIOS="Elige una Hora"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                     />
                     <Text>{hora}</Text>
                </View>
                
                <View>
                    <Text style = {styles.label}>Sintomas:</Text>
                    <TextInput
                        multiline
                        style = {styles.input}
                        onChangeText = {(texto) => guardarSintomas(texto)}
                    />
                </View>

                <View>
                    <TouchableHighlight onPress={()=> crearNuevaCita()} style = {styles.btnSubmit}> 
                        <Text style = {styles.txtBtn}>Agregar</Text>
                    </TouchableHighlight>
                </View>

            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    formulario:{
        backgroundColor:'#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '2.5%'
    },
    label:{
        fontWeight:'bold',
        fontSize:18,
        marginTop: 20
    },
    input:{
        marginTop:10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit:{
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

export default Formulario;