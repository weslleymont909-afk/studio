'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { petSizeSuggestion, type PetSizeSuggestionOutput } from '@/ai/flows/pet-size-suggestion';
import type { Animal } from '@/lib/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';

const suggestionSchema = z.object({
  weight: z.coerce.number().positive({ message: 'O peso deve ser um número positivo.' }),
});

interface SizeSuggestionProps {
  animalType: Animal;
  garmentType: string;
}

export function SizeSuggestion({ animalType, garmentType }: SizeSuggestionProps) {
  const [suggestion, setSuggestion] = useState<PetSizeSuggestionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof suggestionSchema>>({
    resolver: zodResolver(suggestionSchema),
  });

  const onSubmit = async (data: z.infer<typeof suggestionSchema>) => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);
    try {
      const result = await petSizeSuggestion({
        animalType,
        weightKg: data.weight,
        garmentType,
      });
      setSuggestion(result);
    } catch (e) {
      setError('Não foi possível sugerir um tamanho. Tente novamente.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-background/50 mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Wand2 className="h-5 w-5 text-accent-foreground" />
          Sugestão de Tamanho com IA
        </CardTitle>
        <CardDescription>Não tem certeza do tamanho? Informe o peso do seu pet.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="sr-only">Peso (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" placeholder="Peso em kg" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Sugerindo...' : 'Sugerir'}
            </Button>
          </form>
        </Form>
      </CardContent>
      {suggestion && (
        <CardFooter className="flex-col items-start gap-2">
          <p className="font-semibold">
            Tamanho Sugerido: <span className="text-primary-foreground font-bold rounded-md bg-primary px-2 py-1">{suggestion.size}</span>
          </p>
          <p className="text-sm text-muted-foreground">{suggestion.reasoning}</p>
        </CardFooter>
      )}
       {error && (
        <CardFooter>
          <p className="text-sm text-destructive">{error}</p>
        </CardFooter>
      )}
    </Card>
  );
}
