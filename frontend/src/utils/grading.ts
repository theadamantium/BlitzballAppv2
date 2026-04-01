export function getGradeFromPercentile(percentile: number): 'green' | 'blue' | 'red' {
  if (percentile >= 85) return 'green';
  if (percentile < 25) return 'red';
  return 'blue';
}