import { Text, View } from "react-native"
import { Camera, useCameraDevice, useCodeScanner } from "react-native-vision-camera"

function QRCodeScanner({ onSuccess }) {
  const device = useCameraDevice('back')

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      codes?.map(code=>{
        console.log(code)
        onSuccess(codes[0])
      })
    }
  })
  if(!device){
    return <View>
      <Text>Devices is not found</Text>
    </View>
  }
  return (
    <Camera
      style={{ height : 500, width : 500}}
       codeScanner={codeScanner}
       device={device}
       isActive={true}
    />
  )
}

export default QRCodeScanner