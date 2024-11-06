import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from "react-native"
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();

    return(
        <View>
            <Text>Home</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 30,
        paddingTop: height * 0.07
    }

});

export default Home;