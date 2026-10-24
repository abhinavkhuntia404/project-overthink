"""
PROJECT OVERTHINK — Python Forensic Linguistic & Cognitive Analysis Engine
Analyzes messages, emails, silence intervals, and text snippets to quantify
overthinking severity, cognitive distortions, and subtext dissonance.
"""

import re
import math
from typing import Dict, List, Any, Optional

# Cognitive Distortion Signatures in Overthinking
DISTORTION_SIGNATURES = {
    "catastrophizing": [
        "hate", "fired", "ruined", "never", "forever", "worst", "disaster", 
        "ended", "cut off", "blocking", "destroy", "humiliated"
    ],
    "mind_reading": [
        "they think", "they must feel", "they probably", "secretly", 
        "guaranteed they", "they resent", "judging me", "tired of me"
    ],
    "fortune_telling": [
        "going to leave", "will fire", "never talk again", "it's over", 
        "will ghost", "tomorrow will be terrible"
    ],
    "personalization": [
        "my fault", "because of what I said", "they saw me", 
        "I ruined", "shouldn't have sent", "I'm embarrassing"
    ],
    "polarized_thinking": [
        "always", "never", "everyone", "nobody", "completely", 
        "total failure", "100%", "zero"
    ]
}

# Curated Iconic Overthinker Memes
ICONIC_MEMES = [
    {
        "id": "expanding_brain",
        "url": "/memes/expanding_brain.jpg",
        "category": "3am_spiral",
        "title": "The Overthinker Ascending",
        "defaultCaption": "Stage 1: Read message. Stage 4: Solve quantum mechanics to explain the missing emoji."
    },
    {
        "id": "two_buttons",
        "url": "/memes/two_buttons.jpg",
        "category": "texting_panic",
        "title": "The Binary Torment",
        "defaultCaption": 'Sweating between "They are busy at work" vs "They are planning my social execution".'
    },
    {
        "id": "woman_yelling_cat",
        "url": "/memes/woman_yelling_cat.jpg",
        "category": "texting_panic",
        "title": "The Cross-Examination",
        "defaultCaption": "Your anxiety screaming accusations while their phone sits quietly on the kitchen counter."
    },
    {
        "id": "waiting_skeleton",
        "url": "/memes/waiting_skeleton.jpg",
        "category": "texting_panic",
        "title": "Waiting for Reply",
        "defaultCaption": "Still waiting for them to finish typing that 3-dot bubble from 2024."
    },
    {
        "id": "anakin_padme",
        "url": "/memes/anakin_padme.png",
        "category": "workplace",
        "title": "For Good News, Right?",
        "defaultCaption": '"Quick sync at 9 AM tomorrow." — "To give me a raise, right?" ... "Right?"'
    },
    {
        "id": "sad_pablo",
        "url": "/memes/sad_pablo.jpg",
        "category": "existential",
        "title": "The Re-Reading Loop",
        "defaultCaption": "Me sitting in 3 different rooms re-reading the exact same 3-word text."
    },
    {
        "id": "exit_ramp",
        "url": "/memes/exit_ramp.jpg",
        "category": "3am_spiral",
        "title": "The Catastrophic Exit Ramp",
        "defaultCaption": "Straight: Assume positive intent. Sharp Right: Draft your mutual exit speech."
    },
    {
        "id": "uno_draw_25",
        "url": "/memes/uno_draw_25.jpg",
        "category": "3am_spiral",
        "title": "Draw 25 Cards",
        "defaultCaption": "Send a simple clarification OR Draw 25 cards and lose sleep."
    }
]


