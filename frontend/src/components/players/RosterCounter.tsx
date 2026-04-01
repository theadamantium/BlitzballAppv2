export default function RosterCounter({ count }: { count: number }) {
  return (
    <div className="panel" style={{ padding: '0.85rem 1rem' }}>
      <strong>Roster:</strong> {count} / 12
    </div>
  );
}