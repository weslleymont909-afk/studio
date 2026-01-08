'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from './product-card';
import { Dog, Cat } from 'lucide-react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ProductListProps {
  allProducts: Product[];
}

const catSizes = [
    { size: '00', chest: '28 cm', weight: '1,5 kg' },
    { size: '01', chest: '30 cm', weight: '2 - 3 kg' },
    { size: '02', chest: '32 cm', weight: '3 - 4 kg' },
    { size: '03', chest: '34 cm', weight: '4 - 5 kg' },
    { size: '04', chest: '36 cm', weight: '5 - 6 kg' },
    { size: '05', chest: '38 cm', weight: '7 - 8 kg' },
];

export function ProductList({ allProducts }: ProductListProps) {
  const [activeTab, setActiveTab] = useState<'dog' | 'cat'>('dog');

  const dogProducts = allProducts.filter((p) => p.category === 'dog');
  const catProducts = allProducts.filter((p) => p.category === 'cat');

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as 'dog' | 'cat')}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="dog">
          <Dog className="mr-2 h-4 w-4" />
          Cachorros
        </TabsTrigger>
        <TabsTrigger value="cat">
          <Cat className="mr-2 h-4 w-4" />
          Gatos
        </TabsTrigger>
      </TabsList>
      <TabsContent value="dog">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6">
          {dogProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="cat">
        <div className="mt-8 rounded-lg border">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Tabela de Medidas para Gatos</h3>
          </div>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="text-center">Tamanho</TableHead>
                    <TableHead className="text-center">Peitoral (cm)</TableHead>
                    <TableHead className="text-center">Peso (kg)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {catSizes.map((row) => (
                    <TableRow key={row.size}>
                        <TableCell className="text-center font-medium">{row.size}</TableCell>
                        <TableCell className="text-center">{row.chest}</TableCell>
                        <TableCell className="text-center">{row.weight}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6">
          {catProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
