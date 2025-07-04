interface ColorInputProps {
  hexInput: string;
  onHexInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
  onErrorClear: () => void;
}

const ColorInput = ({
  hexInput,
  onHexInputChange,
  onSubmit,
  error,
  onErrorClear,
}: ColorInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^#[0-9A-Fa-f]{0,6}$/i.test(value)) {
      onHexInputChange(value);
      onErrorClear();
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="hex"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Enter Hex Color
        </label>
        <div className="flex gap-4">
          <input
            type="text"
            id="hex"
            value={hexInput}
            onChange={handleInputChange}
            placeholder="#RRGGBB"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
            pattern="#[0-9A-Fa-f]{6}"
            title="Enter a valid hex color (e.g. #3b82f6)"
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none"
          >
            Match
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </form>
  );
};

export default ColorInput;
