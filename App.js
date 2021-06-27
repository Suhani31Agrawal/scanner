import React from 'react';
import { Text, View ,TouchableOpacity , StyleSheet , Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'
// import { styleSheets } from 'min-document';

export default class Searchscreen extends React.Component {
  constructor (){
    super()
    this.state={
      buttonStatus:'normal',
      hasCameraPermission:null,
      scanned:false,
      scannedData:''
    }
  }

  getCameraPermissions=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)

    this.setState({
      buttonStatus:'clicked',
      hasCameraPermissions: status ==='granted',
      scanned:false
    })
  }

  handleBarCodeScanned=async({type,data})=>{
    this.setState({
      scanned:true,
      buttonStatus:'normal',
      scannedData:data
    })
  }

  render() {
    const hasCameraPermissions=this.state.hasCameraPermissions
    const scanned=this.state.scanned
    const buttonStatus=this.state.buttonStatus

    if(buttonStatus==='clicked' && hasCameraPermissions){
      return(
        <BarCodeScanner
          onBarcodeScanned={scanned?undefined
            :this.handleBarCodeScanned
          }
          style={StyleSheet.absoluteFillObject}
        />
      )
    }
    else if(buttonStatus==='normal'){
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           <Image 
            style={styles.imageicon}
            source={{ 
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg', 
            }}/>
          <Text style={styles.displayText}>
            {hasCameraPermissions===true?
            this.state.scannedData
            :
            "REQUEST FOR CAMERA PERMISSION"}
          </Text>
          <TouchableOpacity 
            style={styles.scannedButton}
            onPress={this.getCameraPermissions}
          >
            <Text style={styles.buttonText}>
              SCAN
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles=StyleSheet.create({
  displayText:{
    fontSize:15,
    textDecorationLine:'underline',
  },
  buttonText:{
    fontSize:20,
  },
  scannedButton:{
    backgroundColor:'blue',
    padding:10,
    margin:10,
  },
  imageicon: {
    marginLeft:-40,
    width:120,
    height:120,
   },
})