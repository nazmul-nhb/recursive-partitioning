//@ts-check
import React from "react";

/**
 * Partition Component
 * @param {Object} props Partition Component Props
 * @param {import('./reducers/partitionReducer').PartitionState} props.node Child Node
 * @param {React.Dispatch<import('./reducers/partitionReducer').Action>} props.dispatch Dispatch Function
 * @returns {JSX.Element}
 */
const Partition = ({ node, dispatch }) => {
	/**
	 *
	 * @param {"v" | "h"} orientation
	 */
	const handleSplit = (orientation) => {
		dispatch({ type: "SPLIT", payload: { id: node.id, orientation } });
	};

	const handleRemove = () => {
		dispatch({ type: "REMOVE", payload: { id: node.id } });
	};

	if (node.children.length === 0) {
		return (
			<React.Fragment>
				<div
					className="relative flex-1 border border-white"
					style={{ backgroundColor: node.color }}
				>
					<div className="flex space-x-2">
						<button
							onClick={() => handleSplit("v")}
							className="bg-blue-500 text-white px-2 py-1 rounded"
						>
							V
						</button>
						<button
							onClick={() => handleSplit("h")}
							className="bg-green-500 text-white px-2 py-1 rounded"
						>
							H
						</button>
						<button
							onClick={handleRemove}
							className="bg-red-500 text-white px-2 py-1 rounded"
						>
							-
						</button>
					</div>
				</div>
			</React.Fragment>
		);
	}

	return (
		<div
			className={`flex flex-1 ${
				node.orientation === "v" ? "flex-row" : "flex-col"
			}`}
		>
			{node.children.map((child) => (
				<Partition key={child.id} node={child} dispatch={dispatch} />
			))}
		</div>
	);
};

export default Partition;
