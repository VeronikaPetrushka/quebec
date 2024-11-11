import React from "react";
import { View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get("window");

const Article = ({title, content, image}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                <Icons type={"back"} />
            </TouchableOpacity>
            <Image source={image} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <ScrollView style={{ width: "100%" }}>
                    <Text style={styles.story}>{content}</Text>
                    <View style={{ height: 120 }} />
                </ScrollView>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingBottom: height * 0.2,
        backgroundColor: "#FDF3E7",
    },

    image: {
        width: "100%",
        height: height * 0.33,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        marginBottom: height * 0.02,
    },

    title: {
        fontWeight: "800",
        fontSize: 26,
        textAlign: "center",
        marginBottom: height * 0.03,
        color: "#0A3D62",
    },

    textContainer: {
        width: "100%",
        paddingHorizontal: 20,
        paddingBottom: height * 0.4,
    },

    story: {
        fontWeight: "400",
        fontSize: 18,
        textAlign: "justify",
        color: "#3C3C3C",
    },

    icon: {
        width: 60,
        height: 60,
        padding: 10,
        position: "absolute",
        top: height * 0.04,
        left: 10,
        zIndex: 10,
    },
});

export default Article;
