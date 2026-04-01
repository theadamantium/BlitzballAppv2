export default function EmptyState({
    title,
    body,
}: {
    title: string;
    body: string;
}) {
    return (
        <div className="panel empty-state">
            <h3>{title}</h3>
            <p>{body}</p>
        </div>
    );
}