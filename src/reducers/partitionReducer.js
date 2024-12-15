//@ts-check
import { generateRandomColor } from "../utilities/colorGenerator";

/**
 * @typedef {{ id:number, color:string, orientation:"vertical" | "horizontal" | null, isRemovable:boolean, children:PartitionState[] }} PartitionState
 * @typedef {{ type: 'SPLIT', payload: { id: number, orientation: "vertical" | "horizontal" } } | { type: 'REMOVE', payload: { id: number } }} Action
 */

/** @type {PartitionState} */
export const initialPartitionState = {
    id: 1,
    color: generateRandomColor(),
    orientation: null,
    isRemovable: false,
    children: [],
};

let idCounter = 2;

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
             * Recursive function to split a partition
             * @param {PartitionState} node
             * @returns {PartitionState}
             */
            const splitPartition = (node) => {
                // Only split the partition with the matching id
                if (node.id === id) {
                    // Split the current node and add two new children
                    return {
                        ...node,
                        orientation,
                        children: [
                            {
                                id: idCounter++,
                                color: node.color,
                                orientation: null,
                                isRemovable: true,
                                children: [],
                            },
                            {
                                id: idCounter++,
                                color: generateRandomColor(),
                                orientation: null,
                                isRemovable: true,
                                children: [],
                            },
                        ],
                    };
                }

                // If the node has children, split them recursively
                if (node.children.length > 0) {
                    return {
                        ...node,
                        children: node.children.map(splitPartition),
                    };
                }

                // Return the node unmodified if it's not being splitted.
                return node;
            };

            return splitPartition(state);
        }

        case "REMOVE": {
            const { id } = action.payload;
            /**
             * Recursive function to remove a partition
             * @param {PartitionState} node
             * @returns {PartitionState | null}
             */
            const removePartition = (node) => {
                // If this is the node to remove, return null
                if (node.id === id) {
                    return null;
                }

                // If the node has children, only remove the target node
                if (node.children.length > 0) {
                    return {
                        ...node,
                        children: node.children
                            .map(removePartition)
                            .filter((child) => child !== null), // Remove children with value `null`
                    };
                }

                return node;
            };

            const newState = removePartition(state);
            return newState ? newState : state; // If no partition was removed, return the initial intact state
        }

        default:
            return state;
    }
};
