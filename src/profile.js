import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { collection, doc, getDoc } from 'firebase/firestore';
import { FontAwesome5 } from '@expo/vector-icons';
import db from '../firebase/config';
const Profile = () => {
    const [userInfo, setUserInfo] = useState(
        {
            email: undefined,
            username: undefined,
            address: undefined,
            phone: undefined
        }
    );
    useEffect(() => {
        getDoc(doc(db, "users", "goOTMe9vXn2NSs07xGfK"))
            .then((res) => {
                setUserInfo(
                    {
                        email: res.data().email,
                        username: res.data().username.length ? res.data().username : undefined,
                        address: res.data().address.length ? res.data().address : undefined
                    }
                )
                console.log(userInfo);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <>
            <ScrollView className="px-4">
                <View className=" bg-white py-2 px-2 rounded-lg my-4">
                    <View className="flex-row">
                        <View className="w-2/12">
                            <Image className="w-16 h-16 rounded-full" source={{ uri: "https://bountycdn.azureedge.net/~/media/b9bedc08353044c5b7e354858f0c4db1.ashx?la=en" }} />
                        </View>
                        <View className="w-10/12 ml-4 justify-center">
                            <Text className="text-lg font-bold">{userInfo.username}</Text>
                            <Text className="text-sm text-gray-600">How are you ?</Text>
                        </View>
                    </View>
                </View>
                <View className="my-4 bg-white py-2 px-4 rounded-lg">
                    <View className="flex-row items-center ">
                        <Feather name="phone" size={20} color="black" />
                        <Text className="my-1 ml-3 text-gray-600">{userInfo?.phone ? userInfo.phone : '+91xxxxxxxxxx'}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <MaterialCommunityIcons name="email-minus-outline" size={20} color="black" />
                        <Text className=" text-gray-600 ml-3 my-1">{userInfo.email}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <FontAwesome5 name="address-book" size={20} color="black" />
                        <Text className=" text-gray-600 ml-3 my-1">{userInfo.address ? userInfo.address : 'Address not found'}</Text>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default Profile