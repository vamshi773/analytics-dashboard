"use client";

import { Input } from "@/components/ui/input";
import { useFilterStore } from "@/store/filterStore";
import DateRangePicker from "./DateRangePicker";

export default function FilterBar() {
  const { search, setSearch, setRangeDays, rangeDays } = useFilterStore();

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between border p-3 rounded-lg">
      {/* Presets */}
      <div className="flex gap-2 flex-wrap">
        {[1, 7, 30].map((d) => (
          <button
            key={d}
            className={`px-3 py-2 border rounded-md text-sm ${
              rangeDays === d ? "bg-accent" : ""
            }`}
            onClick={() => setRangeDays(d)}
          >
            {d === 1 ? "Today" : `Last ${d} days`}
          </button>
        ))}
      </div>

      {/* Search + Calendar */}
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <Input
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:w-64"
        />
        <div className="w-full sm:w-auto">
          <DateRangePicker onSelect={(d) => setRangeDays(d)} />
        </div>
      </div>
    </div>
  );
}
