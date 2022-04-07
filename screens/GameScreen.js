import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const randomNumber = Math.floor(Math.random() * (max - min)) + min;
	if (randomNumber === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return randomNumber;
	}
};

const GameScreen = (props) => {
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomBetween(1, 100, props.userChoice)
	);
	const [rounds, setRounds] = useState(0);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(rounds);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = (direction) => {
		if (
			(direction === "lower" && currentGuess < props.userChoice) ||
			(direction === "greater" && currentGuess > props.userChoice)
		) {
			Alert.alert("Dont lie!", "you know that is wrong", [
				{ text: "sorry", style: "cancel" },
			]);
			return;
		}
		if (direction === "lower") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess;
		}
		const nextNum = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNum);
		setRounds((curRounds) => curRounds + 1);
	};
	return (
		<View style={styles.screen}>
			<Text style={styles.text}>Opponent`s Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<Button title="Lower" onPress={nextGuessHandler.bind(this, "lower")} />
				<Button
					title="Greater"
					onPress={nextGuessHandler.bind(this, "greater")}
				/>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},

	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		width: 400,
		maxWidth: "90%",
		justifyContent: "space-between",
		marginTop: 20,
	},

	text: {
		fontFamily: "poppins-regular",
	},
});

export default GameScreen;
