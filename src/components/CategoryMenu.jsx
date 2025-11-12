import React from 'react';
import { CATEGORIES, COLOR_CLASSES } from '../utils/constants';

export default function CategoryMenu({ onSelectCategory }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
      {CATEGORIES.map((category) => {
        const Icon = category.icon;
        
        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category)}
            className={`bg-gradient-to-br ${COLOR_CLASSES[category.color]} 
            text-white p-3 sm:p-4 rounded-xl hover:shadow-lg transition-all text-left`}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-2" />
            <h3 className="font-semibold text-xs sm:text-sm mb-1">{category.title}</h3>
            <p className="text-xs opacity-90 hidden sm:block">{category.description}</p>
          </button>
        );
      })}
    </div>
  );
}