'use client' 

import { GenerateImageForm } from "@/components/GenerateImageForm";
import Loader from "@/components/Loader";
import { useState } from "react";

/**
 * The main view component for generating an image using a pre-trained model.
 */
export default function GenerateImageView() {
  // State to manage loading status and image URL
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGetImage = async (request: CreateImageRequest) => {
    setIsLoading(true);

    try {
      // Make a POST request to the server's API endpoint to generate image
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: request.text,
          modelUrl: request.modelUrl,
        }),
      });

      console.log(request.modelUrl)

  

      if (!response.ok) {
        throw new Error("Failed to fetch image data.");
      }

      // Get the image data as a Blob (assuming server returns an image format)
      const data = await response.blob();

      // Convert Blob to URL for the image
      const imageUrl = URL.createObjectURL(data);
      setImageUrl(imageUrl);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/3 p-4">
        <div className="ml-8 mr-8 mt-4 mb-4 text-xl">
          <h1>Text to Image</h1>
        </div>
        {/* Render the form component for generating image */}
        <GenerateImageForm handleGetImage={handleGetImage} />
      </div>
      <div className="w-full md:w-2/3 p-4 bg-gray-200 h-screen">
        <div className="h-full flex justify-center items-center">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {imageUrl && (
                <img src={imageUrl} alt="Generated Image" />
              )}
            </>
          )}
        </div>
       
      </div>
    
    </div>
   
  );
}
