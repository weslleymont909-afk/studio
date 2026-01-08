import type { Product } from './types';

export const products: Product[] = [
  {
    id: 'dog-male-1',
    name: 'Roupa Cirúrgica para Cães (Macho)',
    description:
      'Proteção e conforto para a recuperação de cães machos. Design anatômico que facilita a micção.',
    category: 'dog',
    imageId: 'dog-surgical-shirt-male',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    genders: ['male'],
    isBestSeller: true,
  },
  {
    id: 'dog-female-1',
    name: 'Roupa Cirúrgica para Cadelas',
    description:
      'Ideal para pós-operatório de castração e outras cirurgias abdominais em fêmeas. Cobre toda a cadeia mamária.',
    category: 'dog',
    imageId: 'dog-surgical-shirt-female',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    genders: ['female'],
  },
  {
    id: 'dog-unisex-1',
    name: 'Roupa de Proteção Unissex para Cães',
    description:
      'Modelo unissex para proteção de cirurgias dermatológicas ou ferimentos no tronco e membros.',
    category: 'dog',
    imageId: 'dog-surgical-shirt-unisex',
    sizes: ['P', 'M', 'G'],
  },
  {
    id: 'cat-00',
    name: 'Roupa Cirúrgica para Gatos (Tamanho 00)',
    description: 'Para peitoral de 28cm e peso de 1,5kg.',
    category: 'cat',
    imageId: 'cat-surgical-shirt',
    sizes: ['00'],
  },
  {
    id: 'cat-01',
    name: 'Roupa Cirúrgica para Gatos (Tamanho 01)',
    description: 'Para peitoral de 30cm e peso entre 2-3kg.',
    category: 'cat',
    imageId: 'cat-surgical-shirt',
    sizes: ['01'],
    isBestSeller: true,
  },
  {
    id: 'cat-02',
    name: 'Roupa Cirúrgica para Gatos (Tamanho 02)',
    description: 'Para peitoral de 32cm e peso entre 3-4kg.',
    category: 'cat',
    imageId: 'cat-surgical-shirt',
    sizes: ['02'],
  },
  {
    id: 'cat-03',
    name: 'Roupa Cirúrgica para Gatos (Tamanho 03)',
    description: 'Para peitoral de 34cm e peso entre 4-5kg.',
    category: 'cat',
    imageId: 'cat-surgical-shirt',
    sizes: ['03'],
  },
  {
    id: 'cat-04',
    name: 'Roupa Cirúrgica para Gatos (Tamanho 04)',
    description: 'Para peitoral de 36cm e peso entre 5-6kg.',
    category: 'cat',
    imageId: 'cat-surgical-shirt',
    sizes: ['04'],
  },
  {
    id: 'cat-05',
    name: 'Roupa Cirúrgica para Gatos (Tamanho 05)',
    description: 'Para peitoral de 38cm e peso entre 7-8kg.',
    category: 'cat',
    imageId: 'cat-surgical-shirt',
    sizes: ['05'],
  },
];
