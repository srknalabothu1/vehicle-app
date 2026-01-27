
'use client';

import React from 'react';

type SelectProps = {
  label: string;
  value: string;
  options: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
};

export function Select({ label, value, options, disabled = false, onChange }: SelectProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value);
  }

  return (
    <div className="field">
      <label className="label">{label}</label>
      <select className="control" value={value} disabled={disabled} onChange={handleChange}>
        <option value="">Select {label}</option>
        {options.map((o: string) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
