import { Check, Copy } from "lucide-react";
import { useState } from "react";
import SplitText from "./SplitText";

const CopyToClipboard = ({ textToCopy }: { textToCopy: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="w-50 flex justify-between bg-inherit gap-4 flex-1">
      <SplitText
        key={textToCopy}
        text={textToCopy}
        className="text-gray-800 text-sm font-mono font-medium"
        splitType="chars"
        delay={50}
        duration={0.3}
        from={{ opacity: 0, y: 20 }}
        to={{ opacity: 1, y: 0 }}
        textAlign="left"
      />
      <button
        onClick={handleCopy}
        className="bg-gray-400 hover:bg-gray-700 text-white p-1 rounded-sm flex items-center"
        aria-label="Copy to clipboard"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};

export default CopyToClipboard;
