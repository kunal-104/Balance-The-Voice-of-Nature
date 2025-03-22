import * as toxicity from '@tensorflow-models/toxicity';

const threshold = 0.6; // Minimum confidence threshold

let model = null;

// Load the model once and reuse it
const loadToxicityModel = async () => {
    if (!model) {
        model = await toxicity.load(threshold);
    }
};

// Function to analyze text toxicity
export const checkToxicity = async (text) => {
    await loadToxicityModel(); // Ensure model is loaded

    if (!model) {
        throw new Error("Toxicity model failed to load.");
    }

    const predictions = await model.classify([text]);

    // Check if any label exceeds the toxicity threshold
    const isToxic = predictions.some(
        (prediction) => prediction.results[0].probabilities[1] > threshold
    );

    return {
        isToxic,
        details: predictions.map((prediction) => ({
            label: prediction.label,
            probability: prediction.results[0].probabilities[1],
            toxic: prediction.results[0].probabilities[1] > threshold,
        })),
    };
};
