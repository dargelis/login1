import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Dimensions,
    Image
} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
    
import {BarCodeScanner} from 'expo-barcode-scanner';
    
export default class PurchaseOrdersScreen extends React.Component {
      state = {
        hasCameraPermission: null,
        scanned: false,
      };
    
      async componentDidMount() {
        this.getPermissionsAsync();
      }
    
      getPermissionsAsync = async() => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
      };

      handleBarCodeScanned = ({type,data}) => {
        this.setState({ scanned: true  });
        alert("Bar code with type "+type+" and data "+data+" has been scanned!");
      };
    
    render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
        return <Text> Requesting for camera permission </Text>;
    }
    if (hasCameraPermission === false) {
        return <Text> No access to camera </Text>;
    }
    return ( 
        <View style ={styles.container} >
        <BarCodeScanner 
            onBarCodeScanned = { scanned ? undefined : this.handleBarCodeScanned }
            style = { StyleSheet.absoluteFillObject}  >
        {/* <Image
          style={styles.qr}
          source={require('../images/QR.png')}
        /> */}

        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />

        {
        scanned && 
        ( <Button 
            title = {'Tap to Scan Again' }
            onPress = {() => this.setState({scanned: false }) }/>
            )
        } 
        </BarCodeScanner>
        </View>
    );
    }


}

const { width } = Dimensions.get('window')
const qrSize = width * 0.9
const opacity = 'rgba(0, 0, 0, .5)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    qr: {
        marginTop: '50%',
        marginBottom: '50%',
        marginLeft: '5%',
        marginRight: '5%',
        width: qrSize,
        height: qrSize,
      },
      layerTop: {
        flex: 1,
        backgroundColor: opacity
      },
      layerCenter: {
        flex: 1,
        flexDirection: 'row'
      },
      layerLeft: {
        flex: 1,
        backgroundColor: opacity
      },
      focused: {
        flex: 10
      },
      layerRight: {
        flex: 1,
        backgroundColor: opacity
      },
      layerBottom: {
        flex: 1,
        backgroundColor: opacity
      },
        
});