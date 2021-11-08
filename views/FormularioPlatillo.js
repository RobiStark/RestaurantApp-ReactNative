import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {
    Container,
    Content,
    Form,
    Icon,
    Input,
    Grid,
    Col,
    Button,
    Text
} from 'native-base';

import { useNavigation } from '@react-navigation/native';

import globalStyles from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';

const FormularioPlatillo = () => {
    return ( 
    <Container>
        <Container>
            <Form>
                <Text style={globalStyles.titulo}> Cantidad </Text>
                <Grid>
                    <Col>
                        <Button>
                            <Icon name="remove"/>
                        </Button>
                    </Col>
                </Grid>
            </Form>
        </Container>
    </Container>
    );
}
 
export default FormularioPlatillo;