import ColorPreview from "./ColorPreview";
import UsageExamples from "./UsageExamples";

interface ColorMatchResultProps {
  result: {
    name: string;
    shade: string | null;
    hex: string;
    tailwindClass: string;
  };
  inputColor: string;
}

const ColorMatchResult = ({ result, inputColor }: ColorMatchResultProps) => {
  return (
    <div className="mt-6 space-y-4 text-black">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-800">Closest Match</h2>
        <ColorPreview inputColor={inputColor} outputColor={result.hex} />
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
            <p className="font-mono font-medium">{result.tailwindClass}</p>
          </div>
          <UsageExamples tailwindClass={result.tailwindClass} />
        </div>
      </div>
    </div>
  );
};

export default ColorMatchResult;
