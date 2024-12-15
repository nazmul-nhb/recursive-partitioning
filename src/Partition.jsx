//@ts-check
import React from "react";

/**
 * Partition Component
 * @param {Object} props Partition Component Props
 * @param {import('./reducers/partitionReducer').PartitionState} props.node Child Node
 * @param {React.Dispatch<import('./reducers/partitionReducer').Action>} props.dispatch Dispatch Function
 */
const Partition = ({ node, dispatch }) => {
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

	/**
	 * Function to dispatch `REMOVE` action
	 */
	const handleRemove = () => {
		dispatch({
			type: "REMOVE",
			payload: { id: node.id },
		});
	};

	// Render node with no children
    if (node.children.length === 0) {
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
					{node.isRemovable && (
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

	// Render node with children
	return (
		<div
			className={`flex flex-1 gap-1 ${
				node.orientation === "vertical" ? "flex-row" : "flex-col"
			}`}
		>
			{node.children.map((child) => (
				<Partition key={child.id} node={child} dispatch={dispatch} />
			))}
		</div>
	);
};

export default Partition;
