import { View, Text } from 'react-native'
import React from 'react'
import tw from '../../../lib/tailwind'

const PrivacyPolocy = () => {

  const aboutData = [
    {
      id: 1,
      details: 'Lorem ipsum dolor sit amet consectetur. A aliquet eu quisque pharetra purus nulla. Tristique lorem condimentum ornare mauris consequat. Et in sit malesuada molestie consectetur aliquet arcu. At quis accumsan sed egestas netus non. Faucibus porttitor tortor consequat nunc lacus sed. Cursus tellus '
    },
    {
      id: 2,
      details: 'bibendum semper lacus odio ipsum. Tincidunt eu integer turpis eu. Amet elit morbi blandit fermentum.'
    },
    {
      id: 3,
      details: 'Dui vitae enim nam amet nulla augue ac nunc. Nibh quam lobortis faucibus enim sit. Lobortis lobortis proin tristique interdum hac tellus. Dui id sem pulvinar et ut enim purus. Eget vitae eget morbi at. Nunc sem sem cursus id posuere dolor sed a. Pretium mi nibh blandit '
    },
    {
      id: 4,
      details: 'duis. Ut non ut mauris purus. Velit lectus nisi egestas est lectus sed metus. Elit senectus integer non elit. Mi porta amet purus sollicitudin consectetur eget leo nullam. Suscipit sodales id orci massa vitae amet non vulputate sollicitudin. Nunc tortor morbi integer mauris tincidunt sit in nisl.tristique interdum hac tellus. Dui id sem'
    },
  ]

  return (
    <View style={tw`bg-white h-full`}>
      <View style={tw`p-4`}>
        <Text style={tw`text-[20px] text-[#000000] font-bold mb-4`}>
        Privacy policy     
        </Text>
        {aboutData.map((item) => (
          <View key={item.id} style={tw`mb-4`}>
            <Text style={tw`text-[16px] text-[#4A4A4A] font-normal`}>
              {item.details}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default PrivacyPolocy;
