'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/hooks/use-cart';
import { CartItem } from './cart-item';
import { CartSummary } from './cart-summary';
import { PawPrint } from 'lucide-react';

interface CartSheetProps {
  children: React.ReactNode;
}

export function CartSheet({ children }: CartSheetProps) {
  const { items } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Resumo do Pedido</SheetTitle>
        </SheetHeader>
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 pr-4">
              <div className="flex flex-col divide-y">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <CartSummary />
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <PawPrint className="h-16 w-16 text-muted" />
            <h2 className="text-xl font-semibold">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground">
              Adicione produtos para criar seu pedido.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
