'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { OrderForm } from '@/components/order/order-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

export function CartSummary() {
  const { totalItems, items } = useCart();
  const [isOrderFormOpen, setOrderFormOpen] = useState(false);

  if (totalItems === 0) {
    return null;
  }

  return (
    <>
      <Separator className="my-4" />
      <div className="space-y-4">
        <div className="flex justify-between font-medium">
          <span>Total de Itens</span>
          <span>{totalItems}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          O valor do frete será calculado e informado posteriormente pelo
          WhatsApp.
        </p>

        <Dialog open={isOrderFormOpen} onOpenChange={setOrderFormOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" disabled={items.length === 0}>
              Finalizar Pedido
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Informações para o Pedido</DialogTitle>
            </DialogHeader>
            <OrderForm setOrderFormOpen={setOrderFormOpen} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
