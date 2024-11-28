import React from 'react';

interface Props {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export default function Button({ label = '', onClick, className }: Props) {
  return (
    <button onClick={onClick} className={`${className} button`}>
      {label}
    </button>
  );
}
