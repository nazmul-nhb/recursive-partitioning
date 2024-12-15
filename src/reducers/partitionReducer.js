import { generateRandomColor } from "../utilities/colorGenerator";

/**
 * @typedef {{ id: number, color: string, orientation: "vertical" | "horizontal" | null, children: PartitionState[] }} PartitionState
 * @typedef {{ type: 'SPLIT', payload: { id: number, orientation: "vertical" | "horizontal" } } | { type: 'REMOVE', payload: { id: number } } | { type: 'REMOVE_CHILDREN', payload: { id: number } }} Action
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
            // Ensure root node (id: 1) is never removed
            return newState || { ...state, children: [] };
        }

        case "REMOVE_CHILDREN": {
            const { id } = action.payload;

            const clearChildren = (node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        children: [],
                    };
                }

                if (node.children.length > 0) {
                    return {
                        ...node,
                        children: node.children.map(clearChildren),
                    };
                }

                return node;
            };

            return clearChildren(state);
        }

        default:
            return state;
    }
};
