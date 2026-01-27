
'use client';

import React, { useMemo } from 'react';

export type QuickSelectPreset = {
  make: string;
  model: string;
  badge: string;
  label: string;
};

type QuickSelectButtonsProps = {
  onSelect: (make: string, model: string, badge: string) => void;
  presets?: QuickSelectPreset[];
};

const DEFAULT_PRESETS: QuickSelectPreset[] = [
  { make: 'tesla', model: 'Model 3', badge: 'Performance', label: 'Tesla Model 3' },
  { make: 'ford', model: 'Ranger', badge: 'Raptor', label: 'Ford Ranger' },
];

function presetKey(preset: QuickSelectPreset) {
  return `${preset.make}:${preset.model}:${preset.badge}`;
}

export function QuickSelectButtons({ onSelect, presets = DEFAULT_PRESETS }: QuickSelectButtonsProps) {
  const presetByKey = useMemo(() => {
    const map = new Map<string, QuickSelectPreset>();
    for (const preset of presets) map.set(presetKey(preset), preset);
    return map;
  }, [presets]);

  function handlePresetClick(e: React.MouseEvent<HTMLButtonElement>) {
    const key = e.currentTarget.dataset.presetKey;
    if (!key) return;
    const preset = presetByKey.get(key);
    if (!preset) return;
    onSelect(preset.make, preset.model, preset.badge);
  }

  return (
    <div className="pills">
      {presets.map((preset) => (
        <button
          key={presetKey(preset)}
          data-preset-key={presetKey(preset)}
          className="btn"
          type="button"
          onClick={handlePresetClick}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}
