// @ts-check
import React, { useReducer } from "react";
import Partition from "./Partition.jsx";
import { partitionReducer } from "./reducers/partitionReducer";
import { generateRandomColor } from "./utilities/colorGenerator";

/** @typedef {import('./reducers/partitionReducer').PartitionState} PartitionState */

/** @type {PartitionState} */
const initialPartitionState = {
	id: 1,
	color: generateRandomColor(),
	orientation: null,
	children: [],
	totalPartitions: 1,
};

export default function App() {
	const [partitionState, partitionDispatch] = useReducer(
		partitionReducer,
		initialPartitionState
	);

	return (
		<section className="w-screen h-screen flex">
			<Partition
				node={partitionState}
				dispatch={partitionDispatch}
				totalPartitions={partitionState.totalPartitions}
			/>
		</section>
	);
}
