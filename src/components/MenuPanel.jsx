import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const MenuPanel = () => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('HomeScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        setTimeout(() => navigation.navigate(screen), 0);
    };    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'HistoriesScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('HistoriesScreen')}>
                    <Icons type={'history'} active={activeButton === 'HistoriesScreen'}/>
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'SettingsScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('SettingsScreen')}>
                    <Icons type={'settings'} active={activeButton === 'SettingsScreen'}/>
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'HomeScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('HomeScreen')}>
                    <Icons type={'home'} active={activeButton === 'HomeScreen'}/>
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'CatalogueScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('CatalogueScreen')}>
                    <Icons type={'book'} active={activeButton === 'CatalogueScreen'}/>
                </TouchableOpacity>
            </View>


            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={[styles.button, activeButton === 'CraftScreen' && styles.activeButton]} 
                    onPress={() => handleNavigate('CraftScreen')}>
                    <Icons type={'craft'} active={activeButton === 'CraftScreen'}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: height * 0.11,
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 9,
        flexDirection: 'row',
        backgroundColor: '#FFBE76',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignSelf: "center",
    },
    
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 55,
        height: 55,
        padding: 12
    },
    activeButton: {
        backgroundColor: '#0A3D62',
        borderRadius: 30,
    }
});

export default MenuPanel;
