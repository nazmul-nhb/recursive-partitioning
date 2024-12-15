// @ts-check
import { generateRandomColor } from "../utilities/colorGenerator";

let idCounter = 2;

/**
 * @typedef {{
 *   id: number,
 *   color: string,
 *   orientation: "vertical" | "horizontal" | null,
 *   children: PartitionState[],
 *   totalPartitions: number
 * }} PartitionState
 * @typedef {{
 *   type: "SPLIT",
 *   payload: { id: number, orientation: "vertical" | "horizontal" }
 * } | {
 *   type: "REMOVE",
 *   payload: { id: number }
 * }} Action
 */

/**
 * Reducer function to manage partition state.
 * @param {PartitionState} state The current state
 * @param {Action} action The dispatched action
 * @returns {PartitionState} The new state
 */
export const partitionReducer = (state, action) => {
    switch (action.type) {
        case "SPLIT": {
            const { id, orientation } = action.payload;

            /**
             * Recursive function to split a partition.
             * @param {PartitionState} node
             * @returns {PartitionState}
             */
            const splitPartition = (node) => {
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
        }

        case "REMOVE": {
            const { id } = action.payload;

            /**
             * Recursive function to remove a partition.
             * @param {PartitionState} node
             * @returns {PartitionState | null}
             */
            const removePartition = (node) => {
                if (node.id === id) return null;

                const updatedChildren = node.children
                    .map(removePartition)
                    .filter((child) => child !== null);

                return {
                    ...node,
                    children: updatedChildren,
                    totalPartitions: updatedChildren.length ? getTotalPartitions(updatedChildren) : 1,
                };
            };

            return removePartition(state) || state;
        }

        default:
            return state;
    }
};

/**
 * Helper function to calculate total partitions.
 * @param {PartitionState[]} children 
 * @returns {number} The total number of partitions.
 */
export const getTotalPartitions = (children) => {
    return children.reduce((sum, child) => sum + child.totalPartitions, 0);
}
