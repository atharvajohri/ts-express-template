# ts-express-template

This is a template to quickly start working on a Typescript enabled NodeJS service running with Express.
It uses nodemon to run the dev service.

It has a pre-commit hook enabled which sets up a mermaid file, which I find useful when working with LLMs to give context about the code I am working on.

It runs two servers, an admin server and a main server on two ports 3000 and 3001. Basic logging with Pino is also setup that retracts some common headers that I often use for Authentication & Authorization.