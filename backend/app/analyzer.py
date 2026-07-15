from zxcvbn import zxcvbn

from app.utils import (
    has_repeated_characters,
    has_sequential_numbers,
    calculate_score
)


def analyze_password(password: str):
    result = zxcvbn(password)

    score = calculate_score(
        password,
        result["score"]
    )

    if score < 20:
        strength = "Very Weak"
    elif score < 40:
        strength = "Weak"
    elif score < 60:
        strength = "Medium"
    elif score < 80:
        strength = "Strong"
    else:
        strength = "Very Strong"

    crack_time = result["crack_times_display"][
        "offline_slow_hashing_1e4_per_second"
    ]

    suggestions = result["feedback"]["suggestions"]

    missing = []

    if len(password) < 12:
        missing.append("Minimum 12 characters")

    if not any(c.isupper() for c in password):
        missing.append("Uppercase letter")

    if not any(c.islower() for c in password):
        missing.append("Lowercase letter")

    if not any(c.isdigit() for c in password):
        missing.append("Number")

    if not any(not c.isalnum() for c in password):
        missing.append("Special character")

    if has_repeated_characters(password):
        missing.append("Avoid repeated characters")

    if has_sequential_numbers(password):
        missing.append("Avoid sequential numbers")

    return {
        "score": score,
        "strength": strength,
        "crack_time": crack_time,
        "missing": missing,
        "suggestions": suggestions
    }