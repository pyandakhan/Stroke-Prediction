export function DetailItem({ label, value }) {
  return (
    <p className="text-gray-700">
      <span className="font-semibold">{label}:</span> {value}
    </p>
  );
}
