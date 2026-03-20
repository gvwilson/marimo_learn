"""Utilities for teaching with marimo notebooks."""

import httpx
import marimo as mo
import sys


def is_pyodide():
    """Is this notebook running in pyodide?"""

    return "pyodide" in sys.modules


def localize_file(filepath: str) -> str:
    """
    Download a file from the 'public' directory, returning the
    local path.

    Args:
        filepath: path relative to 'public' directory

    Returns:
        local file path

    Raises:
        FileNotFoundError: if remote file not found
    """

    if not is_pyodide():
        return str(mo.notebook_dir() / "public" / filepath)

    url = str(mo.notebook_location() / "public" / filepath)
    response = httpx.get(url)
    if response.status_code != 200:
        raise FileNotFoundError(f"unable to get {filepath} from {url}")

    local_path = mo.notebook_dir() / filepath
    local_path.parent.mkdir(parents=True, exist_ok=True)
    with open(local_path, "wb") as writer:
        writer.write(response.content)

    return str(local_path)
