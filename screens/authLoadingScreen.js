import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { AsyncStorage } from 'react-native';

class  AuthLoadingScreen extends React.Component{

    constructor (){
        super();
        this.checkToken();
    }

    checkToken = async() => {
        const token = await AsyncStorage.getItem("token");
        if(token){
            this.props.navigation.navigate('MyTabs')
        }
        else {
            this.props.navigation.navigate('Login')
        }
        // alert(token);
    }

    render(){
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
            )
        }
}

export default AuthLoadingScreen;

const styles = StyleSheet.create({
    container: {
        height:"100%",
        alignItems: 'center',
        justifyContent: 'center'
    }
        
});