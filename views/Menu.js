import React, {useContext, useEffect, Fragment} from 'react';
import {StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native'

import { Container,  
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Body,
} from 'native-base';
import globalStyles from '../styles/global';

import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';

const Menu = () => {

    //Context de firebase
    const {menu, obtenerProductos} = useContext(FirebaseContext);

    //Context de Pedido
    const {seleccionarPlatillo} = useContext(PedidoContext);
    
    //Hook pra redireccionar
    const navigation = useNavigation();

    useEffect(() => {
        obtenerProductos();
    }, []);

    const mostrarHeading = (categoria, i) => {

        if(i > 0){
            const categoriaAnterior = menu[i - 1].categoria;
        if(categoriaAnterior !== categoria){
            return(
                <ListItem style={styles.separador} itemDivider>
                    <Text style={styles.separadorTexto} >{categoria}</Text>
                </ListItem>
            )
        }
        }else{
            return(
                <ListItem style={styles.separador} itemDivider>
                    <Text style={styles.separadorTexto}>{categoria}</Text>
                </ListItem>
            )
        }
    }

    return ( 
         <Container style={globalStyles.contenedor}>
            <Container style={{backgroundColor:'#FFF'}}>
                <List>
                    {menu.map((platillo, i) => {
                        //console.log(platillo)
                        const {imagen, nombre, descripcion, categoria, id, precio} = platillo;

                        return(
                            <Fragment key={id}>

                                {mostrarHeading(categoria, i )}
                                <ListItem
                                    onPress={() => {

                                        //ELiminar algunas propiedades del platillo
                                        const {existencia, ...platillo2} = platillo;

                                        seleccionarPlatillo(platillo2)
                                        navigation.navigate("DetallePlatillo")
                                    }}
                                >
                                    <Thumbnail large square source={{uri:imagen}}/>
                                    <Body>
                                        <Text>{nombre}</Text>
                                        <Text 
                                            note
                                            numberOfLines={2}
                                        >
                                            {descripcion}
                                        </Text>
                                        <Text>Precio: $ {precio}</Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        )
                    })}
                </List>
            </Container>
        </Container> 
    );
}

const styles = StyleSheet.create({
    separador:{
        backgroundColor: '#000'
    },
    separadorTexto:{
            color: '#FFDA00',
            fontWeight: 'bold',
            textTransform: 'uppercase'
    }
})
 
export default Menu;