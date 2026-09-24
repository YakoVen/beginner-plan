import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-3xl font-bold mb-2">Page introuvable</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="px-6 py-3 border border-black rounded-xl hover:bg-black hover:text-white transition-colors"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
