import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { collection, getDoc, getDocs } from "firebase/firestore"
import db from '../firebase/config'
import { TouchableHighlight } from 'react-native'
function ItemCard(props) {
    // console.log(props.data);
    const goToFoodPage = () => {
        props.navigation.navigate("Food Page", { ...props.data, service: 'campusCafeItems' })
    }
    return <>
        <TouchableHighlight underlayColor="transparent" onPress={goToFoodPage}  >
            <View className="bg-white rounded-lg py-6 px-2 my-2">
                <View className="flex-row">
                    <View className="w-8/12 pr-2">
                        <Text className="text-xl font-bold"> {props.name}</Text>
                        <Text className="text-sm text-gray-600">
                            {props?.desc?.slice(0, 100)}...
                        </Text>
                        <Text className="text-sm font-bold text-gray-600">₹{props.price}</Text>
                        {/* <Text className="text-sm font-bold text-blue-600">20% off</Text> */}
                    </View>
                    <View className="w-4/12">
                        <Image className="h-[13vh] rounded-lg" source={{ uri: props.img }} />
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    </>
}

const CampusCafe = ({ navigation }) => {
    let [items, setItems] = useState([]);

    useEffect(() => {
        async function getData() {
            let querySnapshot = await getDocs(collection(db, "campusCafeItems"));
            let arr = []
            querySnapshot.forEach((doc) => {
                // console.log(doc.id);
                // console.log(doc.data());
                arr.push({ id: doc.id, ...doc.data() });
                // setItems([...items, {id:doc.id, ...doc.data()}])
                // setItems([...items, ])
            })
            // console.log(arr.length);
            setItems(arr);
        }
        getData();
    }, [])
    // console.log(items);

    return (
        <>
            <ScrollView className="px-4 ">
                <View className="border bg-white px-2 py-2 border-1 border-gray-300 h-24 my-5 rounded-lg">
                    <View className="flex-row">
                        <View className="w-10/12">
                            <Text className="text-2xl font-bold">The Campus Cafe</Text>
                            <Text className="text-sm my-1 text-gray-600">Near by ECE building</Text>
                        </View>
                        <View className="w-2/12 border border-gray-200 rounded-lg">
                            <View className="h-1/2 bg-green-500 rounded-t-lg">
                                <Text className="text-lg font-bold text-center text-white">3.8/5 </Text>
                            </View>
                            <View className="">
                                <Text className="text-center text-sm">36 </Text>
                                <Text className="text-center text-gray-600">Reviews</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="mt-6">
                    {items?.map((e) => {
                        // console.log(e.data().img)
                        console.log(e.id);
                        return <>
                            <ItemCard navigation={navigation} key={e.id} data={e} name={e.name} desc={e.desc} price={e.price} img={e.img} />
                        </>
                    })}
                </View>
            </ScrollView>

        </>
    )
}

export default CampusCafe