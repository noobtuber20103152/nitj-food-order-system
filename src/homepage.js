import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import Item from '../components/item';
import ServiceCard from '../components/servicecard';
const Homepage = ({ navigation }) => {
    return (
        <>
            <ScrollView className="bg-white">
                <View className="flex-row w-11/12 mt-6 mx-auto">
                    <View className="w-10/12 ">
                        <TextInput className="w-full rounded-lg py-2 px-2 border border-gray-300" />
                    </View>
                    <View className="w-2/12 items-center justify-center">
                        <Ionicons name="search-outline" size={35} color="black" />
                    </View>
                </View>
                <View className="flex-row justify-center items-center w-11/12 mt-10 mb-5 mx-auto">
                    <Text className="text-sm tracking-widest text-center uppercase">What's on your mind ?</Text>
                </View>
                <View className=" w-12/12 mx-auto mb-5 ">
                    <ScrollView horizontal={true}>
                        {[1, 4, 2, 1, 3, 1, 2, 5, 5].map((e) => {
                            return <>
                                <Item />
                            </>
                        })}
                    </ScrollView>
                </View>
                <View className="flex-row justify-center items-center w-11/12 mt-10 mb-5 mx-auto">
                    <Text className="text-sm tracking-widest text-center uppercase">What's service we are providing ?</Text>
                </View>

                <ServiceCard img="https://img.restaurantguru.com/w550/h367/r242-The-Snackers-burger.jpg" title="The Snackers" route="Snacker" navigation={navigation} />
                <ServiceCard img="https://b.zmtcdn.com/data/reviews_photos/8cb/beb7b5528b9dbbc0b1fa7d0f107848cb_1601017365.jpg" title="The Yadav Canteen" route="Yadav" navigation={navigation} />
                <ServiceCard img="https://10619-2.s.cdn12.com/rests/original/103_506046238.jpg" title="The Night Canteen" route="Night Canteen" navigation={navigation} />
                <ServiceCard img="https://v1.nitj.ac.in/images/menu_content/160331051721am65706.jpg" title="The Campus Cafe" route="Campus Cafe" navigation={navigation} />
            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});
export default Homepage