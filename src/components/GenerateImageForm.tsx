"use client";

// Import necessary modules and components
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import Image_MODELS, { ImageModel } from "@/lib/constants";

// Define the validation schema for the form fields
const FormSchema = z.object({
  soundModel: z.string({
    required_error: "Please select a Hugging Face image model to use.",
  }),
  text: z.string({
    required_error: "Please select a text for the model to use.",
  }),
});

// Define the props interface for the GenerateSoundForm component
interface GenerateImageFormProps {
  handleGetImage: (data: CreateImageRequest) => void;
}

// Main component function
export function GenerateImageForm({ handleGetImage }: GenerateImageFormProps) {
  // State for tracking form submission status
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  // Initialize the react-hook-form with the validation schema
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Function to handle form submission
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormSubmitting(true);
    
    // Append "textile design" to the end of the input text
    const textWithKeyword = `${data.text} + textile design`;
    
    // Prepare the sound request object
    const soundRequest: CreateImageRequest = {
      modelUrl: data.soundModel,
      text: textWithKeyword,
    };
    
    // Call the provided handler function with the sound request
    handleGetImage(soundRequest);
    
    setFormSubmitting(false);
    console.log(data.text)
  }

  return (
    <div className="ml-8 mr-8">
      {/* Form component that uses react-hook-form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Form field for selecting the sound model */}
          <FormField
            control={form.control}
            name="soundModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Model</FormLabel>
                {/* Select component for choosing a sound model */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={formSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* Map through available sound models */}
                    {Image_MODELS.map((model: ImageModel, index: number) => (
                      <SelectItem key={`${model.name}-${index}`} value={model.url}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  This model will generate your image.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Form field for entering the text */}
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  {/* Textarea component for entering text */}
                  <Textarea
                    disabled={formSubmitting}
                    rows={6}
                    placeholder="Enter your text here..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The text used to convert to image.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit button */}
          <Button type="submit" disabled={formSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
