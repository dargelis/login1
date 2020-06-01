import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Button } from 'react-native';
import { AsyncStorage } from 'react-native';
import { DrawerActions } from '@react-navigation/native';


class  DeliveryNoteScreen extends React.Component{

    doLogout() {
        AsyncStorage.removeItem("token")
            .then(
                this.props.navigation.navigate('Login')
            )
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.dnWrapper}>
                    <Text
                         style={styles.userText}>
                             It is your Delivery Notes
                        </Text>
                        <Button
                            title="Show options"
                            onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                        />
                        <TouchableOpacity 
                            activeOpacity={0.5}
                            style={styles.logoutBtn}
                            onPress={() => this.doLogout()}
                            >
                            <Text
                                style={styles.logoutBtnText}
                            >Logout</Text>
                        </TouchableOpacity>
                       
                </View>
            </View>
            )
        }
}

export default DeliveryNoteScreen;

const styles = StyleSheet.create({
    container: {
        height:"100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    dnWrapper:{

    },
    userText:{
        fontSize: 30,
        fontWeight:"bold",
        marginBottom:10
    },
    logoutBtn:{
        backgroundColor:"red",
        paddingVertical:10,
        width:100,
        alignSelf:"center"

    },
    logoutBtnText:{
        color:"#fff",
        textAlign:"center",
        fontWeight:"bold"
    },
        
});