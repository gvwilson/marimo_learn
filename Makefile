.PHONY: docs
all: commands

## commands: show available commands
commands:
	@grep -h -E '^##' ${MAKEFILE_LIST} \
	| sed -e 's/## //g' \
	| column -t -s ':'

## package: build package
package:
	@python -m build

## check: check Python code issues
check:
	@ruff check .

## clean: clean up
clean:
	@find . -path './.venv' -prune -o -type d -name '__pycache__' -exec rm -rf {} +
	@find . -path './.venv' -prune -o -type f -name '*~' -exec rm {} +
	@rm -rf dist temp

## docs: build documentation
docs:
	@mkdocs build
	@touch docs/.nojekyll
	@cp etc/docs-requirements.txt docs/requirements.txt

## fix: fix formatting and code issues
fix:
	@ruff format .
	@ruff check --fix .

## publish: publish using ~/.pypirc credentials
publish:
	twine upload --verbose dist/*

## build-wasm: build WASM version of example notebook
build-wasm:
	@rm -rf temp
	@mkdir temp
	uv run marimo export html-wasm --force --sandbox --mode edit example/example.py -o temp

## run-local: run the example notebook directly
run-local:
	uv run marimo edit --sandbox example/example.py

## run-wasm: run the WASM version of the example notebook
run-wasm:
	@make build-wasm
	python -m http.server --directory temp
