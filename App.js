// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default class App extends React.Component {
//     constructor(){
//         super();
//         this.state = {
//             ready: false,
//             where: {lat:null, lng:null},
//             error: null
//         }
//     }
//     componentDidMount(){
//         let geoOptions = {
//             enableHighAccuracy: true,
//             timeOut: 20000,
//             maximumAge: 60 * 60 * 24
//         };
//         this.setState({ready:false, error: null });
//         navigator.geolocation.getCurrentPosition( this.geoSuccess,
//                                                 this.geoFailure,
//                                                 geoOptions);
//     }
//     geoSuccess = (position) => {
//         console.log(position.coords.latitude);

//         this.setState({
//             ready:true,
//             where: {lat: position.coords.latitude,lng:position.coords.longitude }
//         })
//     }
//     geoFailure = (err) => {
//         this.setState({error: err.message});
//     }
//     render() {
//         return (
//             <View style={styles.container}>
//                 { !this.state.ready && (
//                 <Text style={styles.big}>Using Geolocation in React Native.</Text>
//                 )}
//                 { this.state.error && (
//                 <Text style={styles.big}>{this.state.error}</Text>
//                 )}
//                 { this.state.ready && (
//                     <Text style={styles.big}>{
//                     `Latitude: ${this.state.where.lat}
//                     Longitude: ${this.state.where.lng}`
//                     }</Text>
//                 )}
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#90EE90',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     big: {
//         fontSize: 48
//     }
// });

//Firebase to store data

// import React, { useState, useEffect } from 'react';
// import { Platform, Text, View, StyleSheet } from 'react-native';
// import Constants from 'expo-constants';
// import * as Location from 'expo-location';
//
// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//
//   useEffect(() => {
//     if (Platform.OS === 'android' && !Constants.isDevice) {
//       setErrorMsg(
//         'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
//       );
//     } else {
//       (async () => {
//         let { status } = await Location.requestPermissionsAsync();
//         if (status !== 'granted') {
//           setErrorMsg('Permission to access location was denied');
//         }
//
//         let location = await Location.getCurrentPositionAsync({});
//         setLocation(location);
//       })();
//     }
//   });
//
//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }
//
//   return (
//     <View style={styles.container}>
//       <Text style={styles.paragraph}>{text}</Text>
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#90EE90',
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

export default class Component extends React.Component {
  onPress = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Text>s{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}Enable background location</Text>
      </TouchableOpacity>
    );
  }
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    alert(error)
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
    alert(JSON.stringify(locations));
    // do something with the locations captured in the background
  }
});
