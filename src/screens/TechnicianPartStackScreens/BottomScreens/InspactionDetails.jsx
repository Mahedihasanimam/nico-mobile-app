import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';

import { SvgXml } from 'react-native-svg';
import tw from '../../../lib/tailwind';
import { aboutIcon, Downarrow, imageupload, rightArrow, videoUpload } from '../../../assets/Icons/icons';
import TicketDetailsHeader from '../../../lib/components/TicketDetailsHeader';
import { launchImageLibrary } from 'react-native-image-picker';

const InspactionDetails = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Completed');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const items = [
    { label: 'New', value: 'new' },
    { label: 'Assigned', value: 'assigned' },
    { label: 'Inspection sheet', value: 'inspection' },
    { label: 'Awaiting purchase order', value: 'purchase' },
    { label: 'Job card created', value: 'job-card' },
    { label: 'Completed', value: 'completed' },
  ];

  const handleSelect = (item) => {
    setValue(item.label);
    setOpen(false);
  };
 

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response && !response.didCancel) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleVideoPick = () => {
    launchImageLibrary({ mediaType: 'video' }, (response) => {
      if (response && !response.didCancel) {
        setVideo(response.assets[0].uri);
      }
    });
  };
  return (
    <ScrollView style={tw`bg-white flex-1`}>
      <TicketDetailsHeader />

      <View style={tw`bg-[#FFE7E7] p-4 rounded-lg mx-[20px] my-2  mt-6`}>
        <Text style={tw`text-[14px] font-bold text-[#FF6769] mb-1`}>ViewSonic monitorrrr</Text>
        <Text style={tw`text-[#000000] text-[12px] font-medium`}>JDSBH53423D</Text>
      </View>

      <View style={tw`bg-[#F0F0F0] p-4 rounded-lg mx-[20px] my-2 `}>
        <Text style={tw`font-bold text-[#FF6769]`}>Location:</Text>
        <Text style={tw`text-[#000000]`}>Rampura, Dhaka</Text>
      </View>

      <View style={tw`bg-[#F0F0F0] p-4 rounded-lg mx-[20px] my-2 `}>
        <Text style={tw`font-bold text-[#FF6769]`}>Problem:</Text>
        <Text style={tw`text-gray-600 text-[14px] font-normal`}>Lorem ipsum dolor sit amet consectetur. Cras in tellus dignissim pretium diam magna sed id. Ipsum est fringilla quam dolor tristique nunc lectus. Ultrices ultrices quis aenean lobortis sit. A sed consectetur venenatis id. Nibh fames nibh tincidunt et sit vitae rhoncus. Cursus feugiat viverra et nullam hac faucibus massa volutpat purus. Viverra et</Text>
      </View>

      <View style={tw`bg-[#F0F0F0] p-4 rounded-lg mx-[20px] my-2 `}>
        <Text style={tw`font-bold text-[#FF6769]`}>Assigned by:</Text>
        <Text style={tw`text-[#000000]`}>Jhone Doe (LE, Dhaka)</Text>
      </View>

      <View style={tw`bg-[#F0F0F0] p-4 rounded-lg mx-[20px] my-2 `}>
        <Text style={tw`font-bold text-[#FF6769]`}>Ticket status:</Text>
        <TouchableOpacity
          onPress={() => setOpen(!open)}
          style={tw`flex-row justify-between items-center mt-2 rounded-lg p-2`}
        >
          <Text style={tw`text-gray-600`}>{value}</Text>
          <Text style={tw`text-gray-600`}>{open ? <SvgXml xml={Downarrow} /> : <SvgXml xml={rightArrow} />}</Text>
        </TouchableOpacity>

        {open && (
          <View style={tw`mt-2  rounded-lg`}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => handleSelect(item)}
                style={tw` border border-gray-300 p-2 ${value === item.label ? 'bg-red-100' : 'bg-white'}`}
              >
                <Text style={tw`text-gray-600`}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={tw`bg-[#F0F0F0] p-4 rounded-lg mx-[20px] my-2 `}>
        <Text style={tw`font-bold text-[#FF6769]`}>Your Comment</Text>
        <TextInput
          placeholder="type here"
          multiline
          textAlignVertical="top"
          style={tw`p-2 rounded-lg mt-2 h-[190px]`}
        />

      </View>


      {/* TO DO IMAGE UPLOAD AND VIDEO UPLOAD ------- */}

      <View style={tw`flex-row justify-center space-x-4 my-4 gap-4`}>
        <TouchableOpacity
          onPress={handleImagePick}
          style={tw`border-2 border-dashed border-red-300 rounded-lg bg-[#F0F0F0] w-[40%] h-[150px] items-center justify-center`}
        >
          <SvgXml xml={imageupload} />
          <Text style={tw`text-[#777777] pt-2 font-bold`}>Take Image</Text>
          <Text style={tw`text-red-400`}>or <Text style={tw`font-bold`}>BROWSE</Text></Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleVideoPick}
          style={tw`border-2 border-dashed border-red-300 rounded-lg bg-[#F0F0F0] w-[40%] h-[150px] items-center justify-center`}
        >
            <SvgXml xml={videoUpload} />
          <Text style={tw`text-[#777777] pt-2 font-bold`}>Take Video</Text>
          <Text style={tw`text-red-400`}>or <Text style={tw`font-bold`}>BROWSE</Text></Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity
        style={tw`bg-[#ED1C24] w-[50%] mx-auto p-4 rounded-lg  my-4 items-center`}
        onPress={() => navigation.navigate('SheetPage')}
      >
        <Text style={tw`text-white font-bold`}>Go to sheet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default InspactionDetails;


