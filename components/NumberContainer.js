import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Color from "../constants/colors";
const NumberContainer = (props) => {
	return (
		<View style={Styles.container}>
			<Text style={Styles.number}>{props.children}</Text>
		</View>
	);
};

const Styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderColor: Color.secondary,
		padding: 10,
		borderRadius: 10,
		marginVertical: 10,
		alignItems: "center",
		justifyContent: "center",
	},

	number: {
		color: Color.secondary,
		fontSize: 20,
	},
});

export default NumberContainer;
