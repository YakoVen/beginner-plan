"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h1 className="text-2xl font-bold mb-2">Une erreur est survenue</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Quelque chose s&apos;est mal passé. Veuillez réessayer.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 border border-black rounded-xl hover:bg-black hover:text-white transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
}
