import React, { useState, useContext } from "react";

import {
	View,
	StyleSheet,
	SafeAreaView,
	Dimensions,
	Text,
	Modal,
	Pressable,
	Button,
	ScrollView,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import SharedVariableContext from "../../SharedVariableContext";

const ProgressData = ({ navigation }) => {
	{
		const contextValue = useContext(SharedVariableContext);
		const exercises = contextValue.exercises;
		const setExercises = contextValue.setExercise;

		const handleVolumeSelect = (exercise) => {
			navigation.navigate("Progress Graph", {
				volume: exercise.volume,
			});
		};

		return (
			<View style={styles.background}>
				<ImageBackground
					source={require("../assets/blackBackground.jpeg")}
					style={{ width: "100%", height: "100%" }}
				>
					<Text style={styles.titletext}>Progress Over Time:</Text>

					<ScrollView style={styles.scrollContainer}>
						{exercises.map((exercise) => (
							<TouchableOpacity
								key={exercise.id}
								style={[styles.exerciseItem]}
								onPress={() => handleVolumeSelect(exercise)}
							>
								<Text style={styles.exerciseButtonText}>{exercise.name}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</ImageBackground>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	background: {
		backgroundColor: "black",
		flex: 1,
	},
	exerciseItem: {
		backgroundColor: "black",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "white",
		padding: 15,
		marginBottom: 5,
		flexDirection: "row",
		alignItems: "center",
	},
	exerciseButtonText: {
		color: "white",
		fontSize: 18,
	},
	scrollContainer: {
		flex: 1,
		marginHorizontal: 20,
		paddingTop: 15,
		paddingBottom: 20,
	},
	titletext: {
		color: "white",
		fontSize: 40,
		fontWeight: "bold",
		marginTop: 85,
		marginLeft: 20,
	},
});

export default ProgressData;
