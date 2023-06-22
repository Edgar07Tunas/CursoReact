import React,{useState} from "react";
import {Text, View,TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Alert} from 'react-native';

import {Picker} from '@react-native-picker/picker';

const Formulario = ({busqueda, guardarBusqueda,guardarConsulta}) =>{

    const {pais ,ciudad} = busqueda;

    const [ animacionboton ] = useState(new Animated.Value(1));

    const animacionEntrada = () =>{
        Animated.spring(animacionboton, {
            toValue: .9
        }).start();
    };

    const animacionSalida = () => {
        Animated.spring(animacionboton, {
            toValue: 1,
            friction: 2,
            tension: 10
        }).start();
    };
    
    const estiloAnimacion = {
        transform: [{scale: animacionboton}]
    }

    const consultarClima = () =>{
        if(pais.trim() === '' || ciudad.trim() === ''){
            mostrarAlerta();
            return;
        }

        guardarConsulta(true);
    }

    const mostrarAlerta = () =>{
        Alert.alert(
            'Error...',
            'Agrega una ciudad y pais para la buqueda',
            [{ text: 'OK'}]

        )
    }

    return(
        <>
            <View style = {styles.formulario}>
                <View>
                    <TextInput
                        value = {ciudad}
                        style = {styles.input}
                        onChangeText = {ciudad => guardarBusqueda({...busqueda,ciudad})}
                        placeholder="Ciudad"
                        placeholderTextColor="#666" 
                    />
                </View>
                <View>
                    <Picker
                        itemStyle = {{ height:120, backgroundColor:'#fff'}}
                        selectedValue = {pais}
                        onValueChange = {pais => guardarBusqueda({...busqueda,pais})}
                    >
                        <Picker.Item label = "-- Seleccione un país --" value=""/>
                        <Picker.Item label = "Estados Unidos" value="US"/>
                        <Picker.Item label = "México" value="MX"/>
                        <Picker.Item label = "Argentina" value="AR"/>
                        <Picker.Item label = "Colombia" value="CO"/>
                        <Picker.Item label = "Costa Rica" value="CR"/>
                        <Picker.Item label = "España" value="ES"/>
                        <Picker.Item label = "Peru" value="PE"/>
                    </Picker>
                </View>
                <TouchableWithoutFeedback
                    onPressIn = { () => animacionEntrada()}
                    onPressOut ={ () => animacionSalida()}
                    onPress = {() => consultarClima()}
                >
                    <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                        <Text style={styles.txtBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
};

const styles  = StyleSheet.create({
    formulario:{
        marginHorizontal: '2.5%'
    },
    input:{
        padding: 10,
        height: 50,
        backgroundColor: '#fff',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar:{
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    txtBuscar:{
        color: '#fff',
        fontWeight: 'bold', 
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    },
});

export default Formulario;