"""Matching Widget for Marimo"""

import anywidget
from pathlib import Path
import traitlets


class MatchingWidget(anywidget.AnyWidget):
    """
    A matching question widget where students pair items from two columns using drag-and-drop.

    Attributes:
        question (str): The question text to display
        left (list): Items in the left column
        right (list): Items in the right column
        correct_matches (dict): Mapping of left column indices to right column indices
        value (dict): Current state with 'matches', 'correct', and 'score' keys
    """

    # Load JavaScript from external file
    _esm = Path(__file__).parent / "static" / "matching.js"

    # Traitlets
    question = traitlets.Unicode("").tag(sync=True)
    left = traitlets.List(trait=traitlets.Unicode()).tag(sync=True)
    right = traitlets.List(trait=traitlets.Unicode()).tag(sync=True)
    correct_matches = traitlets.Dict().tag(sync=True)
    lang = traitlets.Unicode("en").tag(sync=True)
    value = traitlets.Dict(default_value=None, allow_none=True).tag(sync=True)

    def __init__(
        self,
        question: str,
        left: list[str],
        right: list[str],
        correct_matches: dict,
        lang: str = "en",
        **kwargs,
    ):
        """
        Initialize a matching widget.

        Args:
            question: The question text
            left: Items in the left column
            right: Items in the right column
            correct_matches: Dict mapping left indices to right indices (e.g., {0: 2, 1: 0, 2: 1})
        """
        super().__init__(**kwargs)
        self.question = question
        self.left = left
        self.right = right
        self.correct_matches = correct_matches
        self.lang = lang
