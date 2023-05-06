import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableHighlight } from 'react-native'

const ServiceCard = (props) => {
    const goToScreen = () => {
        props.navigation.navigate(props.route)
    }
    return (
        <>
            <TouchableHighlight onPress={goToScreen} underlayColor="transparent">
                <View className="w-11/12 my-5 mx-auto  h-auto">
                    <Image className="h-[25vh] rounded-xl" source={{ uri: props.img }} />
                    <View className="-my-4 bg-blue-600 rounded-lg py-2 px-6  mx-auto w-11/12 ">
                        <Text className="text-xl text-white tracking-widest ">{props.title}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        </>
    )
}

export default ServiceCard