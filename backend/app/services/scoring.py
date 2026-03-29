# Weights determine how important a stat is for a specific role
ROLE_WEIGHTS = {
    "goalie": {"catch": 1.0},
    "defense": {"block": 1.0, "attack": 1.0, "pass_stat": 0.5},
    "forward": {"shot": 1.0, "endurance": 1.0, "pass_stat": 0.5, "speed": 0.25},
    "midfield": {"pass_stat": 1.0, "endurance": 0.75, "block": 0.75, "shot": 0.5, "attack": 0.5, "speed": 0.25},
}

def weighted_score(stats: dict, role: str) -> float:
    """Calculates a raw score based on stats and role weights."""
    weights = ROLE_WEIGHTS[role]
    total_weight = sum(weights.values())
    
    # Sum up (Stat Value * Weight) and divide by total weight to get an average
    score = sum(stats.get(field, 0) * weight for field, weight in weights.items())
    return score / total_weight

def percentile_rank(value: float, population: list[float]) -> float:
    """Calculates where a score sits compared to everyone else (0-100)."""
    if not population:
        return 0.0
    below_or_equal = sum(1 for p in population if p <= value)
    return (below_or_equal / len(population)) * 100

def grade_from_percentile(percentile: float) -> str:
    """Returns a simple color-code grade for the UI."""
    if percentile >= 85: return "green"  # Top 15%
    if percentile >= 25: return "yellow" # Mid-range
    return "red"                         # Bottom 25%