//@ts-check

/**
 * Track previously generated colors.
 *  @type {Set<string>}
 */
const generatedColors = new Set();

/** @type {string[]} */
const recentColors = [];

/**
 * Function to generate a unique random color.
 * @returns {string} Generated unique random color.
 */
export const generateRandomColor = () => {
    console.log(generatedColors);

    let color;

    /**
     * Helper function to generate a random HSL color.
     */
    const generateColorHSL = () => {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 75 + Math.floor(Math.random() * 25);
        const lightness = 50 + Math.floor(Math.random() * 15);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    // Keep generating until a unique color is found that is also different from the last one
    do {
        color = generateColorHSL();
    } while (generatedColors.has(color) || isSimilarToLast(color));

    // Add the newly generated color to the set and recent colors
    generatedColors.add(color);
    recentColors.push(color);

    // Limit the recent colors to the last 5 to avoid excessive memory usage
    if (recentColors.length > 5) {
        recentColors.shift();
    }

    return color;
};

/**
 * Function to check if the new color is visually too similar to the previous one.
 * It compares the hue difference between the new color and the last one generated.
 * @param {string} newColor The new color to compare.
 * @returns {boolean} True if the new color is similar to the previous one.
 */
const isSimilarToLast = (newColor) => {
    if (recentColors.length === 0) return false;

    const newHSL = newColor.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
    const lastHSL = recentColors[recentColors.length - 1].match(/hsl\((\d+), (\d+)%, (\d+)%\)/);

    if (!newHSL || !lastHSL) return false;

    const newHue = parseInt(newHSL[1], 10);
    const lastHue = parseInt(lastHSL[1], 10);

    const hueDifference = Math.abs(newHue - lastHue);

    return hueDifference < 45;
};
