import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import { Avatar } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import PhoneInput from "react-native-phone-number-input";

import { TextInput } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { Keyboard } from 'react-native'
const Home = ({ navigation }) => {
    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [about, setAbout] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState('DD/MM/YYYY')
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef < PhoneInput > (null);





    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(moment(date).format('D MMMM YYYY'))
        hideDatePicker();
    };


    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : "height"}>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>

                <View style={styles.homePage}>
                    <View style={styles.imagePicker}>
                        <Avatar
                            rounded
                            size="xlarge"
                            source={{ uri: image ? image : 'https://storage.googleapis.com/stateless-campfire-pictures/2019/05/e4629f8e-defaultuserimage-15579880664l8pc.jpg' }}
                        />
                        <TouchableOpacity onPress={pickImage} style={styles.addBtn}>
                            <Ionicons name="add-circle" size={44} color="#141414" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formContainer}>
                        <TextInput placeholder="Enter your Name " value={name} style={styles.inputStyles} onChangeText={(text) => { setName(text) }} />

                        <PhoneInput

                            defaultValue={value}
                            defaultCode="IN"
                            layout="first"
                            onChangeText={(text) => {
                                setValue(text);
                            }}
                            onChangeFormattedText={(text) => {
                                setFormattedValue(text);
                            }}
                            // withDarkTheme
                            // withShadow
                            autoFocus
                        />
                        <TouchableOpacity style={styles.calenderStyle} onPress={showDatePicker}>
                            <Text style={styles.calenderText}>{date}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        <TextInput placeholder="Enter your Email " style={styles.inputStyles} value={Email} onChangeText={(text) => { setEmail(text) }} />
                        <TextInput placeholder="Enter your About you " multiline style={styles.inputAbout} value={about} onChangeText={(text) => { setAbout(text) }} />


                    </View>


                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Profile', { name, Email, about, date,image,value }) }}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Home

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        top: hp('2%')
    },
    addBtn: {
        bottom: hp('6%'),
        left: wp('13%'),
        backgroundColor: '#fff',
        borderRadius: 20
    },
    formContainer: {
        alignItems: 'center',
        padding: 12
    },

    inputStyles: {
        padding: 14,
        borderWidth: 2,
        margin: 12,
        width: wp('80%'),
        borderRadius: 17
    },

    inputAbout: {
        padding: 14,
        borderWidth: 2,
        margin: 12,
        width: wp('80%'),
        borderRadius: 17,
        height: hp('12%')
    },
    calenderStyle: {
        backgroundColor: '#000',
        borderRadius: 12,
        width: wp('80%'),
        height: hp('5%'),
        alignItems: 'center',
        margin: 16
    },

    calenderText: {
        color: '#fff',
        marginTop: 8,
        fontSize: 20
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#2A9D8F',
        padding: 12,
        width: wp('70%'),
        left: wp('16%'),
        borderRadius: 12
    },

    buttonText: {
        fontSize: hp('3%'),
        color: '#fff'
    }


})
