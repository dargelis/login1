import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ScrollView,TextInput,Button } from 'react-native';
import { AsyncStorage,Keyboard } from 'react-native';
import { ListItem, FlatList } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'

const list = []


class  PriceListScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
          x:'',
          y:'',
          data:[],
          loaded: false
        }
      }


    scaladata = () => {

        const {x} = this.state; //order number
        Keyboard.dismiss();//hide keyboard
        fetch('https://dargelis.net/app/backendresponse.php',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            QRY: 'TEST',
            ORD: x
          })
        })
        .then((response) => response.json())
        .then((res) => {
            this.setState({data:res, loaded: true});
        })
        .catch((error) =>{
          alert('connection error');
        })
        .done();
      }
    
    onPress(val) {
        console.log(val);
      }

    doLogout() {
        AsyncStorage.removeItem("token")
            .then(
                this.props.navigation.navigate('Login')
            )
    }

    render(){
        const { x,y, data, loaded} = this.state;
        // console.log("get DB");
        if(loaded){
            console.log(data);
        }
        return (
            <View style={styles.container}>
                <View style={styles.plWrapper}>
                    <Text
                         style={styles.userText}>
                             It is your PriceList
                        </Text>
                        <Text>Your order</Text>
                        <TextInput
                        placeholder="enter order"
                        style={styles.input}
                        onChangeText={x => this.setState({x})}
                        
                        />
                        <TouchableOpacity 
                            activeOpacity={0.5}
                            style={styles.logoutBtn}
                            onPress={() => this.scaladata()}
                            >
                            <Text
                                style={styles.logoutBtnText}
                            >Get Scala DB</Text>
                        </TouchableOpacity>

                        <ScrollView>
                            {
                                data.map((l, i) => (
                                <ListItem
                                    key={i}
                                    title={l.ORD}
                                    leftIcon={{ name: 'ios-american-football' ,
                                                type: 'ionicon',
                                                color:'#517fa4'
                                                
                                            }}
                                    subtitle={
                                        <View style={styles.subtitleView}>

                                        <Text style={styles.ratingText}>{'('+l.LINE+')'}</Text>
                                        <Text style={styles.ratingText}>{' '+l.SC+' '+l.QTY+'pcs '+l.PRICE+'EUR'}</Text>
                                        <Button
                                        title='Click'
                                        onPress={() => alert(l.SC)}
                                         />
                                        </View>
                                    }
                                    bottomDivider

                                    Component={TouchableScale}
                                    // friction={90} //
                                    // tension={100} // These props are passed to the parent component (here TouchableScale)
                                    // activeScale={0.9} //
                                    linearGradientProps={{
                                        //colors: ['#FF9800', '#F44336'],
                                        colors: ['lightgreen', 'lightblue'],
                                        start: { x: 1, y: 0 },
                                        end: { x: 0.2, y: 0 },
                                      }}
                                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                                    subtitleStyle={{ color: 'white' }}
                                    chevron={{ color: 'white' }}
                                    onPress={() => this.onPress(l.SC)}
                                />
                                )) 
                            }
                        </ScrollView>

                </View>
            </View>
            )
        }
}

export default PriceListScreen;

const styles = StyleSheet.create({
    container: {
        height:"100%",
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    plWrapper:{
        width:"100%",
    },
    userText:{
        fontSize: 30,
        fontWeight:"bold",
        marginBottom:10,
        textAlign:"center"
    },
    logoutBtn:{
        backgroundColor:"red",
        paddingVertical:10,
        width:100,
        alignSelf:"center",
        borderRadius: 10,
        margin:10

    },
    logoutBtnText:{
        color:"#fff",
        textAlign:"center",
        fontWeight:"bold"
    },

    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingText: {
        paddingLeft: 10,
        color: 'blue'
    },
    input:{
        padding: 10,
        borderWidth: 2,
        backgroundColor: 'lightgreen',
        width: "100%",
        borderRadius: 10
    
      }
        
});