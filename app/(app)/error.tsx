"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-red-600">Something went wrong</h2>
      <p className="text-sm text-muted-foreground">
        {error.message || "Unknown error"}
      </p>
      <button className="border px-3 py-2 rounded-md" onClick={reset}>
        Retry
      </button>
    </div>
  );
}
