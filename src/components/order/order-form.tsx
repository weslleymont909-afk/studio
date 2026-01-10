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
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const orderFormSchema = z
  .object({
    personType: z.enum(['cpf', 'cnpj'], {
      required_error: 'Selecione o tipo de pessoa.',
    }),
    name: z.string().min(2, { message: 'Nome é obrigatório.' }),
    document: z
      .string()
      .min(11, { message: 'Documento deve ter pelo menos 11 dígitos.' }),
    stateRegistration: z.string().optional(),
    phone: z.string().min(10, { message: 'Número de telefone inválido.' }),
    cep: z
      .string()
      .min(8, { message: 'CEP deve ter 8 dígitos.' })
      .max(9, { message: 'CEP inválido.' }),
    street: z.string().min(3, { message: 'Rua é obrigatória.' }),
    number: z.string().min(1, { message: 'Número é obrigatório.' }),
    complement: z.string().optional(),
    neighborhood: z.string().min(2, { message: 'Bairro é obrigatório.' }),
    city: z.string().min(2, { message: 'Cidade é obrigatória.' }),
    state: z.string().min(2, { message: 'Estado é obrigatório.' }),
    observations: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.personType === 'cnpj') {
        return !!data.stateRegistration && data.stateRegistration.length > 0;
      }
      return true;
    },
    {
      message: 'Inscrição Estadual é obrigatória para CNPJ.',
      path: ['stateRegistration'],
    }
  );

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
      personType: 'cpf',
      name: '',
      document: '',
      stateRegistration: '',
      phone: '',
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      observations: '',
    },
  });

  const personType = form.watch('personType');

  const handleCepBlur = async (cep: string) => {
    const cleanedCep = cep.replace(/\D/g, '');
    if (cleanedCep.length !== 8) {
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanedCep}/json/`
      );
      const data = await response.json();

      if (!data.erro) {
        form.setValue('street', data.logradouro);
        form.setValue('neighborhood', data.bairro);
        form.setValue('city', data.localidade);
        form.setValue('state', data.uf);
        form.setFocus('number');
      } else {
        toast({
          variant: 'destructive',
          title: 'CEP não encontrado',
          description: 'Por favor, verifique o CEP e tente novamente.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao buscar CEP',
        description:
          'Não foi possível buscar o endereço. Tente novamente mais tarde.',
      });
    }
  };

  const generateOrderMessage = (data: OrderFormValues) => {
    const orderItems = items
      .map((item) => {
        let details = `(${item.size}`;
        if (item.gender && item.gender !== 'unisex') {
          details += `, ${item.gender === 'male' ? 'Macho' : 'Fêmea'}`;
        }
        details += `)`;
  
        const price = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(item.product.price * item.quantity);
  
        return `- ${item.quantity}x ${item.product.name} ${details} - ${price}`;
      })
      .join('\n');

    const total = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(totalPrice);

    let message = `*Olá! Gostaria de fazer um pedido.*\n\n`;
    message += `*--- RESUMO DO PEDIDO ---*\n`;
    message += `${orderItems}\n\n`;
    message += `*Subtotal:* ${total}\n\n`;
    message += `*--- DADOS PARA ENTREGA ---*\n`;
    message += `*Nome:* ${data.name}\n`;
    message += `*${data.personType === 'cpf' ? 'CPF' : 'CNPJ'}:* ${
      data.document
    }\n`;
    if (data.personType === 'cnpj' && data.stateRegistration) {
      message += `*Inscrição Estadual:* ${data.stateRegistration}\n`;
    }
    message += `*Telefone:* ${data.phone}\n`;
    message += `*Endereço:* ${data.street}, ${data.number}${
      data.complement ? ` - ${data.complement}` : ''
    }\n`;
    message += `*Bairro:* ${data.neighborhood}\n`;
    message += `*Cidade/Estado:* ${data.city}/${data.state}\n`;
    message += `*CEP:* ${data.cep}\n\n`;

    if (data.observations) {
      message += `*Observações:* ${data.observations}\n\n`;
    }

    message += `Aguardo o retorno com o valor do frete. Obrigado(a)!`;

    return message;
  };

  const onSubmit = (data: OrderFormValues) => {
    const message = generateOrderMessage(data);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    toast({
      title: 'Pedido Pronto!',
      description:
        'Sua mensagem para o WhatsApp foi gerada. Finalize o envio na nova aba.',
    });

    clearCart();
    setOrderFormOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="personType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Tipo de Pessoa</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="cpf" />
                    </FormControl>
                    <FormLabel className="font-normal">Pessoa Física</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="cnpj" />
                    </FormControl>
                    <FormLabel className="font-normal">Pessoa Jurídica</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {personType === 'cpf' ? 'Nome Completo' : 'Razão Social'}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    personType === 'cpf'
                      ? 'Seu nome completo'
                      : 'Nome da sua empresa'
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="document"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{personType === 'cpf' ? 'CPF' : 'CNPJ'}</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    personType === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {personType === 'cnpj' && (
          <FormField
            control={form.control}
            name="stateRegistration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inscrição Estadual</FormLabel>
                <FormControl>
                  <Input placeholder="Número da Inscrição Estadual" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input
                  placeholder="00000-000"
                  {...field}
                  onBlur={(e) => handleCepBlur(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem>
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
                <Textarea
                  placeholder="Alguma observação sobre o pedido?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-xs text-muted-foreground pt-2">
          “O valor do frete será calculado e informado posteriormente pelo
          WhatsApp.”
        </p>

        <div className="flex flex-col gap-2">
          <Button type="submit" className="w-full">
            Enviar via WhatsApp
          </Button>
        </div>
      </form>
    </Form>
  );
}
