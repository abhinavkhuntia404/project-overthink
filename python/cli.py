#!/usr/bin/env python3
"""
PROJECT OVERTHINK — Python Forensic Engine CLI & IPC Bridge
Provides CLI commands and JSON standard I/O communication for Node.js backend.
"""

import sys
import json
import argparse
import os

# Ensure current directory is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from forensic_analyzer import ForensicLinguisticAnalyzer
from gemini_engine import ForensicGeminiEngine


def main():
    parser = argparse.ArgumentParser(description="PROJECT OVERTHINK Python Forensic AI Engine")
    parser.add_argument("--action", choices=["investigate", "courtroom", "metrics", "health"], default="investigate")
    parser.add_argument("--input", type=str, help="JSON input string or text")
    parser.add_argument("--stdin", action="store_true", help="Read input JSON from stdin")
    
    args = parser.parse_args()
    engine = ForensicGeminiEngine()

    if args.action == "health":
        print(json.dumps({
            "status": "ok",
            "runtime": "Python 3.14 (Virtual Environment)",
            "geminiConfigured": engine.is_configured(),
            "model": engine.model_name
        }))
        return

    # Parse input payload
    payload = {}
    if args.stdin:
        try:
            stdin_data = sys.stdin.read()
            if stdin_data.strip():
                payload = json.loads(stdin_data)
        except Exception as e:
            print(json.dumps({"error": f"Failed to parse stdin JSON: {str(e)}"}), file=sys.stderr)
            sys.exit(1)
    elif args.input:
        try:
            payload = json.loads(args.input)
        except Exception:
            # If plain string passed
            payload = {"message": args.input}

    message = payload.get("message") or payload.get("original_message") or ""
    context = payload.get("context", "")
    concerns = payload.get("concerns", "")

    if not message and args.action in ["investigate", "courtroom", "metrics"]:
        print(json.dumps({"error": "No message or situation provided for analysis"}), file=sys.stderr)
        sys.exit(1)

    if args.action == "metrics":
        metrics = ForensicLinguisticAnalyzer.calculate_metrics(message, context, concerns)
        print(json.dumps(metrics, indent=2))
        return

    if args.action == "investigate":
        data, is_live_ai, engine_name = engine.analyze_investigation(message, context, concerns)
        output = {
            "success": True,
            "data": data,
            "isLiveAI": is_live_ai,
            "engine": engine_name
        }
        print(json.dumps(output))
        return

    if args.action == "courtroom":
        data, is_live_ai, engine_name = engine.analyze_courtroom(payload)
        output = {
            "success": True,
            "data": data,
            "isLiveAI": is_live_ai,
            "engine": engine_name
        }
        print(json.dumps(output))
        return


if __name__ == "__main__":
    main()
