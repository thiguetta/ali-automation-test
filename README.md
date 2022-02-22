# ali-automation-test

Automated test example of [aliexpress.com]() website.

For testing purposes we assume that this is a REST API which returns the search results for a given term and product
details.

## What is the scope of this project?

- REST API
- Validation tests
- Container ready app

# Prerequisites

- nodejs 17.x
- Docker
- Google Chrome
- chromedriver (http://chromedriver.storage.googleapis.com). It should match your Google Chrome version.

## Installing the dependencies

In the project directory, you can run:

`npm install`

It will install the required node dependencies.

## Running the project

In the project directory, you can run:

`npm start`

It runs the app in the development mode. Open http://localhost:8080 to view it in your browser.

## Running the tests

In the project directory, you can run:

`npm test`

It launches the test runner in the interactive watch mode.

## Building for production

In the project directory, you can run:

`npm run build`

It builds the docker image ready for production containing Google Chrome, chromedriver and nodejs as well.

After building the image, you can run:

`docker run -d --rm -p 8080:8080 ali-automation-tool start`

## Generating Swagger API Doc

In the project directory, you can run:

`npm run swagger-autogen`

After that, run the project and heck http://localhost:8080/doc for Swagger API documentation