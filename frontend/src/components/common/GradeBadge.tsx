export default function GradeBadge({
    grade,
}: {
    grade: 'green' | 'blue' | 'red' | string;
}) {
    return (
        <span className={`grade-badge grade-badge--${grade}`}>
            {grade.toUpperCase()}
        </span>
    );
}