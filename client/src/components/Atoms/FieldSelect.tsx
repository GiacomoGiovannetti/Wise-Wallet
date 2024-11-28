import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { ErrorMessage, Field } from 'formik';
import { useState } from 'react';

interface Props {
  name: string;
  options?: string[];
  renderKey?: number;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
}

const FieldSelect = (props: Props) => {
  const {
    name,
    options,
    renderKey,
    placeholder,
    disabled = false,
    label,
    required = false,
    className = '',
    labelClassName = '',
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  //   const classNamesContainer = `
  //     ${styles.FieldContainer}
  //     ${styles[`FieldContainer--${layout}`]}
  //   `;

  //   const ClassNamesInput = `
  //     ${styles.FieldInput}
  //     ${className}
  //   `;

  //   const ClassNamesLabel = `
  //     ${styles.FieldLabel}
  //     ${labelClassName}
  //   `;

  return (
    <div className={`${className}`}>
      {label && (
        <label htmlFor={name} className={`${labelClassName}`}>
          {label}
          {required ? '*' : null}
        </label>
      )}
      <div className=''>
        <Field
          component='select'
          name={name}
          required={required}
          multiple={false}
          className={''}
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <option defaultValue={placeholder} hidden>
            {placeholder}
          </option>
          {(options || []).map((option, index) => {
            return renderKey ? (
              <option value={option[renderKey]} key={index}>
                {option[renderKey]}
              </option>
            ) : (
              //   <option value={option.pk ? option.pk : option} key={index}>
              //     {option?.nome ? option.nome : option}
              //   </option>
              ''
            );
          })}
        </Field>
        <button>{!isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}</button>
      </div>
      <ErrorMessage component='p' name={name} className='' />
    </div>
  );
};

export default FieldSelect;
