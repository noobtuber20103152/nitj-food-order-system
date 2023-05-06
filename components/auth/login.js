import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

function AuthLogin({ navigation }) {
    const goToSignUpPage = () => {
        // console.log("Go to sign up page...")
        navigation.navigate("Signup")
    }
    return (
        <>
            <View>
                <Image className="h-[40vh]"
                    source={{ uri: "https://images.news18.com/ibnlive/uploads/2022/01/shutterstock_649541308-1.jpg" }}
                />
            </View>
            <View className="mt-6">
                <Text className="text-center text-2xl font-bold ">NITJ Online Food System</Text>
            </View>
            <View className="px-6 ">
                <Text className="text-center  my-4">Log In your account </Text>
                <SafeAreaView>
                    <View>
                        <TextInput className="px-2 my-2 py-2 border rounded-lg border-gray-300" placeholder='Enter Your Email' />
                        <TextInput className="px-2 my-2 py-2 border rounded-lg border-gray-300" placeholder='Enter Your Password' />

                        <Text className="my-2 text-sm text-blue-800">Don't have an account ? <Text onPress={goToSignUpPage} className="text-black">Click Here</Text> </Text>
                        <View className="py-2 my-2 rounded-lg bg-red-400">
                            <Text className="text-center text-xl font-bold text-white">
                                Log In
                            </Text>
                        </View>
                    </View>

                </SafeAreaView>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    stretch: {
        width: 50,
        height: 200,
        resizeMode: 'stretch',
    },
});
export default AuthLogin