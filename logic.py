def honor_points(battle_log:list[dict]) -> int:
    """Calculate honor points every time a battle status is changed"""

    if not battle_log:
        raise ValueError('\nCannot calculate honor points on empty battle_logs\n')

    battle_log = battle_log

    points = 0

    for battle in battle_log:

        if battle['result'] == 'victory':
            points += 5

        elif battle['result'] == 'started':
            points += 2

        else:
            points -= 5

    return points