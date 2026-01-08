'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { WHATSAPP_PHONE_NUMBER } from '@/lib/constants';

const orderFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Nome completo é obrigatório.' }),
  phone: z.string().min(10, { message: 'Número de telefone inválido.' }),
  street: z.string().min(3, { message: 'Rua é obrigatória.' }),
  number: z.string().min(1, { message: 'Número é obrigatório.' }),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, { message: 'Bairro é obrigatório.' }),
  city: z.string().min(2, { message: 'Cidade é obrigatória.' }),
  state: z.string().min(2, { message: 'Estado é obrigatório.' }),
  observations: z.string().optional(),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

interface OrderFormProps {
    setOrderFormOpen: (isOpen: boolean) => void;
}

export function OrderForm({ setOrderFormOpen }: OrderFormProps) {
  const { items, clearCart, totalPrice } = useCart();
  const { toast } = useToast();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      observations: '',
    },
  });

  const onSubmit = (data: OrderFormValues) => {
    const customerDetails = `*DADOS DO CLIENTE:*\nNome: ${data.fullName}\nTelefone: ${data.phone}\nEndereço: ${data.street}, ${data.number}${data.complement ? `, ${data.complement}`: ''} - ${data.neighborhood}, ${data.city}/${data.state}`;
    
    const orderItems = items.map(item => `- ${item.quantity}x ${item.product.name} (Tamanho: ${item.size}${item.gender && item.gender !== 'unisex' ? `, ${item.gender === 'male' ? 'Macho' : 'Fêmea'}` : ''}) - ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.product.price * item.quantity)}`).join('\n');

    const total = `\n*Subtotal: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}*`;
    
    const observations = data.observations ? `\n\n*OBSERVAÇÕES:*\n${data.observations}` : '';

    const message = `Olá! Segue meu pedido do catálogo de roupas cirúrgicas para pets.\n\n${customerDetails}\n\n*PEDIDO:*\n${orderItems}${total}${observations}\n\nAguardo o retorno com o valor do frete. Obrigado(a)!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    
    toast({
        title: "Pedido enviado!",
        description: "Seu pedido foi formatado. Conclua o envio no WhatsApp.",
    });

    clearCart();
    setOrderFormOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nº de Telefone (WhatsApp)</FormLabel>
              <FormControl>
                <Input placeholder="(XX) XXXXX-XXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Rua</FormLabel>
                <FormControl>
                    <Input placeholder="Sua rua" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                    <Input placeholder="Nº" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
                <FormItem className="sm:col-span-2">
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                    <Input placeholder="Apto, bloco, etc." {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
         <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                    <Input placeholder="Seu bairro" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                    <Input placeholder="Sua cidade" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                    <Input placeholder="UF" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <FormField
          control={form.control}
          name="observations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações Adicionais</FormLabel>
              <FormControl>
                <Textarea placeholder="Alguma observação sobre o pedido?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <p className="text-xs text-muted-foreground pt-2">
          “O valor do frete será calculado e informado posteriormente pelo WhatsApp.”
        </p>

        <Button type="submit" className="w-full">
          Enviar Pedido via WhatsApp
        </Button>
      </form>
    </Form>
  );
}
