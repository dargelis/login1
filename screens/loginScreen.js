import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image } from 'react-native';
import { AsyncStorage } from 'react-native';

class LoginScreen extends React.Component{

    state = {
        username: "",
        password: "",
        loading: false
    }

    onChangeHandler(state, value){
        this.setState({
            [state]:value
        })

    }

    doLogin(){

        const {username, password} = this.state;
        if (username && password){
            this.setState({
                loading: true
            })

            fetch('https://dargelis.net/app/backendresponseV2.php',{
                method:'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  QRY: 'AUTH',
                  UN: username,
                  PW: password
                })
              })
              .then((response) => response.json())
              .then((res) => {   

                this.setState({
                    loading: false
                })  

                if (res[0]['PW']!=""){
                    AsyncStorage.setItem("token",res[0]['PW']);
                    this.props.navigation.navigate('MyTabs')
                    
                    // this.props.navigation.navigate('PriceList')
                    //this.props.navigation.navigate('Dashboard')
                }
                else {
                    alert("Wrong password or username");
                    this.props.navigation.navigate('Login')
                }
                // alert(res[0]['PW']);
                // res.map(el =>{
                //   console.log(el.PW);
                // })
                // this.props.navigation.navigate('Dashboard')

              })
              .catch((error) =>{
                alert('connection error');
                this.setState({
                    loading: false
                })
               
              })
              .done();
        }
        else{
            alert ("Enter username and password");
            this.setState({
                loading: false
            })
        }
    }

    render(){
        const {username, password, loading} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.formWrapper}>

                    <Text
                        style={styles.welcomeText}>
                            Welcome !!
                    </Text>

                    <View style={styles.formRow}>
                        <TextInput 
                            style={styles.textInput}
                            placeholder="Enter username"
                            placeholderTextColor="green"
                            value={username}
                            onChangeText={(value)=>this. onChangeHandler('username', value)}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <TextInput 
                            style={styles.textInput}
                            placeholder="Enter password"
                            placeholderTextColor="green"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(value)=>this. onChangeHandler('password', value)}
                        />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            ...styles.signinBtn,
                            backgroundColor: loading ? "#ddd" : "#e42080"}}
                        onPress={() => this.doLogin()}
                        disabled={loading}
                        >
                        <Text
                            style={styles.signinText}
                        >{loading ? "Loading...":"Sign in"}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.imageWrapper}>
                        <Image 
                            source={require('../images/ant.png')} 
                            style={styles.logo}
                        />
                    </View>
                </View>
            </View>
            )
        }
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        height:"100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    formWrapper: {
        
        width:"80%"
    },
    formRow: {
            marginBottom: 10
        },
    textInput: {
        backgroundColor:"lightgreen",
        height:40,
        paddingHorizontal:10,
        color: "#333"
        },
    welcomeText:{
        textAlign:"center",
        marginBottom: 30,
        fontSize: 24,
        fontWeight:"bold",
        color:"#1b144d"
    },
    signinBtn:{
        // backgroundColor: "black",
        paddingVertical:10
    },
    signinText: {
        textAlign:"center",
        color:"#1b144d",
        fontSize: 18,
        fontWeight: "bold"
    },
    logo: {
        width: 300, 
        height: 300,
        borderRadius:15,
        opacity:0.8
        
    },
    imageWrapper:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:30
    }


        
});