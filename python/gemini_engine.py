"""
PROJECT OVERTHINK — Python Gemini AI Integration Engine
Uses official Google GenAI Python SDK (`google-genai`) to generate
forensic message interpretations and courtroom trials.
"""

import os
import json
import logging
from typing import Dict, Any, Tuple
from dotenv import load_dotenv

from forensic_analyzer import ForensicLinguisticAnalyzer, select_iconic_meme

# Load environment variables
load_dotenv()

logger = logging.getLogger("ForensicGeminiEngine")

SYSTEM_INVESTIGATION_PROMPT = """
You are the Chief Forensic Linguistic Investigator at PROJECT OVERTHINK.
Your mandate is to examine short, ambiguous, dry, or anxious communications submitted by overthinking humans.

You MUST produce a JSON response with exactly the following structure:
{
  "title": "A witty forensic case title, e.g. The Case of the Solitary Full Stop",
  "interpretations": {
    "optimistic": {
      "title": "Positive/Harmless view",
      "text": "Specific, sensible, optimistic explanation.",
      "plausibility": "Plausible / 85%"
    },
    "neutral": {
      "title": "Boring mundane reality",
      "text": "The completely unexciting reality of being busy or distracted.",
      "plausibility": "Extremely Likely / 90%"
    },
    "pessimistic": {
      "title": "The Overthinker's Nightmare",
      "text": "The absurd worst-case scenario that anxiety concocts.",
      "plausibility": "Highly Improbable / 12%"
    },
    "unexpected": {
      "title": "Left-field curveball",
      "text": "An amusingly plausible alternative scenario.",
      "plausibility": "Unlikely but hilarious / 35%"
    },
    "evidenceBased": {
      "title": "Strict Physical Evidence",
      "text": "What the characters and timestamps actually prove, stripping all emotion.",
      "plausibility": "Objective Fact / 99%"
    }
  },
  "knownFacts": ["List of strictly verifiable facts from the input"],
  "assumptions": ["List of assumptions the user is projecting into the situation"],
  "unknowns": ["List of critical missing details"],
  "evidenceTakeaway": "A clear, funny, grounding one-sentence conclusion.",
  "suggestedResponses": [
    { "tone": "Balanced & Lighthearted", "text": "A calm, non-needy response" },
    { "tone": "Unbothered Professional", "text": "A brief, grounded acknowledgement" },
    { "tone": "Do Nothing (Quarantine)", "text": "Put the phone face down for 3 hours." }
  ],
  "realityCheck": {
    "groundingScore": 75,
    "realityScore": 82,
    "takeaway": "Grounded reality summary",
    "nextAction": {
      "headline": "Step Away From The Screen",
      "suggestion": "Do not follow up asking if they are mad.",
      "proportionateAction": "Treat as resolved."
    }
  }
}
"""

SYSTEM_COURTROOM_PROMPT = """
You are the Presiding Judicial AI in the High Judicial Court of Speculation at PROJECT OVERTHINK.
The user's anxiety is putting an ambiguous message or situation on trial.

You MUST produce a JSON response with exactly the following structure:
{
  "prosecution": {
    "indictment": "Dramatic official indictment header",
    "arguments": [
      "Argument 1 arguing malice, passive-aggression, or imminent disaster",
      "Argument 2 claiming the punctuation is an act of war",
      "Argument 3 claiming this means they secretly hate the user"
    ],
    "notes": "Humorous scribble note from the prosecuting anxiety attorney"
  },
  "defence": {
    "motion": "Defence counter-motion headline",
    "arguments": [
      "Point 1 highlighting basic human tiredness or rushing",
      "Point 2 pointing out zero evidence of anger",
      "Point 3 pointing out people do not obsess over texts the way the user does"
    ],
    "notes": "Grounded common sense rebuttal"
  },
  "verdict": {
    "title": "NOT ENOUGH EVIDENCE / ACQUITTED ON ALL CHARGES",
    "summary": "The court's formal, hilariously grounding judgment.",
    "annotation": "Handwritten judicial marginalia scribble"
  },
  "thoughtSpiralSteps": [
    { "label": "Stage 1 • The Input", "text": "Raw message received" },
    { "label": "Stage 2 • The Gap", "text": "Seconds turn into silent torment" },
    { "label": "Stage 3 • Speculation", "text": "Anxiety begins fabricating motive" },
    { "label": "Stage 4 • Catastrophe", "text": "Drafting emergency apologies" },
    { "label": "Stage 5 • Judicial Grounding", "text": "Case dismissed for lack of evidence" }
  ],
  "nextStep": {
    "headline": "Sentence: 20 Minutes Without Screen Time",
    "suggestion": "Close the chat, put phone across the room, take a breath.",
    "proportionateAction": "Close case docket."
  }
}
"""


