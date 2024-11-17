import React, 
{ useState, useEffect, useRef } 
from 'react';
import { Animated, View, ImageBackground, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MusicProvider } from './src/constants/music';
import MusicPlayer from './src/components/MusicPlayer';

import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import QuizModeScreen from './src/screens/QuizModeScreen';
import TopicsScreen from './src/screens/TopicsScreen';
import PathfinderQuizScreen from './src/screens/PathfinderQuizScreen';
import ChampionQuizScreen from './src/screens/ChampionQuizScreen';
import MapScreen from './src/screens/MapScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import CatalogueScreen from './src/screens/CatalogueScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import BookScreen from './src/screens/BookScreen';
import ArticleScreen from './src/screens/ArticleScreen';
import CraftScreen from './src/screens/CraftScreen';
import CraftDetailsScreen from './src/screens/CraftDetailsScreen';
import ResultsScreen from './src/screens/ResultsScreen';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
    const [loaderIsEnded, setLoaderIsEnded] = useState(false);
    const [prog, setProg] = useState(0);
  
    const firstImageAnim = useRef(new Animated.Value(0)).current;
    const loaderImageAnim = useRef(new Animated.Value(0)).current;

    const firstLoaderImage = require('./src/assets/newDiz/loader1.jpg');
    const loaderImage = require('./src/assets/newDiz/loader2.jpg');

    useEffect(() => {
        Animated.timing(firstImageAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start(() => {
                Animated.timing(loaderImageAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }).start(() => {
                        setLoaderIsEnded(true);
                });
        });
    }, []);
  
    return (
        <MusicProvider>
            <MusicPlayer />
                <NavigationContainer>
                {
                    !loaderIsEnded ? (
                        <View style={{ flex: 1 }}>
                            <ImageBackground style={{ flex: 1 }} source={loaderImage}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                                    <Animated.View style={[styles.imageContainer, { opacity: firstImageAnim }]}>
                                        <ImageBackground source={firstLoaderImage} style={styles.image} />
                                    </Animated.View>

                                    <Animated.View style={[styles.imageContainer, { opacity: loaderImageAnim }]}>
                                        <ImageBackground source={loaderImage} style={styles.image} />
                                    </Animated.View>
                                    
                                </View>
                            </ImageBackground>
                        </View>
                    ) : (
                        <Stack.Navigator initialRouteName="HomeScreen">
                            <Stack.Screen 
                                name="HomeScreen" 
                                component={HomeScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="SettingsScreen" 
                                component={SettingsScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="QuizModeScreen" 
                                component={QuizModeScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="TopicsScreen" 
                                component={TopicsScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="PathfinderQuizScreen" 
                                component={PathfinderQuizScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="ChampionQuizScreen" 
                                component={ChampionQuizScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="MapScreen" 
                                component={MapScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="DetailsScreen" 
                                component={DetailsScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="CatalogueScreen" 
                                component={CatalogueScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="HistoryScreen" 
                                component={HistoryScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="BookScreen" 
                                component={BookScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="ArticleScreen" 
                                component={ArticleScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="CraftScreen" 
                                component={CraftScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="CraftDetailsScreen" 
                                component={CraftDetailsScreen} 
                                options={{ headerShown: false }} 
                            />
                            <Stack.Screen 
                                name="ResultsScreen" 
                                component={ResultsScreen} 
                                options={{ headerShown: false }} 
                            />
                        </Stack.Navigator>
                        )
                    }
                </NavigationContainer>
        </MusicProvider>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default App;
