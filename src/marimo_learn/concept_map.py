"""Concept Map Widget for Marimo"""

import anywidget
from pathlib import Path
import traitlets


class ConceptMapWidget(anywidget.AnyWidget):
    """
    A concept mapping widget where students draw labeled directed edges between concepts.

    Students select a relationship term then click two concept nodes to connect them.
    Concept nodes can be dragged to rearrange the layout.

    Attributes:
        question (str): The question or prompt shown above the map
        concepts (list): List of concept names (nodes)
        terms (list): List of relationship terms that can label edges
        correct_edges (list): List of dicts with 'from', 'to', 'label' keys
        value (dict): State with 'edges', 'score', 'total', and 'correct' keys
    """

    _esm = Path(__file__).parent / "static" / "concept-map.js"

    question = traitlets.Unicode("").tag(sync=True)
    concepts = traitlets.List(trait=traitlets.Unicode()).tag(sync=True)
    terms = traitlets.List(trait=traitlets.Unicode()).tag(sync=True)
    correct_edges = traitlets.List().tag(sync=True)
    lang = traitlets.Unicode("en").tag(sync=True)
    value = traitlets.Dict(default_value=None, allow_none=True).tag(sync=True)

    def __init__(
        self,
        question: str,
        concepts: list[str],
        terms: list[str],
        correct_edges: list[dict] | None = None,
        lang: str = "en",
        **kwargs,
    ):
        super().__init__(**kwargs)
        self.question = question
        self.concepts = concepts
        self.terms = terms
        self.correct_edges = correct_edges if correct_edges is not None else []
        self.lang = lang
