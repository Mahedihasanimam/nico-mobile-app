import { View, Text, TouchableOpacity, LayoutAnimation, UIManager } from 'react-native';
import React, { useState } from 'react';
import tw from '../../../lib/tailwind';
import { SvgXml } from 'react-native-svg';
import { Downarrow, rightArrow } from '../../../assets/Icons/icons';

// Android এর জন্য Layout Animation Enable করা
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      id: 1,
      question: '1. lorem ipsum dolor sit ?',
      answer:
        'Lorem ipsum dolor sit amet consectetur. Pulvinar a bibendum auctor tortor. Mi enim at id massa. In augue enim cras enim faucibus eu condimentum eu. Laoreet aliquam augue sapien nulla aliquam arcu lectus gravida nibh. Et pellentesque id justo lacus posuere nunc eleifend sodales gravida.',
    },
    {
      id: 2,
      question: '2. lorem ipsum dolor sit ?',
      answer: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    },
    {
      id: 3,
      question: '3. lorem ipsum dolor sit ?',
      answer: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    },
    {
      id: 4,
      question: '4. lorem ipsum dolor sit ?',
      answer: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    },
  ];

  const toggleAnswer = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <View style={tw`p-4 bg-white h-full`}>
      {faqData.map((item, index) => (
        <View
          key={item.id}
          style={tw`mb-2 bg-[#F0F0F0] rounded-lg overflow-hidden`}
        >
          <TouchableOpacity
            onPress={() => toggleAnswer(index)}
            style={tw`flex-row justify-between items-center p-4`}
          >
            <Text style={tw`text-[16px] text-black font-medium`}>
              {item.question}
            </Text>
            <Text style={tw`text-[20px] text-black`}>
              {activeIndex === index ? <SvgXml xml={Downarrow} /> : <SvgXml xml={rightArrow} />}
            </Text>
          </TouchableOpacity>
          {activeIndex === index && (
            <View style={tw`bg-gray-200 p-4`}>
              <Text style={tw`text-[16px] text-gray-700`}>
                {item.answer}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default FAQ;
