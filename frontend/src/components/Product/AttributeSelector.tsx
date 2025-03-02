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
  disabled?: boolean; // added optional disabled prop
}

const toKebabCase = (str: string) => str.replace(/\s+/g, '-').toLowerCase();

const AttributeSelector: React.FC<AttributeSelectorProps> = ({ 
  attribute, 
  selectedValue, 
  onChange, 
  compact = false,
  disabled = false
}) => {
  const attrTestId = attribute.name.toLowerCase() === 'color' 
    ? `${compact ? 'cart-item' : 'product'}-attribute-color`
    : `${compact ? 'cart-item' : 'product'}-attribute-${toKebabCase(attribute.name)}`;

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
          let testIdValue;

          if (attribute.name.toLowerCase() === 'color') {
            testIdValue = `color-${option.value}`;
          } else if (attribute.name.toLowerCase() === 'capacity') {
            testIdValue = `capacity-${option.displayValue}`;
          } else {
            testIdValue = `${toKebabCase(attribute.name)}-${toKebabCase(option.displayValue)}`;
          }

          return (
            <button
              key={option.id}
              onClick={() => {
                if (!disabled) {
                  onChange(attribute.name, option.value);
                }
              }}
              data-testid={`product-attribute-${testIdValue}`}
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
