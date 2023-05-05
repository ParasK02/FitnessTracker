import { useState, useContext } from "react";
import {
	View,
	Modal,
	StyleSheet,
	Dimensions,
	Pressable,
	Text,
	FlatList,
	Button,
	TextInput,
	ImageBackground,
} from "react-native";
import SharedVariableContext from "../../SharedVariableContext";

const AddSR = ({ isVisible, onClose, name }) => {
	const getCurrentDate = () => {
		const date = new Date();
		return date.toISOString().split("T")[0];
	};
	const [list, setList] = useState([
		{ id: 1, weight: 0, reps: 0, date: getCurrentDate() },
		{ id: 2, weight: 0, reps: 0, date: getCurrentDate() },
		{ id: 3, weight: 0, reps: 0, date: getCurrentDate() },
	]);

	const { addSetToExercise, exercises, addVolume } = useContext(
		SharedVariableContext
	);

	const volumeArray = (inputArray) => {
		return inputArray.map(({ id, weight, reps }) => {
			return {
				id,
				volume: weight * reps,
				date: getCurrentDate(),
			};
		});
	};

	const handleSave = async () => {
		try {
			console.log(volumeArray(list));
			console.log(list);
			onClose();
			addSetToExercise(exercises, name.id, list);
			addVolume(exercises, name.id, volumeArray(list));

			console.log("Sets saved correctly!");
		} catch (error) {
			console.log(error);
		}
	};
	const handleClose = () => {
		onClose();
	};

	const Header = () => (
		<View
			style={[
				styles.row,
				{ backgroundColor: "lightgray" },
				{ width: Math.round(Dimensions.get("window").width) },
			]}
		>
			<Text style={[styles.cell, { fontWeight: "bold" }, { width: 105 }]}>
				Set#
			</Text>
			<Text style={[styles.cell, { fontWeight: "bold" }, { width: 160 }]}>
				Weight
			</Text>
			<Text style={[styles.cell, { fontWeight: "bold" }, { width: 160 }]}>
				Repetitions
			</Text>
		</View>
	);

	const item = ({ item }) => (
		<View style={{ flexDirection: "row" }}>
			<View
				style={{
					width: Math.round(Dimensions.get("window").width) * 0.25,
					backgroundColor: "white",
					justifyContent: "center",
					borderWidth: 0.25,
				}}
			>
				<Text
					style={{
						fontSize: 16,
						fontWeight: "bold",
						textAlign: "center",
					}}
				>
					{item.id}
				</Text>
			</View>
			<View
				style={{
					width: Math.round(Dimensions.get("window").width) * 0.375,
					height: 50,
					backgroundColor: "white",
					justifyContent: "center",
					borderWidth: 0.25,
				}}
			>
				<TextInput
					style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}
					keyboardType="decimal-pad"
					onChangeText={(text) =>
						setList(
							list.map((l) =>
								l.id === item.id
									? { ...l, weight: text === "" ? "" : parseFloat(text) }
									: l
							)
						)
					}
					value={item.weight.toString()}
				/>
			</View>
			<View
				style={{
					width: Math.round(Dimensions.get("window").width) * 0.375,
					height: 50,
					backgroundColor: "white",
					justifyContent: "center",
					borderWidth: 0.25,
				}}
			>
				<TextInput
					style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}
					keyboardType="decimal-pad"
					onChangeText={(text) =>
						setList(
							list.map((l) =>
								l.id === item.id
									? { ...l, reps: text === "" ? "" : parseInt(text) }
									: l
							)
						)
					}
					value={item.reps.toString()}
				/>
			</View>
		</View>
	);

	const renderFooter = () => (
		<View style={styles.addSetContainer}>
			<Pressable style={styles.addSet} onPress={addSet}>
				<Text style={styles.buttonText}>+ Add Set</Text>
			</Pressable>
			<Pressable style={styles.removeSet} onPress={removeSet}>
				<Text style={styles.buttonText}>- Remove Set</Text>
			</Pressable>
		</View>
	);

	const addSet = () => {
		const newId = list.length > 0 ? list[list.length - 1].id + 1 : 1;
		setList([
			...list,
			{ id: newId, weight: 0, reps: 0, date: getCurrentDate() },
		]);
	};
	const removeSet = () => {
		setList(list.slice(0, -1));
	};

	return (
		<Modal
			visible={isVisible}
			animationType="slide "
			transparent={true}
			onRequestClose={onClose}
		>
			<View style={styles.buttoncontainer}>
				<ImageBackground
					source={"../assets/blackBackground.jpeg"}
					style={styles.backgroundIMG}
				>
					<View style={styles.modalview}>
						<View style={styles.donebuttoncontainer}>
							<Pressable style={[styles.buttonclose]} onPress={handleClose}>
								<Text style={styles.textstyle}>Cancel</Text>
							</Pressable>

							<Pressable style={[styles.buttondone]} onPress={handleSave}>
								<Text style={styles.textstyle}>Done</Text>
							</Pressable>
						</View>
						<View
							style={{
								flex: 0.75,
								justifyContent: "center",
								alignItems: "center",
								marginTop: "10%",
							}}
						>
							<Text style={styles.exerciseName}>{name.name}</Text>
							<Header />
							<FlatList
								data={list}
								renderItem={item}
								keyExtractor={(item) => item.id.toString()}
								ListFooterComponent={renderFooter}
							/>
						</View>
					</View>
				</ImageBackground>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	addButtonContainer: {
		flexDirection: "column",
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
	buttonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 20,
	},

	cell: {
		padding: 10,
	},
	donebuttoncontainer: {
		justifyContent: "space-between",
		flexDirection: "row",
	},
	buttoncontainer: {
		top: 150,
		justifyContent: "center",
	},
	exerciseName: {
		fontWeight: "bold",
		bottom: 25,
		fontSize: 30,
	},
	modalview: {
		height: Math.round(Dimensions.get("window").height),
		width: Math.round(Dimensions.get("window").width),
		backgroundColor: "white",
		borderRadius: 20,
	},
	backgroundIMG: {
		flex: 1,
		height: Math.round(Dimensions.get("window").height),
		width: Math.round(Dimensions.get("window").width),
	},
	textstyle: {
		color: "dodgerblue",
		fontWeight: "bold",
		fontSize: 16,
	},
	addSetContainer: {
		top: 10,
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignContent: "space-around",
	},
	addSet: {
		borderRadius:
			Math.round(
				Dimensions.get("window").width + Dimensions.get("window").height
			) / 2,
		backgroundColor: "green",
		width: 200,
		height: 65,
		justifyContent: "center",
		alignItems: "center",
	},
	removeSet: {
		borderRadius:
			Math.round(
				Dimensions.get("window").width + Dimensions.get("window").height
			) / 2,
		backgroundColor: "red",
		width: 200,
		height: 65,
		justifyContent: "center",
		alignItems: "center",
	},
	repText: {
		color: "blue",
		fontWeight: "bold",
		fontSize: 20,
		top: 25,
		right: 20,
	},
	row: {
		flexDirection: "row",
	},
	weightContainer: {
		top: 50,
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
	},
});

export default AddSR;
