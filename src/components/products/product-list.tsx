'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from './product-card';
import { Dog, Cat } from 'lucide-react';

interface ProductListProps {
  allProducts: Product[];
}

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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
          {dogProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="cat">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
          {catProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
