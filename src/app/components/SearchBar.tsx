export default function SearchBar({
  value,
  onChange
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search summaries, clauses, or notices..."
      className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-800 bg-white"
    />
  );
}