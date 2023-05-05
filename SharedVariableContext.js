import React from "react";

const SharedVariableContext = React.createContext({
	exercises: [],
	setExercise: () => {},
});
export default SharedVariableContext;
