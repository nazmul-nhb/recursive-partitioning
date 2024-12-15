//@ts-check
import React from "react";

/**
 * Partition Component
 * @param {Object} props Partition Component Props
 * @param {import('./reducers/partitionReducer').PartitionState} props.node Child Node
 * @param {React.Dispatch<import('./reducers/partitionReducer').Action>} props.dispatchFunction Dispatch Function
 */
const Partition = ({ node, dispatchFunction }) => {
	/**
	 * Function to dispatch `SPLIT` action
	 * @param {"vertical" | "horizontal"} orientation Split orientation
	 */
	const handleSplit = (orientation) => {
		dispatchFunction({
			type: "SPLIT",
			payload: { id: node.id, orientation },
		});
	};

	const handleRemove = () => {
		dispatchFunction({
			type: "REMOVE",
			payload: { id: node.id },
		});
	};

	const handleRemoveChildren = () => {
		dispatchFunction({
			type: "REMOVE_CHILDREN",
			payload: { id: node.id },
		});
	};

	const isMainParent = node.id === 1;

	return (
		<div
			className={`flex flex-1 ${
				node.orientation === "vertical" ? "flex-col" : "flex-row"
			}`}
			style={{ backgroundColor: node.color }}
		>
			{node.children.length === 0 ? (
				<div className="flex items-center justify-center flex-1">
					<div className="flex items-center space-x-2">
						<button
							onClick={() => handleSplit("vertical")}
							className="bg-blue-800 text-white px-2 py-1 rounded"
						>
							V
						</button>
						<button
							onClick={() => handleSplit("horizontal")}
							className="bg-teal-800 text-white px-2 py-1 rounded"
						>
							H
						</button>
						{!isMainParent && (
							<button
								onClick={handleRemove}
								className="bg-red-500 text-white px-2.5 py-1 rounded"
							>
								-
							</button>
						)}
						{isMainParent && node.children.length > 0 && (
							<button
								onClick={handleRemoveChildren}
								className="bg-red-500 text-white px-2.5 py-1 rounded"
							>
								Clear
							</button>
						)}
						<p>{node.id}</p>
					</div>
				</div>
			) : (
				node.children.map((child) => (
					<Partition
						key={child.id}
						node={child}
						dispatchFunction={dispatchFunction}
					/>
				))
			)}
		</div>
	);
};

export default Partition;
