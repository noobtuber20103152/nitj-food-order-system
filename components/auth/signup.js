import { View, Text, Image, SafeAreaView, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { TouchableHighlight } from 'react-native'
import { getUserNameFromEmail, isEmail } from '../../utils';
import db from '../../firebase/config';
import { getDocs, addDoc, query, collection } from "firebase/firestore"
export const AuthSignup = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confrimPassword, setConfirmPassword] = useState();
    const goToLoginPage = () => {
        navigation.navigate("Login")
    }
    const signUp = async () => {
        console.log({ email: email, password: password, confrimPassword: confrimPassword });
        // return ;
        if (!email || !password || !confrimPassword || password != confrimPassword || !isEmail(email)) {
            Alert.alert('User info !', 'Please user info correctly...', [
                {
                    text: 'ok',
                    onPress: () => console.log('Enter correct user info'),
                }
            ]);
            return;
        }

        getDocs(collection(db, "users")).then((res) => {
            let isEmailPresent = false;
            res.forEach((doc) => {
                if (doc.data().email === email) isEmailPresent = true;
            })
            if (isEmailPresent) {
                Alert.alert('Please try again...', 'Email already exists, please try another email', [
                    {
                        text: 'Ok',
                        onPress: () => console.log('Email already exists')
                    }
                ])
            }
            else {
                const userInfo = {
                    username: getUserNameFromEmail(email),
                    email: email,
                    password: password,
                    address: ""
                }
                console.log(userInfo);
                const collectionName = collection(db, "users");
                addDoc(collectionName, userInfo).then((result) => {
                    if (result) {
                        console.log(result);
                        Alert.alert('Account created successfully', 'Now you can login to your account', [
                            {
                                text: 'Login',
                                onPress: () => navigation.navigate("Login"),
                            }
                        ]);
                    }
                })
                    .catch((err) => {
                        console.log(err);
                        Alert.alert('Please try again', 'Some error occured during signup', [
                            {
                                text: 'Login',
                                onPress: () => console.log('Ask me later pressed'),
                            }
                        ]);
                    })
            }
        })
            .catch((err) => {
                Alert.alert('Error...', 'some error occured, please try again...', [
                    {
                        text: 'OK',
                        onPress: console.log("Error occured")
                    }
                ])
            })
        return;

    }
    const changeEmail = (e) => {
        setEmail(e);
    }
    const changePassword = (e) => {
        setPassword(e)
    }
    const changeConfirmPassword = (e) => {
        setConfirmPassword(e)
    }
    return (
        <>
            <ScrollView>
                <View>
                    <Image className="h-[40vh]" source={{ uri: "https://images.news18.com/ibnlive/uploads/2022/01/shutterstock_649541308-1.jpg" }}
                    />
                </View>
                <View className="mt-6">
                    <Text className="text-center text-2xl font-bold ">NITJ Online Food System</Text>
                </View>
                <View className="px-6">
                    <Text className="text-center  my-4">Sign up your account </Text>
                    <SafeAreaView>
                        <View>
                            <TextInput defaultValue={email} onChangeText={(e) => setEmail(e)} className="px-2 my-2 py-2 border rounded-lg border-gray-300" placeholder='Enter Your Email' />
                            <TextInput defaultValue={password} onChangeText={(e) => setPassword(e)} className="px-2 my-2 py-2 border rounded-lg border-gray-300" placeholder='Enter Your Password' />
                            <TextInput defaultValue={confrimPassword} onChangeText={(e) => setConfirmPassword(e)} className="px-2 my-2 py-2 border rounded-lg border-gray-300" placeholder='Confirm Your Password' />
                            <Text className="my-2 text-sm text-blue-800">Already have an account ? <Text onPress={goToLoginPage} className="text-black">Click Here</Text> </Text>
                            <TouchableHighlight underlayColor="transparent" onPress={signUp} >
                                <View className="py-2 my-2 rounded-lg bg-red-400">
                                    <Text className="text-center text-xl font-bold text-white">
                                        Sign Up
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </SafeAreaView>
                </View>
            </ScrollView>
        </>
    )
}

