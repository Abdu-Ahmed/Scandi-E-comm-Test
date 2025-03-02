import React from 'react';

interface AttributeItem {
  id: string;
  displayValue: string;
  value: string;
}

interface Attribute {
  id: string;
  name: string;
  type: string;
  items: AttributeItem[];
}

interface AttributeSelectorProps {
  attribute: Attribute;
  selectedValue: string;
  onChange: (attributeName: string, value: string) => void;
  compact?: boolean;
  disabled?: boolean;
}

const toKebabCase = (str: string) => str.replace(/\s+/g, '-').toLowerCase();

const AttributeSelector: React.FC<AttributeSelectorProps> = ({ 
  attribute, 
  selectedValue, 
  onChange, 
  compact = false,
  disabled = false
}) => {
  const isCartItem = compact;
  const attributeNameKebab = toKebabCase(attribute.name);
  
  // Generate correct test ID for the container
  const attrTestId = attribute.name.toLowerCase() === 'color' 
    ? `${isCartItem ? 'cart-item' : 'product'}-attribute-color` 
    : `${isCartItem ? 'cart-item' : 'product'}-attribute-${attributeNameKebab}`;

  return (
    <div 
      className={`${compact ? 'space-y-1' : 'mb-6'}`}
      data-testid={attrTestId}
    >
      <h3 className={`${compact ? 'text-sm font-medium text-gray-500' : 'text-sm font-bold uppercase mb-2'}`}>
        {attribute.name}
      </h3>
      <div className="flex flex-wrap gap-2">
        {attribute.items?.map((option) => {
          const isSelected = selectedValue === option.value;
          let optionValueKebab;
          
          if (attribute.name.toLowerCase() === 'color') {
            optionValueKebab = `color-${option.value}`;
          } else if (attribute.name.toLowerCase() === 'capacity') {
            optionValueKebab = `capacity-${toKebabCase(option.displayValue)}`;
          } else {
            optionValueKebab = `${attributeNameKebab}-${toKebabCase(option.displayValue)}`;
          }
          
          // Generate the correct test ID based on compact mode (cart item vs product) and selection state
          let testId;
          if (isCartItem) {
            // Cart item format: cart-item-attribute-{attribute}-{option}[-selected]
            testId = `cart-item-attribute-${optionValueKebab}${isSelected ? '-selected' : ''}`;
          } else {
            // Product page format: product-attribute-{attribute}-{option}
            testId = `product-attribute-${optionValueKebab}`;
          }
          
          return (
            <button
              key={option.id}
              onClick={() => {
                if (!disabled) {
                  onChange(attribute.name, option.value);
                }
              }}
              data-testid={testId}
              className={`
                flex items-center justify-center transition-all
                ${
                  attribute.type === 'swatch'
                    ? `${compact ? 'w-6 h-6' : 'w-8 h-8'} border-2 ${isSelected ? 'border-primary scale-110' : 'border-gray-200'}`
                    : `${compact ? 'text-sm px-2 py-1' : 'px-3 py-1 text-sm'} border ${
                      isSelected 
                        ? 'bg-primary text-white border-primary' 
                        : compact 
                          ? 'bg-gray-50 text-gray-600 border-gray-200' 
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                      }`
                }
              `}
              style={attribute.type === 'swatch' ? { backgroundColor: option.value } : {}}
              title={attribute.type === 'swatch' ? option.displayValue : undefined}
              disabled={disabled}
            >
              {attribute.type !== 'swatch' && option.displayValue}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AttributeSelector;