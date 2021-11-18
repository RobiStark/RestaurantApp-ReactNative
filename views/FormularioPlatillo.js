import React, {useContext, useState, useEffect} from 'react';
import {Alert, TextInput} from 'react-native';
import {
    Container,
    Icon,
    Grid,
    Col,
    Row,
    Button,
    Text,
    Footer,
    FooterTab
} from 'native-base';

import { useNavigation } from '@react-navigation/native';

import globalStyles from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';

const FormularioPlatillo = () => {

    //state para cantidades
    const[cantidad, guardarCantidad] = useState(1);
    const [total, guardarTotal] = useState(0);

    //Context
    const {platillo, guardarPedido} = useContext(PedidoContext);
    const {precio} = platillo;

    //redireccionar 
    const navigation = useNavigation();

    //En cuanto el componente carga, calcular la cantidad a pagar 
    useEffect(() => {
        calcularTotal();
    }, [cantidad])

    //Calcula el total del platillo por su cantidad
    const calcularTotal = () => {
        const totalPagar = precio * cantidad;
        guardarTotal(totalPagar);
    }

    //Decrementar en uno
    const decrementarUno = () => {
        if(cantidad > 1) {
            const nuevaCantidad = parseInt(cantidad) - 1;
            guardarCantidad(nuevaCantidad);
        }
    }
    //incrementar en uno la cantidad
    const incrementarUno = () => {
        const nuevaCantidad = parseInt(cantidad) + 1;
        guardarCantidad(nuevaCantidad);
    }

    //Confirma si la orden es correcta
    const confirmarOrden = () => {
        Alert.alert(
            '¿Deseas confirmar tu pedido?',
            'Un pedido confirmado ya no se podra modificar',
            [
                {
                text:'Confirmar',
                onPress: () => {
                    //ALmacenar el pedido al pedido principal
                    const pedido = {
                        ...platillo,
                        cantidad,
                        total
                    }
                    //console.log(pedido);
                    guardarPedido(pedido);

                    //Navegar hacia el resumen
                    navigation.navigate('ResumenPedido')
                }
            },
            {
                text: 'Cancelar',
                style:'cancel'
            }
        ]
        )
    }

    return ( 
    <Container>
        <Container>
                <Text style={globalStyles.titulo}> Cantidad </Text>
                <Grid>
                    <Row style={{height:50}}>
                    <Col>
                        <Button 
                            props
                            dark
                            style={{height:80, justifyContent: 'center'}}
                            onPress={() => decrementarUno()}
                        >
                            <Icon style={{fontSize: 40}} name="remove"/>
                        </Button>
                    </Col>
                    <Col>   
                            {/* <Input
                                style={{ textAlign: 'center', fontSize: 20, marginVertical:40}}
                                value={cantidad.toString()}
                                keyboardType="numeric"
                                onChangeText={ cantidad => guardarCantidad(cantidad)}
                            />  */}
                             <TextInput
                                style={{textAlign: 'center', fontSize: 20, marginVertical:30}}
                                value={cantidad.toString()}
                                keyboardType="numeric"
                                onChangeText={cantidad => guardarCantidad(cantidad)}
                            />           
                    </Col>
                    <Col>
                    <Button 
                            props
                            dark
                            style={{height:80, justifyContent: 'center'}}
                            onPress={() => incrementarUno()}
                        >
                            <Icon style={{fontSize: 40}} name="add"/>
                        </Button>
                    </Col>
                     </Row>
                    <Text style={[globalStyles.cantidad, {marginTop:50}]}>Total: $ {total}</Text>
                </Grid>
                
        </Container>
        <Footer>
            <FooterTab>
                <Button
                    style={globalStyles.boton}
                    onPress={() => confirmarOrden()}
                >
                    <Text style={globalStyles.botonTexto} >Ordenar Platillo</Text>
                </Button>
            </FooterTab>
        </Footer>
        {/* <Container>
            <Text style={[globalStyles.cantidad, {marginTop:5}]}>Total: $ {total}</Text>
        </Container> */}
        
    </Container>
    );
}
 
export default FormularioPlatillo;