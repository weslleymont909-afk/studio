'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import type { Product, Size, Gender } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState<Size | undefined>(
    product.sizes.length === 1 ? product.sizes[0] : undefined
  );
  const [selectedGender, setSelectedGender] = React.useState<Gender | undefined>(
    product.genders && product.genders.length === 1 ? product.genders[0] : (product.genders?.includes('unisex') ? 'unisex' : undefined)
  );

  const image = PlaceHolderImages.find((img) => img.id === product.imageId);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: 'Tamanho não selecionado',
        description: 'Por favor, escolha um tamanho.',
        variant: 'destructive',
      });
      return;
    }
    if (product.genders && product.genders.length > 0 && !selectedGender) {
      toast({
        title: 'Variação não selecionada',
        description: 'Por favor, escolha uma variação (macho/fêmea).',
        variant: 'destructive',
      });
      return;
    }

    addItem(product, quantity, selectedSize, selectedGender);
    toast({
      title: 'Produto Adicionado',
      description: `${product.name} (Tamanho: ${selectedSize}) foi adicionado ao seu pedido.`,
    });
    setIsOpen(false);
    // Reset state for next open
    setQuantity(1);
    if (product.sizes.length > 1) {
      setSelectedSize(undefined);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Card className="overflow-hidden flex flex-col">
        <CardHeader className="p-0">
          {image && (
            <div className="relative aspect-square w-full">
              <Image
                src={image.imageUrl}
                alt={product.name}
                data-ai-hint={image.imageHint}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-2 left-2 text-base">
                {product.sizes[0]}
              </Badge>
               {product.isBestSeller && (
                <Badge className="absolute top-2 right-2">Mais Vendido</Badge>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4 flex-1">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <CardDescription className="mt-1 h-10 text-sm">
            {product.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex-col items-start">
          <div className="font-bold text-lg mb-2">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
          </div>
          <DialogTrigger asChild>
            <Button className="w-full">Adicionar ao Pedido</Button>
          </DialogTrigger>
        </CardFooter>
      </Card>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {product.sizes.length > 1 && (
            <div>
              <Label>Tamanhos Disponíveis</Label>
              <RadioGroup
                value={selectedSize}
                onValueChange={(value: Size) => setSelectedSize(value)}
                className="mt-2 flex flex-wrap gap-2"
              >
                {product.sizes.map((size) => (
                  <div key={size} className="flex items-center">
                    <RadioGroupItem value={size} id={`${product.id}-${size}`} className="sr-only" />
                    <Label
                      htmlFor={`${product.id}-${size}`}
                      className="cursor-pointer rounded-md border-2 border-muted bg-popover px-3 py-1.5 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
          
          {product.genders && product.genders.length > 0 && product.genders[0] !== 'unisex' && (
            <div>
              <Label>Variação</Label>
              <RadioGroup
                value={selectedGender}
                onValueChange={(value: Gender) => setSelectedGender(value)}
                className="mt-2 flex gap-2"
              >
                {product.genders.map((gender) => (
                  <div key={gender} className="flex items-center">
                    <RadioGroupItem value={gender} id={`${product.id}-${gender}`} className="sr-only" />
                    <Label
                      htmlFor={`${product.id}-${gender}`}
                      className="cursor-pointer rounded-md border-2 border-muted bg-popover px-3 py-1.5 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      {gender === 'male' ? 'Macho' : 'Fêmea'}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          <div>
            <Label htmlFor="quantity">Quantidade</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
              className="mt-2 w-24"
            />
          </div>

        </div>
        <Button onClick={handleAddToCart}>Adicionar ao Pedido</Button>
      </DialogContent>
    </Dialog>
  );
}
