export default function TeamBuilderControls({ onClear }: { onClear: () => void }) {
  return (
    <div className="controls-row">
      <button onClick={onClear}>Clear Roster & Assignments</button>
    </div>
  );
}