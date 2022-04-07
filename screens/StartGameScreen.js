import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = (props) => {
	const [enteredValue, setEnteredValue] = useState();
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();

	const numberInputHandler = (inputText) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""));
	};

	const resetInputHandler = () => {
		setEnteredValue("");
		setConfirmed(false);
	};

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				"Invalid number!",
				"Number has to be a number betwen 1 and 99.",
				[{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
			);
			return;
		}
		setConfirmed(true);
		setEnteredValue("");
		setSelectedNumber(parseInt(enteredValue));
		Keyboard.dismiss();
	};

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<View style={styles.summaryContainer}>
				<Text style={styles.text}>You select: </Text>

				<NumberContainer>{selectedNumber}</NumberContainer>
				<Button
					title="START GAME"
					onPress={() => props.onStartGame(selectedNumber)}
				/>
			</View>
		);
	}

	return (
		<TouchableWithoutFeedback
		// onPress={() => {
		// 	Keyboard.dismiss();
		// }}
		>
			<View style={styles.screen}>
				<Text style={styles.title}>Start a New Game!</Text>
				<Card style={styles.inputContainer}>
					<Text style={styles.text}>Select a Number</Text>

					<Input
						style={styles.textInput}
						blurOnSubmit
						autoCapitalize="none"
						autoCorrect={false}
						keyboardType="number-pad"
						maxLength={2}
						onChangeText={numberInputHandler}
						value={enteredValue}
					/>

					<View style={styles.buttonContainer}>
						<Button
							title="Reset"
							color={Colors.secondary}
							onPress={resetInputHandler}
						/>
						<Button
							title="Confirm"
							color={Colors.primary}
							onPress={confirmInputHandler}
						/>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},

	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: "poppins-medium",
		alignContent: "center",
	},

	inputContainer: {
		width: 300,
		maxWidth: "80%",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "black",
	},

	textInput: {
		width: 50,
	},

	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingHorizontal: 15,
		marginVertical: 30,
	},

	summaryContainer: {
		marginTop: 20,
		alignItems: "center",
	},

	text: {
		fontFamily: "poppins-regular",
		alignSelf: "center",
		marginBottom: 30,
	},
});

export default StartGameScreen;
