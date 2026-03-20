"""Flashcard Widget for Marimo"""

import anywidget
from pathlib import Path
import traitlets


class FlashcardWidget(anywidget.AnyWidget):
    """
    A flashcard widget with self-reported spaced repetition.

    Students flip cards to reveal the answer, then rate themselves
    (Got it / Almost / No). Cards rated "Almost" or "No" are re-inserted
    into the queue; the deck is complete when all cards are rated "Got it".

    Attributes:
        question (str): Optional heading shown above the deck
        cards (list): List of dicts with 'front' and 'back' keys
        shuffle (bool): Whether to shuffle the deck initially
        value (dict): State with 'results' (per-card ratings/attempts) and 'complete'
    """

    _esm = Path(__file__).parent / "static" / "flashcard.js"

    question = traitlets.Unicode("").tag(sync=True)
    cards = traitlets.List().tag(sync=True)
    shuffle = traitlets.Bool(True).tag(sync=True)
    lang = traitlets.Unicode("en").tag(sync=True)
    value = traitlets.Dict(default_value=None, allow_none=True).tag(sync=True)

    def __init__(self, cards, question="", shuffle=True, lang="en", **kwargs):
        super().__init__(**kwargs)
        self.question = question
        self.cards = cards
        self.shuffle = shuffle
        self.lang = lang
