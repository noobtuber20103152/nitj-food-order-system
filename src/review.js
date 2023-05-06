import { View, Text, ScrollView, TouchableHighlight, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import db from '../firebase/config';
function FeedbackMessage(props) {
    return <>
        <View className=" my-2 px-2 py-2 bg-white h-auto rounded-lg">
            <Text className="text-sm text-gray-600">
                {props.title}
            </Text>
        </View>
    </>
}
function FeedbackModal(props) {
    let data = props.data;
    const [reviewMessage, setReviewMessage] = useState();
    const [rating, setRating] = useState();
    const submitReview = () => {
        if (!reviewMessage || !rating || parseInt(rating) < 0 || parseInt(rating) > 5) {
            Alert.alert('Error !!', 'Please enter rating or message correctly... ', [
                {
                    text: 'OK',
                    onPress: () => console.log("clicked")
                }
            ])
            return;
        }
        console.log(`${data.service}/${data.id}/review`);
        addDoc(collection(db, `${data.service}/${data.id}/review`), { review: reviewMessage, rating: parseInt(rating) })
            .then((e) => {
                console.log(e);
                Alert.alert('Thank You !!', 'Thank you for your feedback, please see other items', [
                    {
                        text: "OK",
                        onPress: () => {
                            props.openModal();
                            props.setFeedback([...props.feedback, { review: reviewMessage, rating: parseInt(rating) }])
                        }
                    }
                ])
            })
            .catch((err) => {
                Alert.alert('Error !!', 'Some error occured, please try again', [
                    {
                        text: 'OK',
                        onPress: () => props.openModal
                    }
                ])
            })

    }
    return <>
        <View className="absolute w-full  z-20 h-full  top-0  items-center bg-gray-100/80 justify-center">
            <View className="w-11/12 mx-auto my-auto py-4 px-4 bg-white  rounded-lg">
                <View className="justify-end items-end">
                    <TouchableHighlight onPress={props.openModal} underlayColor="transparent" >
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableHighlight>
                </View>
                <TextInput onChangeText={(e) => setReviewMessage(e)} className="my-2 border border-gray-300 py-1 px-2 rounded-lg" placeholder='Enter your review message' />
                <TextInput onChangeText={(e) => setRating(e)} keyboardType='numeric' className="my-2 border border-gray-300 py-1 px-2 rounded-lg" placeholder='Enter rating for this food item out of 5.' />
                <View className="mt-4">
                    <TouchableHighlight onPress={submitReview} underlayColor="transparent" >
                        <View className="py-3 bg-blue-500 rounded-lg">
                            <Text className="text-center text-xl font-normal tracking-wider uppercase text-white">Submit</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>

        </View>
    </>
}
const Review = ({ route, navigation }) => {
    const [modal, setModal] = useState(false);
    let [feedback, setFeedback] = useState(route.params.reviewData);
    const openModal = () => {
        setModal(!modal);
    }

    return (
        <>
            {modal && <FeedbackModal feedback={feedback} setFeedback={setFeedback} data={route.params.data} openModal={openModal} />}
            <ScrollView>
                <View className="px-4">
                    {feedback.length == 0 && <View className="mt-6">
                        <Text className="text-xl font-bold text-center">No review message available for this food item.</Text>
                    </View>}
                    {feedback?.map((e) => {
                        return <>
                            <FeedbackMessage title={e.review} />
                        </>
                    })}
                </View>
            </ScrollView>
            <View className="absolute flex items-end w-full px-3 py-4 justify-end z-20 bottom-0">
                <TouchableHighlight underlayColor="transparent" onPress={openModal}>
                    <View className="px-3 py-2 rounded-lg bg-blue-500 items-center  justify-center">
                        <Text className="text-xl text-white">Give Your Feedback  </Text>
                    </View>
                </TouchableHighlight>
            </View>
        </>
    )
}

export default Review