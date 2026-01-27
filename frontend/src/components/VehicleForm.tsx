
'use client';
import { useState } from 'react';
import axios from 'axios';
import { MODELS } from '@/constants/models';
import { Select } from './ui/Select';
import { QuickSelectButtons } from './QuickSelectButtons';

export function VehicleForm() {
  const [make,setMake]=useState('');
  const [model,setModel]=useState('');
  const [badge,setBadge]=useState('');
  const [file,setFile]=useState<File | null>(null);
  const [result,setResult]=useState<unknown>(null);

  const makes = Object.keys(MODELS);
  const models = make ? Object.keys(MODELS[make]) : [];
  const badges = make && model ? MODELS[make][model] : [];

  function handleQuickSelect(selectedMake: string, selectedModel: string, selectedBadge: string) {
    setMake(selectedMake);
    setModel(selectedModel);
    setBadge(selectedBadge);
  }

  function handleMakeChange(nextMake: string) {
    setMake(nextMake);
    setModel('');
    setBadge('');
  }

  function handleModelChange(nextModel: string) {
    setModel(nextModel);
    setBadge('');
  }

  function handleBadgeChange(nextBadge: string) {
    setBadge(nextBadge);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const nextFile = e.target.files?.[0] ?? null;
    setFile(nextFile);
  }

  const selects = [
    { key: 'make', label: 'Make', value: make, options: makes, disabled: false, onChange: handleMakeChange },
    { key: 'model', label: 'Model', value: model, options: models, disabled: !make, onChange: handleModelChange },
    { key: 'badge', label: 'Badge', value: badge, options: badges, disabled: !model, onChange: handleBadgeChange },
  ];

  async function handleSubmit() {
    if (!file) return;

    const fd = new FormData();
    fd.append('make',make);
    fd.append('model',model);
    fd.append('badge',badge);
    fd.append('logbook',file);
    const response = await axios.post('http://localhost:4000/vehicle', fd);
    setResult(response.data);
    setFile(null);
  }

  return (
    <div className="card">
      <div className="header">
        <div>
          <h1 className="h1">Vehicle details</h1>
          <p className="subtle">Choose a make/model/badge, then upload your logbook.</p>
        </div>
      </div>

      <div className="actions">
        <QuickSelectButtons onSelect={handleQuickSelect} />
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        {selects.map((s) => (
          <Select
            key={s.key}
            label={s.label}
            value={s.value}
            options={s.options}
            disabled={s.disabled}
            onChange={s.onChange}
          />
        ))}
      </div>

      <div className="actions actions-submit">
        {badge && (
          <div className="field">
            <label className="label">Logbook file</label>
            <input className="control" type="file" name={`${file}`} accept=".txt" onChange={handleFileChange} />
          </div>
        )}
        <button className="btn btn-primary" disabled={!file} onClick={handleSubmit}>Submit</button>
      </div>

      {result && <pre className="result">{JSON.stringify(result,null,2)}</pre>}
    </div>
  );
}
