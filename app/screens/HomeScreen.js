import React, { useState, useContext, useEffect } from "react";

import Calendar from "../components/Calender";
import CreateRoutine from "../components/CreateRoutine";
import SharedVariableContext from "../../SharedVariableContext";
import appleHealthKit, {
	HealthValue,
	HealthKitPermissions,
} from "react-native-health";

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
} from "react-native";

const HomeScreen = ({ navigation }) => {
	const PERMISSIONS = {
		permissions: {
			read: [
				appleHealthKit.Constants.Permissions.StepCount,
				appleHealthKit.Constants.Permissions.ActiveEnergyBurned,
				appleHealthKit.Constants.Permissions.HeartRate,
			],
		},
	};
	const [steps, setSteps] = useState(0);
	const [calories, setCalories] = useState(0);
	const [heartRate, setHeartRate] = useState(0);
	useEffect(() => {
		appleHealthKit.initHealthKit(PERMISSIONS, (err, results) => {
			if (err) {
				console.error("Error initializing HealthKit: ", err);
				return;
			}
			// HealthKit initialized successfully
			getStepCount();
			getCaloriesData();
			getHeartRateData();
		});
	}, []);

	function onDonePressed(item, setName) {
		if (item.length > 0) {
			let newKey = buttonLists.length + 1;
			let newButtonList = [
				...buttonLists,
				{ key: newKey, name: setName, data: item },
			];
			setButtonLists(newButtonList);
		}
		console.log(setName.length);
	}

	const [modalVisible, setModalVisible] = useState(false);
	const [buttonLists, setButtonLists] = useState([
		{
			key: 1,
			name: "Chest + Triceps",
			data: [
				{ id: 3, name: "Bench Press", set: [], volume: [] },
				{ id: 19, name: "Incline Bench Press", set: [], volume: [] },
				{ id: 21, name: "Cable Fly", set: [], volume: [] },
				{ id: 10, name: "Tricep Extenstion", set: [], volume: [] },
				{ id: 11, name: "Dips", set: [], volume: [] },
				{ id: 31, name: "Overhead Tricep Extention", set: [], volume: [] },
			],
		},
		{ key: 2, name: "Back + Biceps", data: [] },
		{ key: 3, name: "Legs", data: [] },
	]);
	const { value } = useContext(SharedVariableContext);
	const time = new Date().getHours();

	function timeOfDay() {
		if (time < 12) {
			return (
				<View style={styles.time}>
					<Text style={styles.timeText}>Good Morning!</Text>
				</View>
			);
		} else if (time >= 12 && time <= 17) {
			return (
				<View style={styles.time}>
					<Text style={styles.timeText}>Good Afternoon!</Text>
				</View>
			);
		} else if (time >= 17 && time <= 20) {
			return (
				<View style={styles.time}>
					<Text style={styles.timeText}>Good Evening!</Text>
				</View>
			);
		} else {
			return (
				<View style={styles.time}>
					<Text style={styles.timeText}>Good Night!</Text>
				</View>
			);
		}
	}

	return (
		<View style={styles.background}>
			{/* <ImageBackground
				source={require("../assets/blackBackground.jpeg")}
				style={{ width: "100%", height: "100%" }}
			> */}
			{timeOfDay()}
			<Calendar />
			<View style={styles.routinecontainer}>
				<Text style={styles.routinetitle}>My Workouts:</Text>
			</View>

			<View style={styles.buttoncontainer}>
				{buttonLists.map((item) => (
					<Pressable
						key={item.key}
						style={[styles.button]}
						onPress={() => {
							navigation.navigate("SetList", {
								data: item.data,
							});
						}}
					>
						<Text style={styles.buttontext}>
							{item.name ? item.name : item.key}
						</Text>
					</Pressable>
				))}

				<Pressable
					style={[styles.button]}
					onPress={() => setModalVisible(true)}
				>
					<Text style={styles.buttontext}>+ Add New Routine</Text>
				</Pressable>
				<CreateRoutine
					isVisible={modalVisible}
					onClose={() => {
						setModalVisible(false);
					}}
					onDone={(item, setName) => {
						setModalVisible(false);
						onDonePressed(item, setName);
					}}
				/>
			</View>
			{/* </ImageBackground> */}
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
		padding: 10,
		height: 150,
		width: 200,
		borderRadius: 50,
		marginTop: 10,
		marginRight: 10, // Add this line
	},

	buttoncontainer: {
		top: 125,
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
		left: 10,
	},
	buttontext: {
		fontWeight: "bold",
		fontSize: "25",
	},

	routinecontainer: {
		flexDirection: "row",

		top: 125,
		left: 10,
	},
	routinetitle: {
		color: "white",
		fontSize: 40,
		fontWeight: "bold",
	},
	time: {
		justifyContent: "flex-start",
		top: 60,
		paddingLeft: 12,
	},
	timeText: {
		fontSize: 30,
		color: "white",
	},
});

export default HomeScreen;
