import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import tw from '../../../lib/tailwind';



const YourProblem = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Completed');
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

  return (
    <ScrollView style={tw`bg-white flex-1`}>
    

      <View style={tw`bg-[#F0F0F0] p-4 rounded-lg mx-[20px] my-2 `}>
        <Text style={tw`text-[14px] font-bold text-[#FF6769] mb-1`}>Device name</Text>
        <Text style={tw`text-[#000000] text-[12px] font-medium`}>Monitor</Text>
      </View>

      <View style={tw`bg-[#F0F0F0] p-4 rounded-lg mx-[20px] my-2 `}>
        <Text style={tw`font-bold text-[#FF6769]`}>Organization name</Text>
        <Text style={tw`text-[#000000]`}>ViewSonic</Text>
      </View>

 

      <View style={tw`bg-[#F0F0F0] p-4 rounded-lg mx-[20px] my-2 `}>
        <Text style={tw`font-bold text-[#FF6769]`}>Serial number</Text>
        <Text style={tw`text-[#000000]`}>JF2656NCDS8</Text>
      </View>
      <View style={tw`bg-[#F0F0F0] p-4 rounded-lg mx-[20px] my-2 `}>
        <Text style={tw`font-bold text-[#FF6769]`}>Your Address</Text>
        <Text style={tw`text-[#000000]`}>Rampura, Dhaka</Text>
      </View>
   
      <View style={tw`bg-[#F0F0F0] p-4 rounded-lg mx-[20px] my-2 `}>
        <Text style={tw`font-bold text-[#FF6769]`}>Problem:</Text>
        <Text style={tw`text-gray-600 text-[14px] font-normal`}>Lorem ipsum dolor sit amet consectetur. Cras in tellus dignissim pretium diam magna sed id. Ipsum est fringilla quam dolor tristique nunc lectus. Ultrices ultrices quis aenean lobortis sit. A sed consectetur venenatis id. Nibh fames nibh tincidunt et sit vitae rhoncus. Cursus feugiat viverra et nullam hac faucibus massa volutpat purus. Viverra et</Text>
      </View>


      <TouchableOpacity
        style={tw`bg-[#ED1C24] w-[50%] mx-auto p-4 rounded-lg  mt-4 items-center`} 
      
      >
        <Text style={tw`text-white font-bold`}>Send</Text>
      </TouchableOpacity>


    </ScrollView>
  );
};

export default YourProblem;
