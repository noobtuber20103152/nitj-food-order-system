import { View, Text, Image, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native';
import { timestamp, addDoc, collection, serverTimestamp, getDocs } from 'firebase/firestore';
import db from '../firebase/config';
function FullStar() {
    return <>
        <FontAwesome name="star" size={24} color="green" />
    </>
}
function HalfStar() {
    return <>
        <FontAwesome name="star-half" size={24} color="green" />
    </>
}
function EmptyStar() {
    return <>
        <FontAwesome name="star-o" size={24} color="green" />
    </>
}

function Modal(props) {
    const [name, setName] = useState();
    const [hostel, setHostel] = useState()
    const [room, setRoom] = useState();
    const [quantity, setQuantity] = useState();
    const [phone, setPhone] = useState();

    const placeOrder = () => {
        if (!name || !hostel || !room || !quantity || !phone && parseInt(quantity) < 0 && parseInt(room) < 0 || phone.length != 10) {
            Alert.alert('Try again...', 'Please enter details correctly', [
                {
                    text: 'Ok',
                    onPress: () => console.log("clicked")
                }
            ])
            return;
        }
        let orderInfo = {
            name: name,
            hostel: hostel,
            room: parseInt(room),
            quantity: parseInt(quantity),
            phone: parseInt(phone),
            item: props.data,
            timestamp: serverTimestamp()
        }
        addDoc(collection(db, `${props.data.service}/${props.data.id}/order`), orderInfo)
            .then(res => {
                Alert.alert('Hurry e !! ', 'Your order placed successfully, try other items', [
                    {
                        text: "OK",
                        onPress: props.closeModal
                    }
                ])
            })
            .catch(err => console.log(err.message));
        // console.log(orderData);
    }
    const goToReviewPage = () => {

    }
    return <>
        <View className="absolute w-full  z-20 h-full  top-0  items-center bg-black/70 justify-center">
            <View className="w-11/12 mx-auto my-auto py-4 px-4 bg-white  rounded-lg">
                <View className="justify-end items-end">
                    <TouchableHighlight underlayColor="transparent" onPress={props.closeModal}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableHighlight>
                </View>

                <TextInput onChangeText={(e) => {
                    setName(e)
                }} className="my-2 border border-gray-300 py-1 px-2 rounded-lg" placeholder='Enter You Name' />
                <TextInput onChangeText={(e) => {
                    setHostel(e)
                }} className="my-2 border border-gray-300 py-1 px-2 rounded-lg" placeholder='Enter Hostel Name' />
                <TextInput onChangeText={(e) => {
                    setRoom(e)
                }} keyboardType='numeric' className="my-2 border border-gray-300 py-1 px-2 rounded-lg" placeholder='Enter Your Room no.' />
                <TextInput onChangeText={(e) => {
                    setQuantity(e)
                }} keyboardType='numeric' className="my-2 border border-gray-300 py-1 px-2 rounded-lg" placeholder='Enter quantity of the item' />
                <TextInput onChangeText={(e) => {
                    setPhone(e)
                }} keyboardType='numeric' className="my-2 border border-gray-300 py-1 px-2 rounded-lg" placeholder='Enter your phone no.' />
                <View className="mt-4">
                    <TouchableHighlight onPress={placeOrder} underlayColor="transparent" >
                        <View className="py-3 bg-red-500 rounded-lg">
                            <Text className="text-center text-xl font-normal tracking-wider uppercase text-white">Place Order</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>

        </View>
    </>
}
const FoodPage = ({ route, navigation }) => {
    // console.log(route.params);
    let data = route.params;
    const [model, setModel] = useState(false);
    const openModal = () => {
        setModel(!model);
    }

    const goToReviewScreen = () => {
        navigation.navigate('Review', { reviewData, data });
    }
    const [ratingStar, setRatingStar] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [fiveStar, setFiveStar] = useState(0);
    const [fourStar, setFourStar] = useState(0);
    const [threeStar, setThreeStar] = useState(0);
    const [twoStar, setTwoStar] = useState(0);
    const [oneStar, setOneStar] = useState(0);
    const [reviewData, setReviewData] = useState([]);
    useEffect(() => {

        async function getReviews() {
            console.log("foodpage")
            console.log(`${data.service}/${data.id}/review`)
            getDocs(collection(db, `${data.service}/${data.id}/review`))
                .then((result) => {
                    let sum = 0;
                    let count = 0;
                    let five = 0;
                    let four = 0;
                    let three = 0;
                    let two = 0;
                    let one = 0;
                    let arr = [];
                    result.forEach((doc) => {
                        arr.push({ id: doc.id, ...doc.data() });
                        console.log(doc.data().rating);
                        sum += doc.data().rating;
                        if (doc.data().rating == 5) {
                            five++;
                        }
                        else if (doc.data().rating == 4) {
                            four++;
                        }
                        else if (doc.data().rating == 3) {
                            three++;
                        }
                        else if (doc.data().rating == 2) {
                            two++;
                        }
                        else if (doc.data().rating == 1) {
                            one++;
                        }

                        count++;
                    })
                    setReviewData(arr);
                    if (sum != 0) {
                        setRatingStar(sum * 1.0 / count);
                    }
                    else {
                        setRatingStar(0);
                    }
                    setTotalReviews(count);
                    setFiveStar(five);
                    setFourStar(four);
                    setThreeStar(three);
                    setTwoStar(two);
                    setOneStar(one);
                    // console.log(ratingStar)
                })

        }
        getReviews();
    }, [])

    return (
        <>
            {model && <Modal data={data} closeModal={openModal} />}
            <ScrollView className="h-full ">

                <View className="px-4">
                    <Image className="w-full h-60 mt-4 rounded-lg" source={{ uri: data.img }} />
                    <View className="mx-auto w-11/12  -my-7 py-2 px-4 bg-white rounded-xl flex-row">
                        <View className="w-10/12">
                            <Text className="text-xl font-bold">{data.name}</Text>
                            <Text className="text-2xl font-bold ">₹{data.price} <Text className="text-lg  line-through text-red-300">{data.price + 25}</Text> </Text>
                        </View>
                        <View className="w-2/12 items-center justify-center">
                            <EvilIcons name="cart" size={40} color="black" />
                        </View>
                    </View>
                    <View className="rounded-lg px-4 mt-14 py-2 flex-row bg-white">
                        <View className="w-7/12  border-red-400">
                            <Text className=" text-2xl font-bold">
                                {ratingStar}/5
                            </Text>
                            <Text className="text-gray-600 text-sm">Based on {totalReviews} Reviews</Text>
                            <View className="flex-row my-4">
                                {[1, 2, 3, 4, 5, 6].map((e, index) => {
                                    if (Math.floor(ratingStar) >= (index + 1)) {
                                        return <>
                                            <FullStar />
                                        </>
                                    }
                                    else if (ratingStar > index - 1 && ratingStar < index) {
                                        return <>
                                            <HalfStar />
                                        </>
                                    }
                                    else if (ratingStar < index) {
                                        return <>
                                            <EmptyStar />
                                        </>
                                    }
                                })}
                            </View>
                        </View>
                        <View className="w-5/12  border-blue-400">
                            <View className="flex-row items-center">
                                <Text className="mr-2 font-bold">{fiveStar}</Text>
                                <View className="flex-row">
                                    {[1, 2, 3, 4, 5].map((e, index) => {
                                        if (index >= 5) return <EmptyStar />
                                        else return <FullStar />
                                    })}

                                </View>
                            </View>
                            <View className="flex-row items-center">
                                <Text className="mr-2 font-bold">{fourStar}</Text>
                                <View className="flex-row">
                                    {[1, 2, 3, 4, 5].map((e, index) => {
                                        if (index >= 4) return <EmptyStar />
                                        else return <FullStar />
                                    })}

                                </View>
                            </View>
                            <View className="flex-row items-center">
                                <Text className="mr-2 font-bold">{threeStar}</Text>
                                <View className="flex-row">
                                    {[1, 2, 3, 4, 5].map((e, index) => {
                                        if (index >= 3) return <EmptyStar />
                                        else return <FullStar />
                                    })}
                                </View>
                            </View>
                            <View className="flex-row items-center">
                                <Text className="mr-2 font-bold">{twoStar}</Text>
                                <View className="flex-row">
                                    {[1, 2, 3, 4, 5].map((e, index) => {
                                        if (index >= 2) return <EmptyStar />
                                        else return <FullStar />
                                    })}
                                </View>
                            </View>
                            <View className="flex-row items-center">
                                <Text className="mr-2 font-bold">{oneStar}</Text>
                                <View className="flex-row">
                                    {[1, 2, 3, 4, 5].map((e, index) => {
                                        if (index >= 1) return <EmptyStar />
                                        else return <FullStar />
                                    })}
                                </View>
                            </View>
                        </View>


                    </View>
                    {/* <View className="rounded-lg mt-14 bg-white px-4 py-2 flex-row items-center justify-between">
                        <View className="flex-row">
                            {[1, 2, 3, 4, 5, 6].map((e, index) => {
                                if (Math.floor(ratingStar) >= (index + 1)) {
                                    return <>
                                        <FullStar />
                                    </>
                                }
                                else if (ratingStar > index - 1 && ratingStar < index) {
                                    return <>
                                        <HalfStar />
                                    </>
                                }
                                else if (ratingStar < index) {
                                    return <>
                                        <EmptyStar />
                                    </>
                                }
                            })}
                        </View>
                        <View className="px-2 py-2 rounded-lg bg-green-400">
                            <Text className="text-lg font-semibold text-white">{ratingStar}/5</Text>
                        </View>
                    </View> */}
                    {/* <View className="mt-2 px-1">
                        <Text>Total Reviews: {totalReviews}</Text>
                    </View> */}
                    <View className="my-6" style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View className="bg-gray-300" style={{ flex: 1, height: 1 }} />
                    </View>
                    <View>
                        <Text className="text-lg text-gray-600">{data.desc}</Text>
                    </View>
                    <View className="my-6" style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View className="bg-gray-300" style={{ flex: 1, height: 1 }} />
                    </View>
                    <View className="mt-4">
                        <TouchableHighlight underlayColor="transparent" onPress={openModal} >
                            <View className="py-3 bg-red-500 rounded-lg">
                                <Text className="text-center text-xl font-normal tracking-wider uppercase text-white">Buy Now</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View className="my-4">
                        <TouchableHighlight underlayColor="transparent" onPress={goToReviewScreen} >
                            <View className="py-3 bg-blue-500 rounded-lg">
                                <Text className="text-center text-xl font-normal tracking-wider uppercase text-white">Review</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>

            </ScrollView>
        </>
    )
}

export default FoodPage