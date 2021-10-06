import { url } from 'getenv'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Profile = ({ route, navigation }) => {

    let data = route.params
    let name = data.name
    let email = data.Email
    let phone = data.value
    let image = data.image
    let about = data.about

    return (
        <View>
            <View style={styles.mainImage}>
                <Avatar rounded source={{ uri: image }} size="xlarge" />
            </View>
            <View style={styles.mainContent}>
                <View style={styles.firstContainer}>
                    <View style={styles.firstBox}>
                        <Text style={styles.labelStyle}>Name:</Text>
                        <Text style={styles.valueStyle}>{name}</Text>
                    </View>
                    <View style={styles.secondBox}>
                        <Text style={styles.labelStyle}>Phone Number:</Text>
                        <Text style={styles.valueStyle}>{phone}</Text>
                    </View>

                    <View style={styles.firstBox}>
                        <Text style={styles.labelStyle}>Email:</Text>
                        <Text style={styles.valueStyle}>{email}</Text>
                    </View>
                </View>
                <View style={styles.AboutContainer}>
                    <Text style={styles.aboutHeading}>
                        SomeThing About you:
                    </Text>
                    <Text style={styles.aboutDefination}>
                        {about}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    mainImage: {
        alignItems: 'center',
        top: hp('2%')
    },
    mainContent: {
        top: hp('4%')
    },
    firstContainer: {
        left: wp('12%')

    },
    firstBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    secondBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    AboutContainer: {
        top: hp('4%'),
        alignItems: 'center'
    },

    labelStyle: {
        fontSize: hp('2.6%'),
        fontWeight: '700'
    },
    valueStyle: {
        fontSize: hp('2.4%'),
        margin: 12
    },
    aboutHeading: {
        fontSize: hp('4%'),
        fontWeight: '800',
        margin:12
    },
    aboutDefination:{
        fontSize:hp('2.5%'),
        textAlign:'center',
        fontWeight:'500'
    }

})
