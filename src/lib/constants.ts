// Represents a image model with its name and URL
export interface ImageModel {
  name: string; // The name of the image model
  url: string;  // The URL to the model for generating image
}

// An array of predefined sound models
const Image_MODELS: ImageModel[] = [
  {
    name: "Desing Gen Model",
    url: "https://api-inference.huggingface.co/models/ahmed-naseer/designgen-23k-25k",
  }
];

// Export the array of image models
export default Image_MODELS;
