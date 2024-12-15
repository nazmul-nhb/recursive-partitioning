//@ts-check
import { generateRandomColor } from "../utilities/colorGenerator";

/**
 * @typedef {{ id: number, color: string, orientation: "v" | "h" | null, children: PartitionState[] }} PartitionState
 * @typedef {{ type: 'SPLIT', payload: { id: number, orientation: "v" | "h" } } | { type: 'REMOVE', payload: { id: number } }} Action
 */

/** @type {PartitionState} */
export const initialPartitionState = {
    id: 1,
    color: generateRandomColor(),
    orientation: null,
    children: [],
};

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
                if (node.id === id) {
                    return {
                        ...node,
                        orientation,
                        children: [
                            {
                                id: Date.now(),
                                color: node.color,
                                orientation: null,
                                children: [],
                            },
                            {
                                id: Date.now() + 1,
                                color: generateRandomColor(),
                                orientation: null,
                                children: [],
                            },
                        ],
                    };
                }

                if (node.children.length > 0) {
                    return {
                        ...node,
                        children: node.children.map(splitPartition),
                    };
                }

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
                if (node.id === id) {
                    return null;
                }

                if (node.children.length > 0) {
                    return {
                        ...node,
                        children: node.children.map(removePartition).filter((child) => child !== null),

                    };
                }
                
                return node;
            };

            const newState = removePartition(state);
            return newState ? newState : { id: Date.now(), color: generateRandomColor(), orientation: null, children: [] };
        }

        default:
            return state;
    }
};