// // import { ErrorMessage, Field } from 'formik'
// import { useState } from 'react';
// import styles from './FieldSelect.module.sass';

// interface Props {
//   name: string;
//   options?: string[] | SelectProfessionType[];
//   renderKey?: string;
//   disabled?: boolean;
//   placeholder?: string;
//   label?: string;
//   required?: boolean;
//   className?: string;
//   labelClassName?: string;
//   layout?: 'vertical' | 'horizontal';
// }

// const FieldSelect = (props: Props) => {
//   const {
//     name,
//     options,
//     renderKey,
//     placeholder,
//     disabled = false,
//     label,
//     required = false,
//     className = '',
//     labelClassName = '',
//     layout = 'vertical',
//   } = props;

//   const [isOpen, setIsOpen] = useState(false);

//   const t = useTrans();

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

//   return (
//     <div className={classNamesContainer}>
//       {label && (
//         <label htmlFor={name} className={ClassNamesLabel}>
//           {t(label)}
//           {required ? '*' : null}
//         </label>
//       )}
//       <div className={styles.selectContainer}>
//         <Field
//           component='select'
//           name={name}
//           required={required}
//           multiple={false}
//           className={ClassNamesInput}
//           disabled={disabled}
//           onClick={() => setIsOpen((prev) => !prev)}
//         >
//           <option defaultValue={t(placeholder)} hidden>
//             {t(placeholder)}
//           </option>
//           {(options || []).map((option, index) => {
//             return renderKey ? (
//               <option value={option[renderKey]} key={index}>
//                 {option[renderKey]}
//               </option>
//             ) : (
//               <option value={option.pk ? option.pk : option} key={index}>
//                 {option?.nome ? option.nome : option}
//               </option>
//             );
//           })}
//         </Field>
//         <Button
//           variant='ghost'
//           icon={!isOpen ? <ChevronDown /> : <ChevronUp />}
//           className={styles.selectIcon}
//         />
//       </div>
//       <ErrorMessage component='p' name={name} className={styles.errorMessage} />
//     </div>
//   );
// };

// export default FieldSelect;
