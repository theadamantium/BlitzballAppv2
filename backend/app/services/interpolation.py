from math import floor

# These are the fields we need to calculate
STAT_FIELDS = ["hp", "speed", "endurance", "attack", "pass_stat", "block", "shot", "catch"]

def interpolate_value(low_level, low_value, high_level, high_value, target_level):
    """
    Standard Linear Interpolation formula: 
    Finds the value at target_level based on the slope between two points.
    """
    if high_level == low_level:
        return low_value
    
    # Formula: y = y1 + (x - x1) * ((y2 - y1) / (x2 - x1))
    ratio = (target_level - low_level) / (high_level - low_level)
    calculated = low_value + ratio * (high_value - low_value)
    
    return round(calculated)

def estimate_stats(snapshots, target_level):
    """
    Takes a list of stat snapshots for a player and calculates 
    stats for a specific target_level.
    """
    # 1. Sort snapshots by level to ensure we have a proper timeline
    snapshots = sorted(snapshots, key=lambda s: s.level)
    
    # 2. Handle Exact Match (If the user asks for Level 1, 5, 10, etc.)
    for snap in snapshots:
        if snap.level == target_level:
            return {
                "level": target_level,
                "is_exact": True,
                **{field: getattr(snap, field) for field in STAT_FIELDS}
            }
            
    # 3. Handle Out of Bounds (Clamping to the nearest known data point)
    if target_level < snapshots[0].level:
        snap = snapshots[0]
        return {"level": target_level, "is_exact": False, "note": "clamped_low",
                **{field: getattr(snap, field) for field in STAT_FIELDS}}
                
    if target_level > snapshots[-1].level:
        snap = snapshots[-1]
        return {"level": target_level, "is_exact": False, "note": "clamped_high",
                **{field: getattr(snap, field) for field in STAT_FIELDS}}

    # 4. Find the two levels the target falls between
    low = None
    high = None
    for i in range(len(snapshots) - 1):
        if snapshots[i].level < target_level < snapshots[i + 1].level:
            low = snapshots[i]
            high = snapshots[i + 1]
            break

    # 5. Interpolate each field and apply the "Data Quality" fix (99 cap)
    result = {
        "level": target_level,
        "is_exact": False,
        "interpolated_between": [low.level, high.level]
    }
    
    for field in STAT_FIELDS:
        val = interpolate_value(low.level, getattr(low, field), high.level, getattr(high, field), target_level)
        
        # Strategy: Correct non-HP outliers by capping them at 99
        if field != "hp" and val > 99:
            val = 99
            
        result[field] = val
        
    return result