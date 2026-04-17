export default function LoadingSpinner({ message = 'Loading friends…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      {/* Ring spinner */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
        <div
          className="absolute inset-0 rounded-full border-4 border-[#2d5a4e]
                     border-t-transparent animate-spin-fast"
        />
      </div>
      <p className="text-sm text-gray-400 font-medium">{message}</p>
    </div>
  );
}
