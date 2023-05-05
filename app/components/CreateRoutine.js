import React, { useContext, useState } from "react";
import {
	StyleSheet,
	FlatList,
	Text,
	TouchableOpacity,
	View,
	AsyncStorage,
	Modal,
	Pressable,
	Dimensions,
	ScrollView,
	TextInput,
} from "react-native";

import SharedVariableContext from "../../SharedVariableContext";

const CreateRoutine = ({ isVisible, onClose, onDone }) => {
	const contextValue = useContext(SharedVariableContext);
	const exercises = contextValue.exercises;
	const setExercises = contextValue.setExercise;

	const [title, setTitle] = useState("");

	const [selectedExercises, setSelectedExercises] = React.useState([]);

	const handleExerciseSelect = (exercise) => {
		const index = selectedExercises.findIndex((e) => e.id === exercise.id);

		if (index >= 0) {
			setSelectedExercises((prevState) =>
				prevState.filter((e) => e.id !== exercise.id)
			);
		} else {
			setSelectedExercises((prevState) => [...prevState, exercise]);
		}
	};

	const handleSave = () => {
		try {
			onDone(selectedExercises, title);
			setSelectedExercises([]);
			setTitle("");
			console.log("Selected exercises saved successfully!");
		} catch (error) {
			console.log(error);
		}
	};
	const handleClose = () => {
		setSelectedExercises([]);
		onClose();
	};

	return (
		<Modal
			visible={isVisible}
			animationType="slide "
			transparent={true}
			onRequestClose={onClose}
		>
			<View>
				<View style={styles.buttoncontainer}>
					<View style={styles.modalview}>
						<View style={styles.donebuttoncontainer}>
							<Pressable style={[styles.buttonclose]} onPress={handleClose}>
								<Text style={styles.textstyle}>Cancel</Text>
							</Pressable>

							<Pressable style={[styles.buttondone]} onPress={handleSave}>
								<Text style={styles.textstyle}>Done</Text>
							</Pressable>
						</View>
						<TextInput
							style={styles.input}
							onChangeText={setTitle}
							value={title}
							placeholder="Set Routine Name"
						/>
						<ScrollView style={styles.scrollContainer}>
							{exercises.map((exercise) => (
								<TouchableOpacity
									key={exercise.id}
									style={[
										styles.exerciseItem,
										selectedExercises.some((e) => e.id === exercise.id) &&
											styles.selectedExerciseButton,
									]}
									onPress={() => handleExerciseSelect(exercise)}
								>
									<Text style={styles.exerciseButtonText}>{exercise.name}</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>
				</View>
			</View>
		</Modal>
	);
};
const styles = StyleSheet.create({
	input: {
		height: 65,
		margin: 20,
		borderRadius: 15,
		padding: 15,
		backgroundColor: "grey",
		fontSize: 30,
	},
	exerciseItem: {
		top: 10,
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
	selectedExerciseButton: {
		backgroundColor: "grey",
	},
	buttonclose: {
		padding: 15,
		borderRadius: 20,
	},
	buttondone: {
		padding: 15,
		borderRadius: 20,
		alignItems: "flex-end",
	},
	donebuttoncontainer: {
		justifyContent: "space-between",
		flexDirection: "row",
	},
	buttoncontainer: {
		top: 150,
		justifyContent: "center",
	},
	modalview: {
		height: Math.round(Dimensions.get("window").height + 100),
		width: Math.round(Dimensions.get("window").width),
		backgroundColor: "black",
		borderRadius: 20,
	},
	textstyle: {
		color: "dodgerblue",
		fontWeight: "bold",
		fontSize: 16,
	},
	scrollContainer: {
		flex: 1,
		marginHorizontal: 20,
		paddingBottom: 20,
	},
});

export default CreateRoutine;
