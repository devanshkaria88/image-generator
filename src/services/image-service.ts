// Define the types for our API responses
interface DallEResponse {
  created: number;
  data: {
    url: string;
    b64_json?: string;
  }[];
}

// Function to generate an image using DALL-E API
export async function generateImage(prompt: string, apiKey: string): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "dall-e-3", // Using DALL-E 3 model
        prompt,
        n: 1, // Number of images to generate
        size: "1024x1024", // Image size
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate image');
    }

    const data: DallEResponse = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}