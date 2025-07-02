import { useState } from "react";
import {
  findNearestTailwindColor,
  isValidHexColor,
} from "./utils/colorMatcher";
import CopyToClipboard from "./components/CopyToClipboard";
import Footer from "./components/Footer";
import Silk from "./components/Silk";

function App() {
  const [hexInput, setHexInput] = useState("#3b82f6"); // Default to Tailwind blue-500
  const [result, setResult] = useState<{
    name: string;
    shade: string | null;
    hex: string;
    tailwindClass: string;
  } | null>(() => findNearestTailwindColor("#3b82f6"));

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidHexColor(hexInput)) {
      setError("Please enter a valid hex color (e.g. #3b82f6)");
      setResult(null);
      return;
    }

    try {
      const match = findNearestTailwindColor(hexInput);
      setResult(match);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid color format");
      setResult(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^#[0-9A-Fa-f]{0,6}$/i.test(value)) {
      setHexInput(value);
      setError(null);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 text-black w-full overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Silk color="#ffffff"/>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Tailwind Color Matcher
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Find the closest Tailwind CSS color for any hex value
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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

        {result && (
          <div className="mt-6 space-y-4 text-black">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-800">
                Closest Match
              </h2>
              <div className="flex items-center space-x-2">
                <div
                  className="size-10 rounded-lg border border-gray-200"
                  style={{ backgroundColor: hexInput }}
                  title={`Input: ${hexInput}`}
                />
                <span>→</span>
                <div
                  className="size-10 rounded-lg border border-gray-200"
                  style={{ backgroundColor: result.hex }}
                  title={`Tailwind: ${result.hex}`}
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-sm text-gray-500">Color</p>
                  <p className="font-medium">
                    {result.name}
                    {result.shade && `-${result.shade}`}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-sm text-gray-500">Hex</p>
                  <p className="font-mono font-medium">{result.hex}</p>
                </div>
                <div className="flex flex-col items-center justify-center col-span-2">
                  <p className="text-sm text-gray-500">Tailwind Class</p>
                  <p className="font-mono font-medium">
                    {result.tailwindClass}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center col-span-2 gap-2">
                  <p className="text-sm text-gray-500">Usage Examples</p>
                  <CopyToClipboard textToCopy={`bg-${result.tailwindClass}`} />
                  <CopyToClipboard
                    textToCopy={`text-${result.tailwindClass}`}
                  />
                  <CopyToClipboard
                    textToCopy={`border-${result.tailwindClass}`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Note: Matches Tailwind CSS v3.0+ default color palette. Black and
            white are special cases without shades.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
