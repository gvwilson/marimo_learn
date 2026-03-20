"""Ordering Widget for Marimo"""

import anywidget
from pathlib import Path
import random
import traitlets


class OrderingWidget(anywidget.AnyWidget):
    """
    An ordering question widget where students arrange items in sequence using drag-and-drop.

    Attributes:
        question (str): The question text to display
        items (list): Items in the correct order
        shuffle (bool): Whether to shuffle items initially
        value (dict): Current state with 'order' and 'correct' keys
    """

    # Load JavaScript from external file
    _esm = Path(__file__).parent / "static" / "ordering.js"

    # Traitlets
    question = traitlets.Unicode("").tag(sync=True)
    items = traitlets.List(trait=traitlets.Unicode()).tag(sync=True)
    current_order = traitlets.List(trait=traitlets.Unicode()).tag(sync=True)
    shuffle = traitlets.Bool(True).tag(sync=True)
    lang = traitlets.Unicode("en").tag(sync=True)
    value = traitlets.Dict(default_value=None, allow_none=True).tag(sync=True)

    def __init__(
        self,
        question: str,
        items: list[str],
        shuffle: bool = True,
        lang: str = "en",
        **kwargs,
    ):
        """
        Initialize an ordering widget.

        Args:
            question: The question text
            items: Items in the correct order
            shuffle: Whether to shuffle items initially (default: True)
        """
        super().__init__(**kwargs)
        self.question = question
        self.items = items
        self.shuffle = shuffle
        self.lang = lang

        # Create shuffled initial order if requested
        if shuffle:
            current = items.copy()
            random.shuffle(current)
            self.current_order = current
        else:
            self.current_order = items.copy()
