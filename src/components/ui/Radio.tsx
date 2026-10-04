import React from 'react';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  name: string;
  label?: string;
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  value,
  options,
  onChange,
  className = '',
}) => {
  return (
    <div className={`space-y-2 text-left ${className}`}>
      {label && <span className="block text-xs font-medium text-dark">{label}</span>}
      <div className="space-y-2">
        {options.map((opt) => {
          const isChecked = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`flex items-start gap-3 p-3 border rounded cursor-pointer transition-colors ${
                isChecked
                  ? 'border-primary bg-primary/5 text-dark'
                  : 'border-border bg-white hover:bg-subtle text-body'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isChecked}
                onChange={() => onChange(opt.value)}
                className="mt-0.5 h-4 w-4 text-primary border-border focus:ring-primary accent-primary"
              />
              <div className="flex-1 text-xs">
                <span className="font-medium text-dark block">{opt.label}</span>
                {opt.description && (
                  <span className="text-muted block mt-0.5 leading-relaxed">
                    {opt.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <label htmlFor={inputId} className={`flex items-start gap-2.5 cursor-pointer text-left ${className}`}>
      <input
        type="checkbox"
        id={inputId}
        className="mt-0.5 h-4 w-4 text-primary border-border rounded focus:ring-primary accent-primary"
        {...props}
      />
      <div className="text-xs">
        <span className="font-medium text-dark block">{label}</span>
        {description && <span className="text-muted block mt-0.5">{description}</span>}
      </div>
    </label>
  );
};
