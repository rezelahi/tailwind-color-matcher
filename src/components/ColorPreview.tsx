interface ColorPreviewProps {
  inputColor: string;
  outputColor: string;
}

const ColorPreview = ({ inputColor, outputColor }: ColorPreviewProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div
        className="size-10 rounded-lg border border-gray-200"
        style={{ backgroundColor: inputColor }}
        title={`Input: ${inputColor}`}
      />
      <span>→</span>
      <div
        className="size-10 rounded-lg border border-gray-200"
        style={{ backgroundColor: outputColor }}
        title={`Tailwind: ${outputColor}`}
      />
    </div>
  );
};

export default ColorPreview;
