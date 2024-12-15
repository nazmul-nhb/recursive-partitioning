//@ts-check

/**
 * Function to generate random color.
 * @returns {string} Generated Random Color.
 */
export const generateRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;
