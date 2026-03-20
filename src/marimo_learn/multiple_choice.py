"""Multiple Choice Widget for Marimo"""

import anywidget
from pathlib import Path
import traitlets


class MultipleChoiceWidget(anywidget.AnyWidget):
    """
    A multiple choice question widget.

    Attributes:
        question (str): The question text to display
        options (list): List of answer options
        correct_answer (int): Index of the correct answer (0-based)
        explanation (str): Optional explanation text shown after answering
        value (dict): Current state with 'selected', 'correct', and 'answered' keys
    """

    # Load JavaScript from external file
    _esm = Path(__file__).parent / "static" / "multiple-choice.js"

    # Traitlets
    question = traitlets.Unicode("").tag(sync=True)
    options = traitlets.List(trait=traitlets.Unicode()).tag(sync=True)
    correct_answer = traitlets.Int(0).tag(sync=True)
    explanation = traitlets.Unicode("").tag(sync=True)
    lang = traitlets.Unicode("en").tag(sync=True)
    value = traitlets.Dict(default_value=None, allow_none=True).tag(sync=True)

    def __init__(
        self,
        question: str,
        options: list[str],
        correct_answer: int,
        explanation: str = "",
        lang: str = "en",
        **kwargs,
    ):
        """
        Initialize a multiple choice widget.

        Args:
            question: The question text
            options: List of answer options
            correct_answer: Index of the correct answer (0-based)
            explanation: Optional explanation text
        """
        super().__init__(**kwargs)
        self.question = question
        self.options = options
        self.correct_answer = correct_answer
        self.explanation = explanation
        self.lang = lang
