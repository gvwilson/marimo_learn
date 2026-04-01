# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "marimo>=0.20.4",
#     "marimo_learn>=0.5.0",
# ]
# ///

import marimo

__generated_with = "0.20.4"
app = marimo.App(width="medium")


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""
    # Testing marimo_learn module
    """)
    return


@app.cell
def _():
    import marimo as mo
    import marimo_learn as mol
    import sqlite3

    print("marimo_learn version:", mol.__version__)
    print("is_pyodide:", mol.is_pyodide())
    return mo, mol, sqlite3


@app.cell
def _(mol):
    _local_path = mol.localize_file("test.txt")
    print("local path", _local_path)
    with open(_local_path, "r") as reader:
        print(reader.read())
    return


@app.cell
def _(mol, sqlite3):
    conn = sqlite3.connect(mol.localize_file("simple.db"))
    conn.execute("select * from example").fetchall()
    return


if __name__ == "__main__":
    app.run()
