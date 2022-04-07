import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = (props) => {
	return <TextInput defaultValue="" {...props} style={styles.input} />;
};

const styles = StyleSheet.create({
	input: {
		height: 30,
		width: 200,
		padding: 15,
		marginVertical: 10,
		borderBottomColor: "black",
		borderBottomWidth: 1,
		fontFamily: "poppins-regular",
		textAlign: "center",
	},
});

export default Input;
