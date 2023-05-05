import { View, StyleSheet } from "react-native";
import DateItem from "./DateItem";

function Calendar(props) {
	return (
		<View style={styles.circles}>
			<DateItem day="S" />
			<DateItem day="M" completed="true" />
			<DateItem day="T" />
			<DateItem day="W" />
			<DateItem day="T" />
			<DateItem day="F" />
			<DateItem day="S" />
		</View>
	);
}

const styles = StyleSheet.create({
	circles: {
		flexDirection: "row", //main axis= horizontal
		justifyContent: "space-around", //main axis
		borderColor: "white",
		borderRadius: 10,
	},
});

export default Calendar;
