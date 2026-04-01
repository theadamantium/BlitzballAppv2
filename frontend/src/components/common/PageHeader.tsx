export default function PageHeader({
    title,
    subtitle,
}: {
    title: string;
    subtitle?: string;
}) {
    return (
        <div style={{ marginBottom: '1.25rem' }}>
            <h1 style={{ marginBottom: '0.35rem' }}>{title}</h1>
            {subtitle ? (
                <p style={{ margin: 0, color: 'var(--muted)' }}>{subtitle}</p>
            ) : null}
        </div>
    );
}