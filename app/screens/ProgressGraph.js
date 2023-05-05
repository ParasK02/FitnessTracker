import React from "react";
import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

const ProgressGraph = () => {
	const route = useRoute();
	const volume = route.params.volume;

	const groupByDate = (array) => {
		const groupedData = array.reduce((acc, curr) => {
			if (!acc[curr.date]) {
				acc[curr.date] = [];
			}
			acc[curr.date].push(curr);
			return acc;
		}, {});

		return groupedData;
	};

	const sortedData = volume.sort((a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);

		if (dateA < dateB) return -1;
		if (dateA > dateB) return 1;
		return 0;
	});
	const groupedData = groupByDate(sortedData);

	return (
		<View>
			{Object.entries(groupedData).map(([date, items]) => (
				<View key={date}>
					<Text>Date: {date}</Text>
					{items.map(({ id, volume }) => (
						<Text key={id}>Volume: {volume}</Text>
					))}
				</View>
			))}
		</View>
	);
};
export default ProgressGraph;
