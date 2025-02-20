import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { qrscan } from '../../../assets/Icons/icons';
import QRCodeScanner from './QRScanner';
import tw from '../../../lib/tailwind';
import { useNavigation } from '@react-navigation/native';


const QrcodeCameraScreen = () => {
    const [scannedData, setScannedData] = useState("");
    const [hasPermission, setHasPermission] = useState(false);
    const [isScanning, setIsScanning] = useState(true);
    console.log('ssssscaned ddd', scannedData)
    const Navigation= useNavigation();
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Camera Permission",
                        message: "App needs camera permission to scan QR codes",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
            } catch (err) {
                console.warn(err);
                setHasPermission(false);
            }
        } else {
            setHasPermission(true);
        }
    };

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const onSuccess = (code) => {
        console.log("Scanned Code:", code);
        setScannedData(code.value);
        setIsScanning(false);
        Navigation.navigate('Your Problem')

    };


    if (!hasPermission) {
        return (
            <View style={styles.container}>
                <Text style={styles.centerText}>Camera permission is required</Text>
                <Button title="Request Permission" onPress={requestCameraPermission} />
            </View>
        );
    }

    return (
        <View>

            {isScanning && <QRCodeScanner onSuccess={onSuccess} />}
            {scannedData ? <Text style={styles.scannedText}>Scanned: {scannedData}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    centerText: {
        fontSize: 18,
        color: "#777",
        marginBottom: 10,
    },
    scannedText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});

export default QrcodeCameraScreen;
