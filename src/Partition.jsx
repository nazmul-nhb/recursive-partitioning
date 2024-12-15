// @ts-check
import React from "react";

/** @typedef {import('./reducers/partitionReducer').PartitionState} PartitionState */
/** @typedef {import('./reducers/partitionReducer').Action} Action */

/**
 * Partition Component
 * @param {Object} props
 * @param {PartitionState} props.node
 * @param {React.Dispatch<Action>} props.dispatch
 * @param {number} props.totalPartitions
 */
const Partition = ({ node, dispatch, totalPartitions }) => {
	/**
	 * Function to dispatch `SPLIT` action
	 * @param {"vertical" | "horizontal"} orientation Split orientation
	 */
	const handleSplit = (orientation) => {
		dispatch({
			type: "SPLIT",
			payload: { id: node.id, orientation },
		});
	};

	const handleRemove = () => {
		dispatch({
			type: "REMOVE",
			payload: { id: node.id },
		});
	};

	// Render if there is no children
	if (!node.children.length) {
		return (
			<div
				className="flex items-center justify-center flex-1 gap-1"
				style={{ backgroundColor: node.color }}
			>
				<div className="flex items-center gap-1 text-sm font-bold">
					<button
						onClick={() => handleSplit("vertical")}
						className="bg-blue-800 text-white w-6 h-6 rounded"
					>
						V
					</button>
					<button
						onClick={() => handleSplit("horizontal")}
						className="bg-teal-800 text-white w-6 h-6 rounded"
					>
						H
					</button>
					{/* Show the remove button if totalPartitions is greater than 1 */}
					{totalPartitions > 1 && (
						<button
							onClick={handleRemove}
							className="bg-red-500 text-white w-6 h-6 rounded"
						>
							-
						</button>
					)}
					<p>{node.id}</p>
				</div>
			</div>
		);
	}

	// Render recursively if there are children
	return (
		<div
			className={`flex flex-1 gap-1 ${
				node.orientation === "vertical" ? "flex-row" : "flex-col"
			}`}
		>
			{node.children.map((child) => (
				<Partition
					key={child.id}
					node={child}
					dispatch={dispatch}
					totalPartitions={totalPartitions}
				/>
			))}
		</div>
	);
};

export default Partition;