def select_iconic_meme(message: str, context: str = "") -> Dict[str, Any]:
    """Selects the most comically appropriate meme for the situation."""
    haystack = f"{message} {context}".lower()
    
    if any(k in haystack for k in ["sync", "meeting", "boss", "manager", "touch base", "quick chat", "hr"]):
        return next((m for m in ICONIC_MEMES if m["id"] == "anakin_padme"), ICONIC_MEMES[4])
    
    if any(k in haystack for k in ["read", "seen", "typing", "bubble", "hours", "delivered", "left on"]):
        return next((m for m in ICONIC_MEMES if m["id"] == "waiting_skeleton"), ICONIC_MEMES[3])
    
    if any(k in haystack for k in ["okay", "period", "k", "fine", "cool", "whatever", "sure", "sounds good."]):
        return next((m for m in ICONIC_MEMES if m["id"] == "two_buttons"), ICONIC_MEMES[1])
        
    if any(k in haystack for k in ["hate", "angry", "screaming", "mad", "passive", "aggressive", "weird"]):
        return next((m for m in ICONIC_MEMES if m["id"] == "woman_yelling_cat"), ICONIC_MEMES[2])
        
    if any(k in haystack for k in ["exit", "end it", "quit", "resign", "run away", "never again"]):
        return next((m for m in ICONIC_MEMES if m["id"] == "exit_ramp"), ICONIC_MEMES[6])
        
    return ICONIC_MEMES[0]


class ForensicLinguisticAnalyzer:
    """Calculates scientific, psychological, and comically accurate overthinking metrics."""

    @staticmethod
    def calculate_metrics(message: str, context: str = "", concerns: str = "") -> Dict[str, Any]:
        msg = message.strip()
        ctx = context.strip()
        cnz = concerns.strip()
        combined_text = f"{msg} {ctx} {cnz}".lower()

        # 1. Punctuation Forensic Analysis
        has_abrupt_period = msg.endswith(".") and len(msg.split()) <= 3
        has_ellipsis = "..." in msg
        has_exclamation = "!" in msg
        has_question = "?" in msg
        is_monosyllabic = len(msg.split()) <= 2

        # 2. Cognitive Distortion Detection
        detected_distortions = []
        for distortion, triggers in DISTORTION_SIGNATURES.items():
            matches = [t for t in triggers if t in combined_text]
            if matches:
                detected_distortions.append({
                    "distortion": distortion,
                    "humanLabel": distortion.replace("_", " ").title(),
                    "matchedKeywords": matches,
                    "impact": "High" if len(matches) > 1 else "Moderate"
                })

        # 3. Overthinking Severity Index (0 - 100)
        base_score = 42.0

        # Brevity penalty (the shorter the message, the wilder the projection)
        if len(msg.split()) == 1:
            base_score += 28.0
        elif len(msg.split()) <= 3:
            base_score += 18.0

        if has_abrupt_period:
            base_score += 15.0
        if has_ellipsis:
            base_score += 12.0
        if not has_exclamation and any(w in msg.lower() for w in ["sure", "okay", "fine", "k", "np"]):
            base_score += 14.0

        # Context inflation (length of overthinker's context vs tiny message)
        if len(ctx) > len(msg) * 4:
            base_score += 20.0
        if len(cnz) > 20:
            base_score += 12.0

        # Distortion penalty
        base_score += len(detected_distortions) * 6.0

        severity_index = min(99, max(12, int(base_score)))

        # 4. Probabilistic Reality Matrix
        # Likelihood of Catastrophe vs Likelihood of Mundane Reality
        worst_case_probability = max(3, min(24, int(100 - severity_index * 0.9)))
        benign_reality_probability = 100 - worst_case_probability

        # Grounding Index
        grounding_index = max(15, 100 - int(severity_index * 0.75))

        # 5. Tone Dissonance Vector
        subtext_dissonance = "High" if severity_index > 70 else "Medium" if severity_index > 45 else "Low"

        # 6. Prescribed Reality Directive
        if severity_index > 75:
            directive = "Mandatory Quarantine: Put the smartphone face down, drink water, and do not send a paragraph explaining yourself."
        elif severity_index > 50:
            directive = "Cautionary Hold: Assume positive intent or standard human exhaustion before filing an emotional lawsuit."
        else:
            directive = "Green Light: Evidence indicates normal human communication. Carry on with your day."

        return {
            "overthinkingIndex": severity_index,
            "groundingScore": grounding_index,
            "worstCaseProbability": worst_case_probability,
            "benignRealityProbability": benign_reality_probability,
            "subtextDissonance": subtext_dissonance,
            "hasAbruptPeriod": has_abrupt_period,
            "isMonosyllabic": is_monosyllabic,
            "distortions": detected_distortions,
            "realityDirective": directive,
            "recommendedMeme": select_iconic_meme(msg, ctx)
        }
