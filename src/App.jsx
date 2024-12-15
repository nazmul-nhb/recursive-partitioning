// @ts-check
import React, { useReducer } from "react";
import Partition from "./Partition.jsx";
import {
	initialPartitionState,
	partitionReducer,
} from "./reducers/partitionReducer";

export default function App() {
	const [state, dispatch] = useReducer(
		partitionReducer,
		initialPartitionState
	);

	return (
		<div
			className="w-screen h-screen"
			style={{
				backgroundColor: state.color,
			}}
		>
			<Partition node={state} dispatch={dispatch} />
		</div>
	);
}
