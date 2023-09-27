# OpenAI Usage

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts # gets OpenAI usage for the current calendar day in Chicago (my time zone)
bun run src/index.ts 2023-04-06 # gets OpenAI usage for the day entered (must be in yyyy-mm-dd format)
```

This project was created using `bun init` in bun v1.0.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
