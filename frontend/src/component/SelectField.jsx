export function SelectField({ id, label, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
    </div>
  );
}
