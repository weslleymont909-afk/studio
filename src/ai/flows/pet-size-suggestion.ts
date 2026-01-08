'use server';

/**
 * @fileOverview A pet size suggestion AI agent.
 *
 * - petSizeSuggestion - A function that suggests a pet garment size based on the pet's weight.
 * - PetSizeSuggestionInput - The input type for the petSizeSuggestion function.
 * - PetSizeSuggestionOutput - The return type for the petSizeSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PetSizeSuggestionInputSchema = z.object({
  animalType: z.enum(['dog', 'cat']).describe('The type of animal: dog or cat.'),
  weightKg: z.number().describe('The weight of the pet in kilograms.'),
  garmentType: z.string().describe('The type of garment (e.g., shirt, coat).'),
});
export type PetSizeSuggestionInput = z.infer<typeof PetSizeSuggestionInputSchema>;

const PetSizeSuggestionOutputSchema = z.object({
  size: z.enum(['PP', 'P', 'M', 'G', 'GG']).describe('The suggested size for the garment.'),
  confidence: z.number().describe('A confidence score (0-1) for the size suggestion.'),
  reasoning: z.string().describe('The reasoning behind the size suggestion.'),
});
export type PetSizeSuggestionOutput = z.infer<typeof PetSizeSuggestionOutputSchema>;

export async function petSizeSuggestion(input: PetSizeSuggestionInput): Promise<PetSizeSuggestionOutput> {
  return petSizeSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'petSizeSuggestionPrompt',
  input: {schema: PetSizeSuggestionInputSchema},
  output: {schema: PetSizeSuggestionOutputSchema},
  prompt: `You are an expert in pet garment sizing. Based on the animal type ({{{animalType}}}), weight ({{{weightKg}}} kg), and garment type ({{{garmentType}}}), suggest an appropriate size (PP, P, M, G, GG). Also, provide a confidence score (0-1) for your suggestion and a brief explanation of your reasoning.

Ensure that the suggested size is appropriate for the specified animal and garment type, taking into account typical size variations.

Output in JSON format according to the schema.`, // Enforce JSON output for structured parsing.
});

const petSizeSuggestionFlow = ai.defineFlow(
  {
    name: 'petSizeSuggestionFlow',
    inputSchema: PetSizeSuggestionInputSchema,
    outputSchema: PetSizeSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
