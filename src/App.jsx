// @ts-check
import React, { useReducer } from "react";
import Partition from "./Partition.jsx";
import {
	initialPartitionState,
	partitionReducer,
} from "./reducers/partitionReducer";

export default function App() {
	const [partitionState, partitionDispatch] = useReducer(
		partitionReducer,
		initialPartitionState
	);

	return (
		<div className="w-screen h-screen flex">
			<Partition node={partitionState} dispatch={partitionDispatch} />
		</div>
	);
}
