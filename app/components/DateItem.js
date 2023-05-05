import {
	View,
	StyleSheet,
	SafeAreaView,
	Dimensions,
	Text,
	Modal,
} from "react-native";

function DateItem(props) {
	return (
		<View style={styles.day}>
			<View
				style={{
					...styles.circle,
					backgroundColor: props.completed === "true" ? "red" : "grey",
				}}
			></View>
			<Text style={styles.days}>{props.day}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	day: {
		top: 75,
		width: Dimensions.get("window").width * 0.08,
		height: Dimensions.get("window").width * 0.08,
	},
	circle: {
		backgroundColor: "grey",
		borderRadius:
			Math.round(
				Dimensions.get("window").width + Dimensions.get("window").height
			) / 2,
		width: "100%",
		height: "100%",
	},
	circles: {
		flexDirection: "row", //main axis= horizontal
		justifyContent: "space-around", //main axis
	},
	days: {
		color: "white",
		fontWeight: "bold",
		fontSize: 20,
		textAlign: "center",
	},
});

export default DateItem;
