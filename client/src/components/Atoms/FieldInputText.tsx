import { EyeIcon } from '@heroicons/react/24/solid';
import { ErrorMessage, Field } from 'formik';
import { useState } from 'react';

interface Props {
  label?: string;
  type: 'text' | 'password' | 'email' | 'phone';
  name: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  labelClassName?: string;
}

const FieldInput = (props: Props) => {
  const {
    label,
    type,
    placeholder,
    name,
    required = false,
    disabled = false,
    className = '',
    labelClassName = '',
  } = props;

  //   const classNamesContainer = `
  //         ${styles.FieldContainer}
  //         ${styles[`FieldContainer--${layout}`]}
  //     `;

  //   const `${className}` = `
  //         ${styles.FieldInput}
  //         ${className}
  //   `;

  //   const ClassNamesLabel = `
  //   ${styles.FieldLabel}
  //   ${labelClassName}
  //   `;

  const InputComponent = () => {
    const [isVisible, setIsVisible] = useState(false);
    switch (type) {
      case 'text':
        return (
          <Field
            type={type}
            placeholder={placeholder}
            name={name}
            required={required}
            disabled={disabled}
            className={`form-input autofill-bg-color ${className}`}
          />
        );
      case 'password':
        return (
          <div className={``}>
            <Field
              type={isVisible ? 'text' : type}
              placeholder={placeholder}
              name={name}
              required={required}
              className={`form-input autofill-bg-color ${className}`}
            />
            <button
              className={'styles.ShowPasswordButton'}
              onClick={() => setIsVisible((prev) => !prev)}
            >
              <EyeIcon />
            </button>
          </div>
        );
      case 'email':
        return (
          <Field
            type={type}
            placeholder={placeholder}
            name={name}
            required={required}
            className={`form-input autofill-bg-color ${className}`}
          />
        );
      case 'phone':
        return (
          <Field
            type='text'
            placeholder={placeholder}
            name={name}
            required={required}
            className={`form-input autofill-bg-color ${className}`}
          />
        );
    }
  };

  return (
    <div className={''}>
      {label && (
        <label htmlFor={name} className={`${labelClassName}`}>
          {label}
          {required ? '*' : null}
        </label>
      )}
      <InputComponent />
      <ErrorMessage
        component='p'
        name={name}
        className={'styles.errorMessage'}
      />
    </div>
  );
};

export default FieldInput;
