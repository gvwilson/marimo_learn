"""Labeling Widget for Marimo"""

import anywidget
from pathlib import Path
import traitlets


class LabelingWidget(anywidget.AnyWidget):
    """
    A text labeling widget where students drag numbered labels to text lines.

    Attributes:
        question (str): The question text to display
        labels (list): List of label texts (shown on left)
        text_lines (list): List of text lines to be labeled (shown on right)
        correct_labels (dict): Mapping of line indices to lists of correct label indices
        value (dict): Current state with 'placed_labels', 'score', 'total', and 'correct' keys
    """

    # Load JavaScript from external file
    _esm = Path(__file__).parent / "static" / "labeling.js"

    # Traitlets
    question = traitlets.Unicode("").tag(sync=True)
    labels = traitlets.List(trait=traitlets.Unicode()).tag(sync=True)
    text_lines = traitlets.List(trait=traitlets.Unicode()).tag(sync=True)
    correct_labels = traitlets.Dict().tag(sync=True)
    lang = traitlets.Unicode("en").tag(sync=True)
    value = traitlets.Dict(default_value=None, allow_none=True).tag(sync=True)

    def __init__(
        self,
        question: str,
        labels: list[str],
        text_lines: list[str],
        correct_labels: dict,
        lang: str = "en",
        **kwargs,
    ):
        """
        Initialize a labeling widget.

        Args:
            question: The question text
            labels: List of label texts (e.g., ["Variable declaration", "Function call", "Loop"])
            text_lines: List of text lines to be labeled (e.g., code lines, sentences)
            correct_labels: Dict mapping line index to list of correct label indices
                           Example: {0: [0, 1], 2: [2]} means line 0 should have labels 0 and 1,
                           line 2 should have label 2
        """
        super().__init__(**kwargs)
        self.question = question
        self.labels = labels
        self.text_lines = text_lines
        self.correct_labels = correct_labels
        self.lang = lang
