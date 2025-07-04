import { useState } from "react";
import {
  findNearestTailwindColor,
  isValidHexColor,
} from "./utils/colorMatcher";
import ColorInput from "./components/ColorInput";
import ColorMatchResult from "./components/ColorMatchResult";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Note from "./components/Note";
import Silk from "./components/Silk";

function App() {
  const [hexInput, setHexInput] = useState("#e9ecef"); // Default to Tailwind blue-500
  const [result, setResult] = useState<{
    name: string;
    shade: string | null;
    hex: string;
    tailwindClass: string;
  } | null>(() => findNearestTailwindColor("#e9ecef"));

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

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 text-black w-full overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Silk
          colorLeft={hexInput}
          colorRight={result ? result.hex : hexInput}
        />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <Header />

        <ColorInput
          hexInput={hexInput}
          onHexInputChange={setHexInput}
          onSubmit={handleSubmit}
          error={error}
          onErrorClear={() => setError(null)}
        />

        {result && <ColorMatchResult result={result} inputColor={hexInput} />}

        <Note />
      </div>
      <Footer />
    </div>
  );
}

export default App;
