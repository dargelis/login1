import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Button } from 'react-native';
import { AsyncStorage ,Picker } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';


class  SalesOrdersScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectedValue:'',
            selectedValue2:''
        }
      }

      updatePicker = (Country) => {
         this.setState({ selectedValue: Country })
         console.log(this.state.selectedValue)
      }

      updatePicker2 = (Country) => {
        this.setState({ selectedValue2: Country.value })
        console.log(this.state.selectedValue2)
     }

    doLogout() {
        AsyncStorage.removeItem("token")
            .then(
                this.props.navigation.navigate('Login')
            )
    }



    render(){
        return (
            
            <View style={styles.container}>
                <View style={styles.soWrapper}>
                    <Text
                         style={styles.userText}>
                             It is your Sales orders 
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
                        <DropDownPicker
                            items={[
                                {label: 'Finland', value: 'FI'},
                                {label: 'Estonia', value: 'EE'},
                                {label: 'Latvia', value: 'LV'},
                                {label: 'Lithuania', value: 'LT'},
                                {label: 'Russia', value: 'RU'}
                            ]}
                            defaultValue={this.state.selectedValue2}
                            placeholder="Select your country"
                            containerStyle={{height: 50}}
                            activeItemStyle={{alignItems: 'center'}}
                            itemStyle={{alignItems: 'center'}}
                            onChangeItem={this.updatePicker2}
                            itemCount={5}
                        />

                        <Picker
                        selectedValue = {this.state.selectedValue}
                        onValueChange = {this.updatePicker}
                        style={{ height: 50, width: 150 }} >
                        <Picker.Item label="Finland" value="FI" />
                        <Picker.Item label="Estonia" value="EE" />
                        <Picker.Item label="Latvia" value="LV" />
                        <Picker.Item label="Lithunia" value="LT" />
                        <Picker.Item label="Russia" value="RU" />
                    </Picker>

                </View>
            </View>
            )
        }
}

export default SalesOrdersScreen;

const styles = StyleSheet.create({
    container: {
        height:"100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    soWrapper:{

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