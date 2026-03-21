.PHONY: docs
all: commands

## commands: show available commands
commands:
	@grep -h -E '^##' ${MAKEFILE_LIST} \
	| sed -e 's/## //g' \
	| column -t -s ':'

## build: build JavaScript and Python package
build:
	@cd js && npm run build
	@python -m build

## setup: complete installation of development dependencies
setup:
	@uv sync --dev
	@cd js && npm install

## check: check Python code issues
check:
	@ruff check .

## clean: clean up
clean:
	@find . -path './.venv' -prune -o -type d -name '__pycache__' -exec rm -rf {} +
	@find . -path './.venv' -prune -o -type f -name '*~' -exec rm {} +
	@rm -rf dist temp src/marimo_learn/static

## coverage: run tests with coverage
coverage:
	@python -m coverage run -m pytest tests
	@python -m coverage report --show-missing

## docs: build documentation
docs:
	@mkdocs build
	@touch docs/.nojekyll
	@cp etc/docs-requirements.txt docs/requirements.txt
	@uv run marimo export html-wasm --force --mode edit example/demo.py -o docs/demo.html --sandbox

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

## test: run Python tests
test:
	@cd js && npm test
	@pytest tests
