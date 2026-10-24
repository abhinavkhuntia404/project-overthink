"""
Unit tests for PROJECT OVERTHINK Python Forensic Engine
"""

import unittest
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from forensic_analyzer import ForensicLinguisticAnalyzer, select_iconic_meme
from gemini_engine import ForensicGeminiEngine


class TestForensicEngine(unittest.TestCase):
    def test_abrupt_period_detection(self):
        metrics = ForensicLinguisticAnalyzer.calculate_metrics("Okay.")
        self.assertTrue(metrics["hasAbruptPeriod"])
        self.assertTrue(metrics["isMonosyllabic"])
        self.assertGreater(metrics["overthinkingIndex"], 70)

    def test_distortion_catastrophizing(self):
        metrics = ForensicLinguisticAnalyzer.calculate_metrics(
            "They said no.",
            concerns="My career is ruined, everyone hates me forever."
        )
        distortions = [d["distortion"] for d in metrics["distortions"]]
        self.assertIn("catastrophizing", distortions)

    def test_meme_selection_workplace(self):
        meme = select_iconic_meme("Quick sync tomorrow with the VP")
        self.assertEqual(meme["id"], "anakin_padme")

    def test_meme_selection_waiting(self):
        meme = select_iconic_meme("Seen at 2:15 PM", "No reply for 6 hours")
        self.assertEqual(meme["id"], "waiting_skeleton")

    def test_gemini_engine_fallback(self):
        engine = ForensicGeminiEngine()
        data, is_live_ai, engine_name = engine.analyze_investigation("Sounds good.", "Colleague reply")
        self.assertIn("interpretations", data)
        self.assertEqual(len(data["interpretations"]), 5)
        self.assertIn("optimistic", data["interpretations"])
        self.assertIn("neutral", data["interpretations"])
        self.assertIn("pessimistic", data["interpretations"])
        self.assertIn("unexpected", data["interpretations"])
        self.assertIn("evidenceBased", data["interpretations"])
        self.assertIn("meme", data)
        self.assertIn("pythonForensics", data)


if __name__ == "__main__":
    unittest.main()
