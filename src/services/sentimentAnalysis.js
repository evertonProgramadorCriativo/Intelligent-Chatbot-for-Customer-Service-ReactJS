const positiveWords = [
  'obrigado', 'ótimo', 'excelente', 'bom', 'perfeito', 
  'adorei', 'ajudou', 'resolveu', 'maravilhoso'
];

const negativeWords = [
  'problema', 'ruim', 'péssimo', 'horrível', 'reclamação', 
  'insatisfeito', 'não funciona', 'defeito', 'demora'
];

export const analyzeSentiment = (text) => {
  const lowerText = text.toLowerCase();
  const hasPositive = positiveWords.some(word => lowerText.includes(word));
  const hasNegative = negativeWords.some(word => lowerText.includes(word));
  
  if (hasPositive && !hasNegative) return 'positive';
  if (hasNegative && !hasPositive) return 'negative';
  return 'neutral';
};

export const getSentiment = (sentiment) => {
  switch(sentiment) {
    case 'positive': return 'Feliz';
    case 'negative': return 'Triste';
    default: return 'Neutro';
  }
};

export const calculateStats = (messages) => {
  const userMessages = messages.filter(m => m.role === 'user');
  const positive = userMessages.filter(m => m.sentiment === 'positive').length;
  const negative = userMessages.filter(m => m.sentiment === 'negative').length;
  const neutral = userMessages.filter(m => m.sentiment === 'neutral').length;
  const total = userMessages.length;

  return { positive, negative, neutral, total };
};