import { View, Text, Image } from 'react-native'
import React from 'react'

const Item = () => {
    return (
        <>
            <View className="h-28 w-24 mr-4">
                <Image className="w-full h-24" source={{ uri: "https://img.freepik.com/premium-photo/isolated-pizza-with-mushrooms-olives_219193-8149.jpg" }} />
                <Text className="text-center">Pizza</Text>
            </View>
        </>
    )
}

export default Item