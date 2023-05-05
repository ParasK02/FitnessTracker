import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import AddSR from "../components/AddSR";

const ExerciseSetScreen = () => {
	const route = useRoute();
	const data = route.params.data;

	// const [modalVisible, setModalVisible] = useState(data.map(() => false));
	const [modalVisible, setModalVisible] = useState(
		data.reduce((acc, item) => {
			acc[item.key] = false;
			return acc;
		}, {})
	);

	const [selectedExerciseName, setSelectedExerciseName] = useState("");
	const [isPressed, setIsPressed] = useState(false);
	const [timer, setTimer] = useState(0);

	useEffect(() => {
		let interval;

		if (isPressed) {
			interval = setInterval(() => {
				setTimer((prevTimer) => prevTimer + 10);
			}, 10);
		} else {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [isPressed]);

	const toggleButtonState = () => {
		setIsPressed(!isPressed);
	};

	const buttonStyle = isPressed ? styles.pressedButton : styles.defaultButton;
	const buttonText = isPressed ? "Pause Workout!" : "Start Workout";

	const formatDate = (date) => {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${month < 10 ? "0" : ""}${month}/${
			day < 10 ? "0" : ""
		}${day}/${year}`;
	};
	const today = formatDate(new Date());
	const day = new Date().getDay();

	const finishWorkout = () => {
		setIsPressed(false);
		setTimer(0);
	};

	return (
		<View style={styles.background}>
			<View style={styles.timerDateContainer}>
				<Text style={styles.timerText}> {today}</Text>

				<Text style={styles.timerText}>
					{`${Math.floor(timer / 60000)}:${
						Math.floor((timer % 60000) / 1000) < 10 ? "0" : ""
					}${Math.floor((timer % 60000) / 1000)}.${
						(timer % 1000) / 10 < 10 ? "0" : ""
					}${Math.floor((timer % 1000) / 10)}`}
				</Text>
			</View>
			<Pressable style={buttonStyle} onPress={toggleButtonState}>
				<Text style={styles.buttonText}>{buttonText}</Text>
			</Pressable>

			<Pressable style={styles.finishButton} onPress={finishWorkout}>
				<Text style={styles.buttonText}>Finish Workout</Text>
			</Pressable>
			<Text style={styles.headerText}>My Exercises:</Text>
			<ScrollView style={styles.buttonContainer}>
				{data.map((item) => (
					<React.Fragment key={item.key}>
						<Pressable
							style={[styles.button]}
							onPress={() => {
								setSelectedExerciseName(item);
								setModalVisible((prevModalVisible) => ({
									...prevModalVisible,
									[item.key]: true,
								}));
							}}
						>
							<Text style={styles.exerciseText}>{item.name}</Text>
						</Pressable>
						<AddSR
							key={`modal-${item.key}`}
							isVisible={modalVisible[item.key]}
							onClose={() => {
								setModalVisible((prevModalVisible) => ({
									...prevModalVisible,
									[item.key]: false,
								}));
							}}
							name={selectedExerciseName}
						/>
					</React.Fragment>
				))}
			</ScrollView>
		</View>
	);
};
const styles = StyleSheet.create({
	background: {
		backgroundColor: "black",
		flex: 1,
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		height: 75,
		borderRadius: 20,
		marginTop: 10,
	},
	buttonContainer: {
		top: 25,
		rowGap: 100,
	},
	defaultButton: {
		backgroundColor: "green",
		padding: 10,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		height: 60,
		top: 15,
		marginTop: 10,
	},
	pressedButton: {
		backgroundColor: "#FFBF00",
		padding: 10,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		height: 60,
		top: 15,
		marginTop: 10,
	},
	finishButton: {
		backgroundColor: "red",
		padding: 10,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		height: 60,
		top: 15,
		marginTop: 10,
	},
	buttonText: {
		color: "white",
		fontSize: 20,
	},
	timerText: {
		color: "white",
		fontSize: 24,
		textAlign: "center",
		marginTop: 10,
	},
	headerText: {
		color: "white",
		fontSize: 30,
		fontWeight: "bold",
		top: 25,
	},
	timerDateContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 10,
	},
	exerciseText: {
		fontSize: 20,
	},
});

export default ExerciseSetScreen;
