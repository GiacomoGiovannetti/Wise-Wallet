// // import { ErrorMessage, Field } from 'formik'
// import styles from './FieldInputChoice.module.sass';

// interface Props {
//   type: 'radio' | 'checkbox';
//   name: string;
//   options?: string[];
//   label?: string;
//   formikValues?: any;
//   isGroup?: boolean;
//   groupLabel?: string;
//   required?: boolean;
//   labelClassName?: string;
//   className?: string;
//   titolo?: string;
//   showTextUnderTitle?: boolean;
//   disabled?: boolean;
// }

// const InputCheckedIcon = ({ type }: { type: Props['type'] }) => {
//   switch (type) {
//     case 'checkbox':
//       return <CheckboxMarked className={styles.inputCheckboxIcon} />;
//     case 'radio':
//       return <RadioMarked className={styles.inputRadioIcon} />;
//   }
// };

// const InputUncheckedIcon = ({ type }: { type: Props['type'] }) => {
//   switch (type) {
//     case 'checkbox':
//       return <CheckboxUnmarked className={styles.inputCheckboxIcon} />;
//     case 'radio':
//       return <RadioUnmarked className={styles.inputRadioIcon} />;
//   }
// };

// const FieldInputChoice = (props: Props) => {
//   const {
//     type,
//     name,
//     isGroup = false,
//     options,
//     label,
//     formikValues,
//     groupLabel,
//     required = false,
//     labelClassName,
//     className = '',
//     titolo = '',
//     showTextUnderTitle = true,
//     disabled = false,
//   } = props;

//   const t = useTrans();

//   const isSelected = (value: string | number) => {
//     if (type === 'radio') {
//       return formikValues.values[name] === value + '';
//     } else if (type === 'checkbox') {
//       return (
//         Array.isArray(formikValues.values[name]) &&
//         formikValues.values[name].includes(value + '')
//       );
//     }
//     return false;
//   };

//   const InputChoiceGroup = () => {
//     return (
//       <div className={styles.fieldContainer}>
//         <label className={styles.groupLabel}>
//           {t(groupLabel)}
//           {required ? '*' : null}
//         </label>
//         {showTextUnderTitle && (
//           <EditableTitle
//             variant='p'
//             title={
//               type == 'checkbox'
//                 ? t('Puoi selezionare uno o più campi di interesse')
//                 : t('Seleziona un solo campo di interesse')
//             }
//             className={styles.groupInfo}
//           />
//         )}
//         <div className={styles.groupContainer}>
//           {options.map((option) => {
//             return (
//               <div className={styles.inputGroupContainer} key={option.pk}>
//                 <label className={styles.inputGroupLabel}>{option.nome}</label>
//                 {option.children.map((interesse) => {
//                   return (
//                     <div className={styles.inputContainer} key={interesse.pk}>
//                       <label className={styles.inputLabel}>
//                         <div>
//                           <Field
//                             type={type}
//                             name={name}
//                             value={interesse.pk}
//                             required={required}
//                             disabled={disabled}
//                           />
//                           {isSelected(interesse.pk) ? (
//                             <InputCheckedIcon type={type} />
//                           ) : (
//                             <InputUncheckedIcon type={type} />
//                           )}
//                         </div>
//                         {interesse.nome}
//                       </label>
//                     </div>
//                   );
//                 })}
//               </div>
//             );
//           })}
//           <ErrorMessage
//             name={name}
//             component='p'
//             className={styles.errorMessage}
//           />
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className={`${styles.root} ${className}`}>
//       {isGroup ? (
//         <InputChoiceGroup />
//       ) : (
//         <>
//           <span
//             className={`${styles.titolo} ${disabled ? styles.disabled : ''}`}
//           >
//             {titolo} {required ? '*' : null}
//           </span>
//           <div className={styles.inputContainer}>
//             <div className={styles.iconContainer}>
//               <Field
//                 type={type}
//                 name={name}
//                 required={required}
//                 disabled={disabled}
//               />
//               {formikValues.values[name] ? (
//                 <InputCheckedIcon type={type} />
//               ) : (
//                 <InputUncheckedIcon type={type} />
//               )}
//             </div>
//             <label
//               className={`{${styles.inputLabel} ${
//                 disabled ? styles.disabled : ''
//               }`}
//             >
//               {t(label)}
//             </label>
//           </div>
//           <ErrorMessage
//             name={name}
//             component='p'
//             className={styles.errorMessage}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default FieldInputChoice;
