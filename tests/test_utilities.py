"""Unit tests for utility functions."""

import sys
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest
from marimo_learn import is_pyodide, localize_file

# Named constant for a successful HTTP status code
HTTP_OK = 200
# Named constant for a not-found HTTP status code
HTTP_NOT_FOUND = 404


class TestIsPyodide:
    """Tests for is_pyodide()"""

    def test_returns_false_when_no_pyodide(self):
        """is_pyodide() returns False when pyodide is not in sys.modules"""
        with patch.dict(sys.modules, {}, clear=False):
            sys.modules.pop("pyodide", None)
            assert is_pyodide() is False

    def test_returns_true_when_pyodide_present(self):
        """is_pyodide() returns True when pyodide is in sys.modules"""
        fake_pyodide = MagicMock()
        with patch.dict(sys.modules, {"pyodide": fake_pyodide}):
            assert is_pyodide() is True


class TestLocalizeFile:
    """Tests for localize_file()"""

    def test_non_pyodide_returns_local_path(self):
        """In non-pyodide mode, returns path under notebook_dir/public/"""
        notebook_dir = Path("/fake/notebook")
        mock_mo = MagicMock()
        mock_mo.notebook_dir.return_value = notebook_dir

        with (
            patch("marimo_learn.utilities.is_pyodide", return_value=False),
            patch("marimo_learn.utilities.mo", mock_mo),
        ):
            result = localize_file("data/image.png")

        assert result == str(notebook_dir / "public" / "data" / "image.png")

    def test_pyodide_downloads_file_successfully(self):
        """In pyodide mode, downloads file and returns local path."""
        notebook_dir = Path("/fake/notebook")
        notebook_location = MagicMock()
        notebook_location.__truediv__ = lambda self, other: MagicMock(
            __truediv__=lambda s, o: MagicMock(
                __str__=lambda x: f"https://example.com/public/{o}"
            )
        )

        mock_response = MagicMock()
        mock_response.status_code = HTTP_OK
        mock_response.content = b"fake file content"

        mock_mo = MagicMock()
        mock_mo.notebook_dir.return_value = notebook_dir
        mock_mo.notebook_location.return_value = MagicMock(
            __truediv__=lambda self, other: MagicMock(
                __truediv__=lambda s, o: MagicMock(
                    __str__=lambda x: f"https://example.com/public/{o}"
                )
            )
        )

        mock_mo.notebook_dir.return_value = notebook_dir

        with (
            patch("marimo_learn.utilities.is_pyodide", return_value=True),
            patch("marimo_learn.utilities.mo", mock_mo),
            patch("marimo_learn.utilities.httpx.get", return_value=mock_response),
            patch("pathlib.Path.mkdir"),
            patch("builtins.open", MagicMock()),
        ):
            result = localize_file("image.png")

        assert result == str(notebook_dir / "image.png")

    def test_pyodide_raises_on_missing_file(self):
        """In pyodide mode, raises FileNotFoundError for non-200 responses."""
        notebook_dir = Path("/fake/notebook")

        mock_response = MagicMock()
        mock_response.status_code = HTTP_NOT_FOUND

        mock_mo = MagicMock()
        mock_mo.notebook_dir.return_value = notebook_dir
        mock_mo.notebook_location.return_value = MagicMock(
            __truediv__=lambda self, other: MagicMock(
                __truediv__=lambda s, o: MagicMock(
                    __str__=lambda x: f"https://example.com/public/{o}"
                )
            )
        )

        with (
            patch("marimo_learn.utilities.is_pyodide", return_value=True),
            patch("marimo_learn.utilities.mo", mock_mo),
            patch("marimo_learn.utilities.httpx.get", return_value=mock_response),
        ):
            with pytest.raises(FileNotFoundError):
                localize_file("missing.png")

    def test_pyodide_writes_file_content(self):
        """In pyodide mode, writes the response content to disk."""
        notebook_dir = Path("/fake/notebook")
        file_content = b"binary content here"

        mock_response = MagicMock()
        mock_response.status_code = HTTP_OK
        mock_response.content = file_content

        mock_mo = MagicMock()
        mock_mo.notebook_dir.return_value = notebook_dir
        mock_mo.notebook_location.return_value = MagicMock(
            __truediv__=lambda self, other: MagicMock(
                __truediv__=lambda s, o: MagicMock(
                    __str__=lambda x: f"https://example.com/public/{o}"
                )
            )
        )

        mock_open = MagicMock()
        mock_file = MagicMock()
        mock_open.return_value.__enter__ = MagicMock(return_value=mock_file)
        mock_open.return_value.__exit__ = MagicMock(return_value=False)

        with (
            patch("marimo_learn.utilities.is_pyodide", return_value=True),
            patch("marimo_learn.utilities.mo", mock_mo),
            patch("marimo_learn.utilities.httpx.get", return_value=mock_response),
            patch("pathlib.Path.mkdir"),
            patch("builtins.open", mock_open),
        ):
            localize_file("data.bin")

        mock_file.write.assert_called_once_with(file_content)
