import { ShoppingBag, Package, AlertCircle, HelpCircle } from 'lucide-react';

export const CATEGORIES = [
  {
    id: 'produtos',
    title: 'Produtos e Roupas',
    icon: ShoppingBag,
    color: 'blue',
    description: 'Informações sobre roupas, tamanhos, cores e disponibilidade'
  },
  {
    id: 'pedidos',
    title: 'Meus Pedidos',
    icon: Package,
    color: 'green',
    description: 'Rastreamento, status e prazos de entrega'
  },
  {
    id: 'reclamacoes',
    title: 'Reclamações',
    icon: AlertCircle,
    color: 'red',
    description: 'Problemas com produtos, entregas ou atendimento'
  },
  {
    id: 'duvidas',
    title: 'Dúvidas Gerais',
    icon: HelpCircle,
    color: 'purple',
    description: 'Trocas, devoluções, pagamentos e políticas'
  }
];

export const COLOR_CLASSES = {
  blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
  green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
  red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
  purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
};

