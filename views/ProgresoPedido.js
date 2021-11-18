import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Text, H1, H3, Button} from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase';

const ProgresoPedido = () => {

    const {idpedido} = useContext(PedidoContext);

    const [tiempo, guardarTiempo] = useState(0);

    useEffect(() => {
        const obtenerProducto = () => {
            firebase.db.collection('ordenes')
                .doc(idpedido)
                .onSnapshot(function(doc) {
                    guardarTiempo(doc.data().tiempoentrega)
                })
        }
        obtenerProducto()
    }, [])
    return ( 
        <Container style={globalStyles.contenedor}>
            <View style={[globalStyles.contenido, {marginTop: 50}]}>
                {tiempo === 0 && (
                    <>
                        <Text style={{textAlign:'center'}}>Hemos recibido tu orden...</Text>
                        <Text style={{textAlign:'center'}}>Estamos calculando el tiempo de entrega</Text>
                    </>
                )}

                {tiempo > 0 && (
                    <>
                        <Text style={{textAlign:'center'}}>Su orden estara lista en: {tiempo} Minutos</Text>
                    </>
                )}
            </View>
        </Container>
    );
}
 
export default ProgresoPedido;