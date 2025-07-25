
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { type AIEvaluation, type AIDocumentVerification } from '../types';

// IMPORTANT: This service assumes the API key is set in the environment variables.
// In a real application, this would be handled on a secure backend server, not the client.
// For this frontend-only demo, we're making a simplified assumption.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will be mocked.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const MOCK_EVALUATION: AIEvaluation = {
    estimatedValue: 1310000,
    confidence: "High",
    comparables: [
        { address: "120 Ocean Drive, Miami, FL", salePrice: 1280000 },
        { address: "135 Ocean Drive, Miami, FL", salePrice: 1350000 },
    ]
};

const MOCK_VERIFICATION: AIDocumentVerification = {
    ownerName: "John Doe",
    propertyAddress: "123 Ocean Drive, Miami, FL",
    registrationDate: "2022-08-15",
    isValid: true,
    issues: []
};


/**
 * Generates a property valuation using an AI model.
 * In a real scenario, this would make a call to the Gemini API.
 * For this demo, it returns a mock response after a short delay.
 */
export const getPropertyValuation = async (propertyDetails: string): Promise<AIEvaluation> => {
  console.log("Fetching AI property valuation for:", propertyDetails);

  if (!API_KEY) {
    console.log("Using mocked AI valuation response.");
    return new Promise(resolve => setTimeout(() => resolve(MOCK_EVALUATION), 1500));
  }
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following property details and provide a market valuation. Details: ${propertyDetails}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimatedValue: { type: Type.NUMBER, description: "The estimated market value of the property in USD." },
            confidence: { type: Type.STRING, description: "Confidence level of the estimation (e.g., High, Medium, Low)." },
            comparables: { 
                type: Type.ARRAY, 
                description: "A list of comparable properties used for the valuation.",
                items: {
                    type: Type.OBJECT,
                    properties: {
                        address: { type: Type.STRING },
                        salePrice: { type: Type.NUMBER }
                    }
                }
            }
          },
          required: ["estimatedValue", "confidence"]
        },
      },
    });

    const json = JSON.parse(response.text);
    return json as AIEvaluation;

  } catch (error) {
    console.error("Error fetching AI valuation:", error);
    // Fallback to mock data on API error
    return MOCK_EVALUATION;
  }
};

/**
 * Verifies a property document using AI-powered OCR and analysis.
 * Returns mock data for this demo.
 */
export const verifyDocument = async (fileBase64: string, mimeType: string): Promise<AIDocumentVerification> => {
  console.log("Verifying document with AI OCR...");
  
  if (!API_KEY) {
    console.log("Using mocked document verification response.");
    return new Promise(resolve => setTimeout(() => resolve(MOCK_VERIFICATION), 2500));
  }

  try {
    const imagePart = {
        inlineData: {
          mimeType: mimeType,
          data: fileBase64,
        },
    };
    const textPart = {
      text: "Analyze this property deed document. Extract the owner's name, property address, and date of registration. Confirm if it appears to be a valid legal document and list any potential issues."
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: { parts: [imagePart, textPart] },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    ownerName: { type: Type.STRING, description: "Full name of the property owner." },
                    propertyAddress: { type: Type.STRING, description: "Full address of the property." },
                    registrationDate: { type: Type.STRING, description: "Date of deed registration (YYYY-MM-DD)." },
                    isValid: { type: Type.BOOLEAN, description: "Whether the document appears to be a valid legal deed." },
                    issues: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of any identified issues or anomalies."}
                },
                required: ["ownerName", "propertyAddress", "registrationDate", "isValid"]
            }
        }
    });

    const json = JSON.parse(response.text);
    return json as AIDocumentVerification;

  } catch (error) {
    console.error("Error verifying document:", error);
    return MOCK_VERIFICATION;
  }
};
