'use client';

import Image from 'next/image';
import { Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const image = PlaceHolderImages.find((img) => img.id === item.product.imageId);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-start gap-4 py-4">
      {image && (
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={image.imageUrl}
            alt={item.product.name}
            data-ai-hint={image.imageHint}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex-1">
        <h3 className="font-medium">{item.product.name}</h3>
        <p className="text-sm text-muted-foreground">
          Tamanho: {item.size}
          {item.gender && item.gender !== 'unisex' && `, ${item.gender === 'male' ? 'Macho' : 'Fêmea'}`}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
            className="h-8 w-14 text-center"
            min="0"
          />
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="text-muted-foreground"
        onClick={() => removeItem(item.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
