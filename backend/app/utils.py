def has_repeated_characters(password: str) -> bool:
    if not password:
        return False

    return len(set(password)) <= 2


def has_sequential_numbers(password: str) -> bool:
    sequences = [
        "0123456789",
        "123456789",
        "987654321",
        "9876543210"
    ]

    for sequence in sequences:
        if password in sequence and len(password) >= 4:
            return True

    return False
def calculate_score(password: str, zxcvbn_score: int) -> int:
    score = 0

    # Length
    if len(password) >= 8:
        score += 10

    if len(password) >= 12:
        score += 10

    if len(password) >= 16:
        score += 10

    # Character diversity
    if any(c.islower() for c in password):
        score += 10

    if any(c.isupper() for c in password):
        score += 10

    if any(c.isdigit() for c in password):
        score += 10

    if any(not c.isalnum() for c in password):
        score += 15

    # zxcvbn intelligence score
    score += zxcvbn_score * 6

    # Penalties
    if has_repeated_characters(password):
        score -= 15

    if has_sequential_numbers(password):
        score -= 15

    return max(0, min(score, 100))