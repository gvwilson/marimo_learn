"""Utilities for use in marimo notebooks."""

from .concept_map import ConceptMapWidget
from .flashcard import FlashcardWidget
from .labeling import LabelingWidget
from .matching import MatchingWidget
from .multiple_choice import MultipleChoiceWidget
from .numeric_entry import NumericEntryWidget
from .ordering import OrderingWidget
from .predict_then_check import PredictThenCheckWidget
from .turtle import Color, Turtle, World
from .utilities import is_pyodide, localize_file

__version__ = "0.10.0"
__all__ = [
    "is_pyodide",
    "localize_file",
    "Color",
    "ConceptMapWidget",
    "FlashcardWidget",
    "LabelingWidget",
    "MatchingWidget",
    "MultipleChoiceWidget",
    "NumericEntryWidget",
    "OrderingWidget",
    "PredictThenCheckWidget",
    "Turtle",
    "World",
]
