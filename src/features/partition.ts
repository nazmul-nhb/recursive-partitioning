import { createSlice } from "@reduxjs/toolkit";
import { generateRandomColor } from "../components/colorGenerator";
import { IPartition } from "../types";

/** Track node ID */
let idCounter = 2;

/** Initial Partition State */
const initialState: IPartition = {
	id: 1,
	color: generateRandomColor(),
	orientation: null,
	children: [],
	totalPartitions: 1,
};

const partitionSlice = createSlice({
	name: "partitions",
	initialState,
	reducers: {
		split: (state, action) => {
			const { id, orientation } = action.payload;

			/**
			 * Recursive function to split a partition.
			 * @param node A partition/node.
			 * @returns Partition with child partitions.
			 */
			const splitPartition = (node: IPartition): IPartition => {
				if (node.id === id) {
					const newChildren = [
						{
							id: idCounter++,
							color: node.color,
							orientation: null,
							children: [],
							totalPartitions: 1,
						},
						{
							id: idCounter++,
							color: generateRandomColor(),
							orientation: null,
							children: [],
							totalPartitions: 1,
						},
					];
					return {
						...node,
						orientation,
						children: newChildren,
						totalPartitions: getTotalPartitions(newChildren),
					};
				}

				const updatedChildren = node.children.map(splitPartition);

				return {
					...node,
					children: updatedChildren,
					totalPartitions: getTotalPartitions(updatedChildren),
				};
			};

			return splitPartition(state);
		},
		remove: (state, action) => {
			const { id } = action.payload;

			/**
			 * Recursive function to remove a partition.
			 * @param node A partition/node.
			 * @returns Clean partition(s) after deleting the target partition.
			 */
			const removePartition = (node: IPartition): IPartition | null => {
				if (node.id === id) return null;
				const updatedChildren = node.children
					.map(removePartition)
					.filter((child) => child !== null);

				return {
					...node,
					children: updatedChildren,
					totalPartitions: updatedChildren.length
						? getTotalPartitions(updatedChildren)
						: 1,
				};
			};

			return removePartition(state) || state;
		},
	},
});

/**
 * Helper function to calculate total partitions.
 * @param children An array of child nodes/partitions.
 * @returns  The total number of partitions.
 */
const getTotalPartitions = (children: IPartition[]): number => {
	return children.reduce((sum, child) => sum + child.totalPartitions, 0);
};

export const { split, remove } = partitionSlice.actions;

export default partitionSlice.reducer;
