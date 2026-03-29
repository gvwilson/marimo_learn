# Contributing

Contributions are very welcome.
Please file issues or submit pull requests in our [GitHub repository][repo].
All contributors will be acknowledged,
but must abide by our Code of Conduct.

## Setup

-   `uv venv` to create a virtual environment
-   `source .venv/bin/activate` to activate it
-   `make` for a list of available commands

| target       | action |
| :----------- | :----- |
| commands     | show available commands |
| package      | build package |
| check        | check Python code issues |
| clean        | clean up |
| docs         | build documentation |
| fix          | fix formatting and code issues |
| publish      | publish using ~/.pypirc credentials |
| build-wasm   | build WASM version of example notebook |
| run-local    | run the example notebook directly |
| run-wasm     | run the WASM version of the example notebook |

## Publishing the npm package

The standalone JavaScript bundle (`js/dist/marimo-learn.js`) is published to npm separately from the Python package.

1. **One-time setup:** create an account at npmjs.com if you don't have one, then run `npm login` in your terminal.

2. **Check the package name** before the first publish — if `marimo-learn` is already taken, change `"name"` in `js/package.json` to a scoped name such as `"@gvwilson/marimo-learn"`.

3. **Build and publish** from the `js/` directory:
   ```
   cd js
   npm run build
   npm publish            # unscoped package
   # or:
   npm publish --access public   # required for scoped packages
   ```

4. **Subsequent releases:** bump `"version"` in `js/package.json` following semver, then repeat step 3. Only the `dist/` directory is uploaded; source files and test fixtures are excluded.

## Publishing the Python package

Run `make publish` from the project root. This uses the credentials in `~/.pypirc` to upload the distribution files in `dist/` to PyPI via Twine. Build the distribution first with `make build` if you haven't already.

## Learn More

-   [Marimo documentation][marimo]

[marimo]: https://marimo.io/
[repo]: https://github.com/gvwilson/marimo_learn
