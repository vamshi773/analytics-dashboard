"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function DateRangePicker({
  onSelect,
}: {
  onSelect: (days: number) => void;
}) {
  const [selected, setSelected] = useState<Date>();

  return (
    <div className="border rounded-md p-2 bg-background shadow">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={(date) => {
          if (!date) return;
          setSelected(date);
          onSelect(1);
        }}
      />
    </div>
  );
}
