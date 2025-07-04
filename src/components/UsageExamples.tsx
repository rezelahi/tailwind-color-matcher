import CopyToClipboard from "./CopyToClipboard";

interface UsageExamplesProps {
  tailwindClass: string;
}

const UsageExamples = ({ tailwindClass }: UsageExamplesProps) => {
  return (
    <div className="flex flex-col items-center justify-center col-span-2 gap-2">
      <p className="text-sm text-gray-500">Usage Examples</p>
      <CopyToClipboard textToCopy={`bg-${tailwindClass}`} />
      <CopyToClipboard textToCopy={`text-${tailwindClass}`} />
      <CopyToClipboard textToCopy={`border-${tailwindClass}`} />
    </div>
  );
};

export default UsageExamples;
