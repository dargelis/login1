import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { ListItem, FlatList } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'


const list = [
    {
      name: 'Amy Farha',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      subtitle: 'Vice Chairman'
    },
    {
    name: 'Alex',
    subtitle: 'MIS'
    },
    {
    name: 'Tima',
    subtitle: 'Student'
    },
    {
    name: 'Amy Farha',
    subtitle: 'Vice President'
    },
    {
    name: 'Chris Jackson',
    subtitle: 'Vice Chairman'
    },
    {
    name: 'Alex',
    subtitle: 'MIS'
    },
    {
    name: 'Tima',
    subtitle: 'Student'
    },
    {
    name: 'Amy Farha',
    subtitle: 'Vice President'
    },
    {
    name: 'Chris Jackson',
    subtitle: 'Vice Chairman'
    },
    {
    name: 'Alex',
    subtitle: 'MIS'
    },
    {
    name: 'Tima',
    subtitle: 'Student'
    },
]


class  DashboardScreen extends React.Component{
    onPress(val) {
        alert(val);
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
                <View style={styles.dashboardWrapper}>
                    <Text
                         style={styles.userText}>
                             Hello, it is your dash board
                        </Text>
                        <TouchableOpacity 
                            activeOpacity={0.5}
                            style={styles.logoutBtn}
                            onPress={() => this.doLogout()}
                            >
                            <Text
                                style={styles.logoutBtnText}
                            >Logout</Text>
                        </TouchableOpacity>

                        
                        <ScrollView>
                            {
                                list.map((l, i) => (
                                <ListItem
                                    key={i}
                                    title={l.name}
                                    leftIcon={{ name: 'reorder' }}
                                    subtitle={
                                        <View style={styles.subtitleView}>
                                        <Text style={styles.ratingText}>{l.subtitle}</Text>
                                        <Text style={styles.ratingText}>{l.name}</Text>
                                        </View>
                                    }
                                    bottomDivider
                                  
                                    Component={TouchableScale}
                                    friction={90} //
                                    tension={100} // These props are passed to the parent component (here TouchableScale)
                                    activeScale={0.95} //
                                    linearGradientProps={{
                                        colors: ['#FF9800', '#F44336'],
                                        start: { x: 1, y: 0 },
                                        end: { x: 0.2, y: 0 },
                                      }}
                                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                                    subtitleStyle={{ color: 'white' }}
                                    subtitle="Vice Chairman"
                                    chevron={{ color: 'white' }}
                                    onPress={() => this.onPress(l.name)}
                                />
                                ))
                            }
                        </ScrollView>
                        

                </View>
            </View>
            )
        }
}


export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        height:"100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    dashboardWrapper:{

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

    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingText: {
    paddingLeft: 10,
    color: 'blue'
    }
        
});