"""Astra single-shot consult: direction memo and adversarial gate for the overhaul.

Batch tier, text only. Reuses the shared OpenRouter key helper from the Kaga
Hotel scripts so the key is read at call time and never copied into this repo.
Guards per kaga-budget: 150K input hard cap, single shot, no automatic retry.

    python scripts/astra/astra-direction.py dry
    python scripts/astra/astra-direction.py submit
    python scripts/astra/astra-direction.py poll
"""
import io
import json
import os
import sys
import urllib.error
import urllib.request

sys.path.insert(0, r"C:\Users\DELL\Desktop\projects\Passsion projects\hotel site\scripts")
from openrouter import key  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
BATCHES = "https://openrouter.ai/api/beta/batches"
STATE = os.path.join(HERE, ".astra-direction-id")
OUT = os.path.join(ROOT, "docs", "ASTRA-DIRECTION.md")
HARD_CAP = 150000
IN_RATE, OUT_RATE = 5.0, 25.0
MAX_OUT = 32000

DOCS = [
    ("THE BRIEF", os.path.join(HERE, "brief.md")),
    ("LOCKED REFERENCES (Law 7 checklist)", os.path.join(ROOT, "docs", "REFERENCES.md")),
    ("SETTLED DECISIONS", os.path.join(ROOT, "docs", "DECISIONS.md")),
    ("CODEBASE FACTS", os.path.join(ROOT, "docs", "CREW-LOG.md")),
]

INSTRUCTION = """You are a senior art director and product designer, consulted once. You cannot ask questions and will not see a reply, so commit to specific answers. Your memo guides an Opus-led crew that will build this in React, TypeScript, Tailwind and framer-motion.

The site is Shaka Nathan K's personal portfolio: a Windows XP desktop metaphor (Luna blue title bars, taskbar, desktop icons, draggable windows, Merlin the 1997 Microsoft Agent wizard as an assistant). He is a developer, AI engineer and project lead in Kampala, Uganda, looking for work building web solutions, systems, and leading projects. The goal of this overhaul is to win him work: keep the XP soul, add a hint of modern premium, and make it obvious in five seconds who he is, what he does, and what to do next.

Write a markdown memo with exactly these sections. Be concrete: pixel values, hex codes, font names, durations, positions. No adjectives without a number or a named move behind them. Never use em dashes. Keep it under 3,500 words.

1. HERO VERDICT. The first screen after the boot finishes (About window auto-open, icons, 3 polaroids top-right, sticky note beneath, taskbar). Give the composition at 1440x900 and at 375x812: what sits where, sizes, what the eye hits first, second, third, and what to cut or move. State whether it answers who / what / what next in five seconds and what fixes it if not.
2. PREMIUM ON XP: THE BLEND RULES. Where the modern premium layer may appear and where XP chrome must stay pure. Five dos and five don'ts, each a buildable rule.
3. ADVERSARIAL PASS. Attack the plan. The five weakest decisions or reference moves in the documents below: for each, why it fails (mobile, reads generic, decorative, performance, clashes with XP, hurts conversion) and the specific replacement. Find holes; do not redesign the whole thing.
4. TYPE AND COLOUR. Specific free-licensed font families (Google Fonts or similar) for: XP chrome and body, display headlines (role line, case-study headlines), handwriting (sticky note, polaroid captions), and mono (boot). Weights, sizes at 1440 and 375. The palette additions to XP Luna as hex values with their roles, and contrast ratios for body text on the grey (#E3E3E3) window body once grain is applied. The grain spec: technique, opacity, blend mode, which surfaces.
5. THREE OBJECTS. One precise spec each for the sticky note, the polaroids, and the skills orbit, so each reads native to an XP desktop rather than pasted from a creative-studio site. Include hover, reduced-motion, and mobile behaviour.
6. CASE STUDIES AND HIRE ME INSIDE XP WINDOWS. How the Lara-style case-study card and its expanded essay should look inside an XP window (folder thumbnail view, then a viewer window), how the concept badge should read visually, and how Hire Me should be laid out so it converts.
7. SCROLLING DESKTOP. The pitfalls of a desktop that scrolls under a fixed taskbar and wallpaper with draggable windows that move with the page, and the rules that avoid them.
8. TOP RISKS. Performance, accessibility, and anything that would make this read as a toy rather than a hireable professional.

The source documents follow."""


def assemble():
    text = INSTRUCTION
    for label, path in DOCS:
        with io.open(path, encoding="utf-8") as fh:
            text += "\n\n===== {0} =====\n\n{1}".format(label, fh.read())
    return text, len(text) // 4


def estimate(est_in):
    likely = est_in * IN_RATE / 1e6 + 12000 * OUT_RATE / 1e6
    worst = est_in * IN_RATE / 1e6 + MAX_OUT * OUT_RATE / 1e6
    print("estimated input  ~{0:,} tokens".format(est_in))
    print("estimated cost   ${0:.2f} likely, ${1:.2f} worst case at {2:,} output".format(likely, worst, MAX_OUT))
    return est_in <= HARD_CAP


def post(url, data=None):
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode() if data is not None else None,
        headers={"Authorization": "Bearer " + key(), "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=600) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        raise SystemExit("HTTP {0}: {1}".format(e.code, e.read().decode()[:700]))


def submit(dry):
    text, est_in = assemble()
    if not estimate(est_in):
        print("REFUSED: over the {0:,} hard cap.".format(HARD_CAP))
        return 1
    if dry:
        return 0
    d = post(BATCHES, {
        "endpoint": "/v1/chat/completions",
        "model": "openai/gpt-6-astra",
        "requests": [{
            "custom_id": "portfolio-direction",
            "body": {"messages": [{"role": "user", "content": text}], "max_tokens": MAX_OUT},
        }],
    })
    with io.open(STATE, "w") as fh:
        fh.write(d.get("id") or "")
    print("batch id  {0}\nstatus    {1}".format(d.get("id"), d.get("status")))
    return 0


def poll():
    with io.open(STATE) as fh:
        bid = fh.read().strip()
    d = post("{0}/{1}".format(BATCHES, bid))
    status = d.get("status")
    print("status    {0}   counts {1}".format(status, d.get("request_counts", {})))
    if status != "completed":
        return 2
    results = d.get("results") or []
    if not results:
        print(json.dumps(d)[:900])
        return 1
    body = results[0].get("response", {}).get("body", {})
    if "choices" not in body:
        print(json.dumps(results[0])[:900])
        return 1
    choice = body["choices"][0]
    text = choice["message"]["content"]
    u = body.get("usage", {})
    cd = u.get("completion_tokens_details", {}) or {}
    pin, pout = u.get("prompt_tokens", 0), u.get("completion_tokens", 0)
    with io.open(OUT, "w", encoding="utf-8") as fh:
        fh.write(text)
    print("finish       {0}".format(choice.get("finish_reason")))
    print("prompt_tok   {0:,}".format(pin))
    print("output_tok   {0:,}  (reasoning {1:,})".format(pout, cd.get("reasoning_tokens", 0)))
    print("cost         {0}  computed ${1:.4f}".format(u.get("cost"), pin * IN_RATE / 1e6 + pout * OUT_RATE / 1e6))
    print("wrote        {0} ({1:,} bytes)".format(OUT, len(text.encode())))
    print("em dashes    {0}".format(text.count("\u2014")))
    return 0


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "dry"
    sys.exit(poll() if cmd == "poll" else submit(dry=(cmd != "submit")))
