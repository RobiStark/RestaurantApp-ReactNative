import React, {useContext, useEffect} from 'react';
import {Alert, StyleSheet, ScrollView} from 'react-native';
import {
    Container,
    List,
    ListItem,
    Thumbnail,
    Left,
    Body,
    H1,
    Button,
    Text,
    Footer,
    FooterTab
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';
import firebase from '../firebase';
import PedidoContext from '../context/pedidos/pedidosContext';

const ResumenPedido = () => {

    const navigation = useNavigation();

    //vontext de pedido
    const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidoContext);
    
    useEffect(() => {
        calcularTotal();
    }, [pedido]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce((nuevoTotal, articulo) => nuevoTotal + articulo.total, 0);

        mostrarResumen(nuevoTotal);
    }

    //Funcion que reedirecciona a progreso de pedido
    const progresoPedido = () => {

        Alert.alert(
            'Revisa tu pedido',
            'Una vez que realiazas tu pedido, no podras cambiarlo.',
            [
                {
                    text:'Confirmar',
                    onPress: async () => {

                        //crear un objeto
                        const pedidoObj = {
                            tiempoentrega : 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido, //array
                            creado: Date.now()
                        }
                        console.log(pedidoObj);

                        try {
                            const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
                            pedidoRealizado(pedido.id)

                            //reedireccionar a progreso
                            navigation.navigate('ProgresoPedido');
                        } catch (error) {
                            console.log(error)
                        }
                    }
                },
                {
                    text: 'Revisar', style: 'cancel'
                }
            ]
        )
    }

    //Elimina un producto del areglo de pedido
    const confirmarEliminacion = id => {
        Alert.alert(
            'Deseas eliminar este articulo',
            'Una vez eliminado no se puede recuperar',
            [
                {
                    text:'Confirmar',
                    onPress:() => {
                        //eliminar del state
                        eliminarProducto(id)
                    }
                },
                {
                    text: 'Cancelar', style: 'cancel'
                }
            ]
        )
    }

    return ( 
        <Container style={globalStyles.contenedor}>
            <Container style={globalStyles.contenido}><ScrollView>
                <H1 style={globalStyles.titulo}>Resumen Pedido</H1>
                {pedido.map((platillo, i) => {
                    const {cantidad, nombre, imagen, id, precio} = platillo
                    return(
                        <List key={id + i}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large square source={{uri:imagen}}/>
                                </Left>
                                <Body>
                                    <Text>{nombre}</Text>
                                    <Text>Cantidad: {cantidad}</Text>
                                    <Text>Precio: $ {precio}</Text>
                                    <Button
                                        onPress={() => confirmarEliminacion(id)}
                                        full
                                        danger
                                        style={{marginTop:20}}
                                    >
                                        <Text style={[globalStyles.botonTexto, {color:'#FFF'}]}>Eliminar</Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}
                <Text style={globalStyles.cantidad}>Total a Pagar: $ {total}</Text>
                <Button
                    onPress={() => navigation.navigate('Menu')}
                    style={{marginTop: 30}}
                    full
                    dark
                ><Text style={[globalStyles.botonTexto, {color:'#FFF'}]}>Seguir pidiendo</Text></Button>

</ScrollView>
            </Container>
            <Footer>
            <FooterTab>
                <Button
                    style={globalStyles.boton}
                    onPress={() => progresoPedido() }
                >
                    <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
                </Button>
            </FooterTab>
        </Footer>
        </Container>
    );
}
 
export default ResumenPedido;   