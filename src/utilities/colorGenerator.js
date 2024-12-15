//@ts-check

// A set to track previously generated colors so that no similar color is generated
const generatedColors = new Set();

/**
 * Function to generate a unique random color.
 * @returns {string} Generated unique random color.
 */
export const generateRandomColor = () => {
    let color;

    // Keep generating until a unique color is found
    do {
        color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    } while (generatedColors.has(color));

    // Add the newly generated color to the set of generated colors
    generatedColors.add(color);

    return color;
};
