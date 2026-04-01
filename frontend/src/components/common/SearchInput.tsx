export default function SearchInput({
    value,
    onChange,
    placeholder,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{
                padding: '0.75rem 1rem',
                borderRadius: '14px',
                border: '1px solid var(--border)',
                background: 'var(--panel)',
                color: 'var(--text)',
            }}
        />
    );
}
