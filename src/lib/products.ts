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
    id: 'cat-1',
    name: 'Roupa Cirúrgica para Gatos',
    description:
      'Modelo exclusivo para felinos, com tecido elástico e design que evita o estresse durante a recuperação.',
    category: 'cat',
    imageId: 'cat-surgical-shirt',
    sizes: ['P', 'M', 'G'],
    isBestSeller: true,
  },
  {
    id: 'cat-2',
    name: 'Body Pós-Cirúrgico Felino',
    description:
      'Body completo que oferece segurança extra, impedindo o acesso a pontos e curativos em qualquer parte do tronco.',
    category: 'cat',
    imageId: 'cat-surgical-suit',
    sizes: ['P', 'M', 'G'],
  },
];
