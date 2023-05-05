import React from "react";
import { Image, ImageBackground, StyleSheet, View, Text } from "react-native";

function WelcomeScreen(props) {
	return (
		<ImageBackground style={styles.background}>
			<View style={styles.logoContainer}>
				<Image style={styles.logo} source={require("../assets/CNTower.png")} />
				<Text style={styles.text}> Set Track</Text>
			</View>
			<View style={styles.loginButton}></View>
			<View style={styles.RegisterButton}></View>
		</ImageBackground>
	);
}
const styles = StyleSheet.create({
	background: {
		backgroundColor: "white",
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	loginButton: {
		width: "100%",
		height: 70,
		backgroundColor: "black",
	},
	logo: {},
	logoContainer: {
		position: "absolute",
		top: 250,
		alignItems: "center",
	},

	RegisterButton: {
		width: "100%",
		height: 70,
		backgroundColor: "grey",
	},
	text: {
		fontSize: 30,
		fontWeight: "bold",
	},
});

export default WelcomeScreen;
