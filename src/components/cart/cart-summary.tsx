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
  const { totalItems, items, totalPrice } = useCart();
  const [isOrderFormOpen, setOrderFormOpen] = useState(false);

  if (totalItems === 0) {
    return null;
  }

  return (
    <>
      <Separator className="my-4" />
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Total de Itens</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Subtotal</span>
          <span>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(totalPrice)}
          </span>
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
