import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

const GameOverScreen = (props) => {
	return (
		<View style={styles.screen}>
			<Text style={styles.title}>The Game Is Over!</Text>
			<Image
				resizeMode="contain"
				style={styles.image}
				source={require("../assets/homer.png")}
			/>
			<Text style={styles.text}>Number of rounds: {props.roundsNumber}</Text>
			<Text style={styles.text}>Number was: {props.userNumber}</Text>
			<Button title="Play again?" onPress={props.onRestart} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	title: {
		fontSize: 20,
		marginBottom: 12,
		fontFamily: "poppins-semi-bold",
	},

	text: {
		fontSize: 16,
		marginBottom: 12,
		fontFamily: "poppins-regular",
	},

	image: {
		width: "80%",
		height: 200,
	},
});

export default GameOverScreen;
