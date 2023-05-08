import React, { useState } from 'react';
import { Alert, TouchableHighlight } from 'react-native';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { isEmail } from '../../utils';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import db from '../../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
function AuthLogin({ navigation, setIsLoggedIn }) {
    const goToSignUpPage = () => {
        navigation.navigate("Signup")
    }
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const login = () => {
        if (!email || !password || !isEmail(email)) {
            Alert.alert('Error...', 'please enter a valid email', [
                {
                    text: 'Ok',
                    onPress: () => { console.log("Error") }
                }
            ])
            return;
        }
        let userInfo = {
            email: email,
            password: password
        }
        console.log(userInfo);
        setLoading(true);
        getDocs(collection(db, 'users')).then(async (res) => {
            let isAuth = false;
            let id;
            res.forEach((doc) => {
                console.log(doc.data().email === email && doc.data().password === password);
                if (doc.data().email === email && doc.data().password === password) {
                    isAuth = true;
                    id = doc.id;
                }
            })
            if (isAuth) {
                setLoading(false);
                console.log(id);
                await AsyncStorage.setItem('id', id);
                Alert.alert('Sucesss', 'auth successfull, explore items', [
                    {
                        text: 'Ok',
                        onPress: () => { setIsLoggedIn(true) }
                    }
                ])
            }
            else {
                setLoading(false);
                Alert.alert('Error...', 'Email or password wrong, please try again', [
                    {
                        text: 'Ok'
                    }
                ])
            }
        }).catch((err) => {
            setLoading(false);
            Alert.alert('Error...', 'some error occured, pleae try again', [
                {
                    text: 'Ok',

                }
            ])
        })

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
                        <TextInput onChangeText={e => setEmail(e)} className="px-2 my-2 py-2 border rounded-lg border-gray-300" placeholder='Enter Your Email' />
                        <TextInput onChangeText={e => setPassword(e)} className="px-2 my-2 py-2 border rounded-lg border-gray-300" placeholder='Enter Your Password' />

                        <Text className="my-2 text-sm text-blue-800">Don't have an account ? <Text onPress={goToSignUpPage} className="text-black">Click Here</Text> </Text>
                        <TouchableHighlight underlayColor="transparent" onPress={login} >
                            <View className="py-2 my-2 rounded-lg bg-red-400">
                                <Text className="text-center text-xl font-bold text-white">
                                    {loading ? 'Loading...' : 'Log In'}
                                </Text>
                            </View>
                        </TouchableHighlight>
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