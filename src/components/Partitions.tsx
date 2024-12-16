import React from "react";
import type { TAppDispatch } from "../store";
import type { TOrientation, IPartition } from "../types";
import { remove, split } from "../features/partition";

interface PartitionProps {
	node: IPartition;
	dispatch: TAppDispatch;
	totalPartitions: number;
}

const Partition: React.FC<PartitionProps> = ({
	node,
	dispatch,
	totalPartitions,
}) => {
	/**
	 * Function to dispatch `SPLIT` action
	 */
	const handleSplit = (orientation: TOrientation) => {
		dispatch(split({ id: node.id, orientation }));
	};

	const handleRemove = () => {
		dispatch(remove({ id: node.id }));
	};

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
