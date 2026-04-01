export default function StatusBadge({ label }: { label: string }) {
    return (
        <span className="grade-badge grade-badge--blue">{label}</span>
    );
}