class ForensicGeminiEngine:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY", "").strip()
        self.model_name = os.getenv("GEMINI_MODEL", "gemini-3.8-flash").strip()
        self.client = None
        
        if self.api_key and self.api_key != "your_gemini_api_key_here":
            try:
                from google import genai
                self.client = genai.Client(api_key=self.api_key)
                logger.info(f"Gemini Python Client initialized with model {self.model_name}")
            except Exception as e:
                logger.error(f"Failed to initialize Gemini Client: {e}")
                self.client = None

    def is_configured(self) -> bool:
        return self.client is not None

    def analyze_investigation(self, message: str, context: str = "", concerns: str = "") -> Tuple[Dict[str, Any], bool, str]:
        """Runs live Gemini AI analysis or falls back to calibrated heuristics."""
        metrics = ForensicLinguisticAnalyzer.calculate_metrics(message, context, concerns)
        
        if self.is_configured():
            try:
                from google.genai import types
                prompt = f"""
MESSAGE ON TRIAL: "{message}"
SUPPLIED CONTEXT: "{context}"
USER ANXIETIES/CONCERNS: "{concerns}"

FORENSIC METRICS:
- Overthinking Index: {metrics['overthinkingIndex']}%
- Brevity Factor: {'Monosyllabic/Short' if metrics['isMonosyllabic'] else 'Extended'}
- Detected Distortions: {[d['distortion'] for d in metrics['distortions']]}

Perform forensic analysis and respond strictly in valid JSON matching the requested schema.
"""
                response = self.client.models.generate_content(
                    model=self.model_name,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        system_instruction=SYSTEM_INVESTIGATION_PROMPT,
                        response_mime_type="application/json",
                        temperature=0.7,
                    )
                )
                
                parsed = json.loads(response.text)
                parsed["meme"] = metrics["recommendedMeme"]
                parsed["pythonForensics"] = metrics
                return parsed, True, f"Google Gemini ({self.model_name}) + Python Forensics"
            except Exception as e:
                logger.warning(f"Live Gemini invocation failed, activating Python fallback: {e}")

        # Fallback Calibrated Heuristic Engine
        fallback_data = self._generate_heuristic_investigation(message, context, concerns, metrics)
        return fallback_data, False, "Python Calibrated Heuristic Engine"

    def analyze_courtroom(self, case_data: Dict[str, Any]) -> Tuple[Dict[str, Any], bool, str]:
        """Runs live Gemini AI courtroom trial or falls back to calibrated heuristics."""
        message = case_data.get("message") or case_data.get("original_message") or ""
        context = case_data.get("context", "")
        concerns = case_data.get("concerns", "")
        metrics = ForensicLinguisticAnalyzer.calculate_metrics(message, context, concerns)

        if self.is_configured():
            try:
                from google.genai import types
                prompt = f"""
EXHIBIT A (MESSAGE): "{message}"
CONTEXT: "{context}"
ANXIETY CONCERNS: "{concerns}"
OVERTHINKING SCORE: {metrics['overthinkingIndex']}%

Hold trial in the High Judicial Court of Speculation and return strictly valid JSON according to schema.
"""
                response = self.client.models.generate_content(
                    model=self.model_name,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        system_instruction=SYSTEM_COURTROOM_PROMPT,
                        response_mime_type="application/json",
                        temperature=0.7,
                    )
                )
                
                parsed = json.loads(response.text)
                parsed["meme"] = metrics["recommendedMeme"]
                parsed["pythonForensics"] = metrics
                return parsed, True, f"Google Gemini ({self.model_name}) + Python Judiciary"
            except Exception as e:
                logger.warning(f"Live Gemini Courtroom invocation failed, activating fallback: {e}")

        # Fallback Courtroom Generation
        fallback_court = self._generate_heuristic_courtroom(message, context, metrics)
        return fallback_court, False, "Python Calibrated Judicial Engine"

    def _generate_heuristic_investigation(self, msg: str, ctx: str, cnz: str, metrics: Dict[str, Any]) -> Dict[str, Any]:
        """Generates rich, funny, accurate forensic analysis without external API."""
        distortions_str = ", ".join([d["humanLabel"] for d in metrics["distortions"]]) or "Over-Scrutiny"
        
        return {
            "title": f'The Case of "{msg[:24]}..."',
            "interpretations": {
                "optimistic": {
                    "title": "Efficient Acknowledgement",
                    "text": "The sender read your message, comprehended it fully, and replied with prompt conciseness without wasting energy on decorative emojis.",
                    "plausibility": "High / 80%"
                },
                "neutral": {
                    "title": "Everyday Distraction",
                    "text": "They typed this between two meetings, walking to get coffee, or holding groceries. Tone was not calibrated because tone was not on their mind.",
                    "plausibility": "Very Likely / 90%"
                },
                "pessimistic": {
                    "title": "The Spiral Scenario",
                    "text": f"Every syllable was chosen to inflict maximum ambiguity. Notice the absence of exclamation points? That's an emotional missile.",
                    "plausibility": f"Improbable / {metrics['worstCaseProbability']}%"
                },
                "unexpected": {
                    "title": "The Autocorrect Mishap",
                    "text": "They meant to type a longer response, their phone screen timed out, and they assume the conversation is proceeding swimmingly.",
                    "plausibility": "Possible / 45%"
                },
                "evidenceBased": {
                    "title": "Physical Reality Audit",
                    "text": f'The evidence consists strictly of: "{msg}". Zero angry emoji, zero accusations, zero subpoenas. The rest is your creative writing.',
                    "plausibility": "Objective Fact / 99%"
                }
            },
            "knownFacts": [
                f'Message received was: "{msg}".',
                f'Length of evidence: {len(msg.split())} word(s).',
                "No physical injury or declared hostility occurred."
            ],
            "assumptions": [
                "Assuming silence or brevity equals disapproval.",
                f"Cognitive distortions in play: {distortions_str}.",
                "Assuming the sender spent as much time crafting the text as you spent analyzing it."
            ],
            "unknowns": [
                "What the sender was physically doing at that exact second.",
                "Whether their battery was at 2%.",
                "Whether they even remember sending it right now."
            ],
            "evidenceTakeaway": f"Your anxiety wrote a 10-act play out of a {len(msg.split())}-word text message.",
            "suggestedResponses": [
                { "tone": "Light & Easy", "text": "Sounds good! Talk soon." },
                { "tone": "Neutral Acknowledgment", "text": "Got it, thanks!" },
                { "tone": "Strategic Silence", "text": "Do not reply. The conversation is complete." }
            ],
            "realityCheck": {
                "groundingScore": metrics["groundingScore"],
                "realityScore": metrics["benignRealityProbability"],
                "takeaway": "Lack of exuberance is not evidence of hostility.",
                "nextAction": {
                    "headline": "Close Chat Application",
                    "suggestion": metrics["realityDirective"],
                    "proportionateAction": "Treat as settled business."
                }
            },
            "meme": metrics["recommendedMeme"],
            "pythonForensics": metrics
        }

    def _generate_heuristic_courtroom(self, msg: str, ctx: str, metrics: Dict[str, Any]) -> Dict[str, Any]:
        """Generates judicial courtroom proceedings using Python heuristic engine."""
        return {
            "prosecution": {
                "indictment": f'Indictment for Cold Brevity in "{msg}"',
                "arguments": [
                    f'The defendant sent: "{msg}". Notice the complete absence of warmth or enthusiastic punctuation.',
                    "The prosecution posits that anyone who loved humanity would have added at least one exclamation point or smiley.",
                    "Circumstantial evidence proves the sender must be secretly irritated by previous communications."
                ],
                "notes": "Prosecution demands the court authorize 14 immediate re-readings of this text."
            },
            "defence": {
                "motion": "Motion to Dismiss Based on Human Reality",
                "arguments": [
                    "Point 1: People frequently type while walking, chewing, or being interrupted by life.",
                    f'Point 2: The message "{msg}" contains zero insults, zero hostile verbs, and zero malice.',
                    "Point 3: The plaintiff's anxiety has zero physical witnesses and is currently hallucinating emotional subtext."
                ],
                "notes": "Struck from the record: All claims that 'they hate you forever'."
            },
            "verdict": {
                "title": "DISMISSED: INSUFFICIENT EVIDENCE OF HOSTILITY",
                "summary": "The court finds that brevity is not a crime. The evidence proves only that someone sent a text message, not that they are plotting your downfall.",
                "annotation": "Your anxiety is held in contempt of court for wasting judicial resources on normal communications."
            },
            "thoughtSpiralSteps": [
                { "label": "Stage 1 • Ping", "text": f'Notification arrives: "{msg}"' },
                { "label": "Stage 2 • Scrutiny", "text": "Why only these words? Where are the exclamation marks?" },
                { "label": "Stage 3 • Mind Reading", "text": "They must have taken my last message the wrong way." },
                { "label": "Stage 4 • Catastrophe", "text": "Drafting a 3-paragraph explanation or exit speech." },
                { "label": "Stage 5 • Reality Court", "text": "Verdict: Acquitted. They were just eating lunch." }
            ],
            "nextStep": {
                "headline": "Sentence: Step Away From The Screen",
                "suggestion": "Do not follow up asking if everything is okay.",
                "proportionateAction": "Docket closed."
            },
            "meme": metrics["recommendedMeme"],
            "pythonForensics": metrics
        }
