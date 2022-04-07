import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
	return Font.loadAsync({
		"poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
		"poppins-semi-bold": require("./assets/fonts/Poppins-SemiBold.ttf"),
		"poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
	});
};

export default function App() {
	const [userNum, setUserNum] = useState();
	const [guessRounds, setGuessRounds] = useState(0);
	const [dataLoaded, setDataLoaded] = useState(false);

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => {
					setDataLoaded(true);
				}}
				onError={(err) => console.log(err)}
			/>
		);
	}

	const newGameHandler = () => {
		setGuessRounds(0);
		setUserNum(null);
	};

	const startGameHandler = (selectedNumber) => {
		setUserNum(selectedNumber);
		setGuessRounds(0);
	};

	const gameOverHandler = (numOfRounds) => {
		setGuessRounds(numOfRounds);
	};

	let content = <StartGameScreen onStartGame={startGameHandler} />;

	if (userNum && guessRounds <= 0) {
		content = <GameScreen userChoice={userNum} onGameOver={gameOverHandler} />;
	} else if (guessRounds > 0) {
		content = (
			<GameOverScreen
				roundsNumber={guessRounds}
				userNumber={userNum}
				onRestart={newGameHandler}
			/>
		);
	}

	return (
		<View style={styles.screen}>
			<Header title="Guess a Number" />
			{content}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
