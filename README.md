# Social Prescribing Tool

The Social Prescribing Tool is a React app which fetches data from an Airtable database.

A demo of the app can be found at: https://master.d3j63rx7ndymc0.amplifyapp.com/

A read-only version of the database can be viewed at: https://airtable.com/shrKb2bgj6fePLQhp

## Airtable setup

To run your own version of the Social Prescribing Tool you will need an Airtable database.

This can be created by visiting our empty version of the Social Prescribing database at [https://airtable.com/shrlKSweAlM2lMu62](https://airtable.com/shrlKSweAlM2lMu62) and clicking "Copy base" in the top-right corner.

Airtable will then ask you to create an account if you don't already have one.

Once you have a copy of the database, you will need two pieces of information to run the app locally - the base ID and an API key.

The base ID can be found in the introduction section of the API documentation at - https://airtable.com/api

An API key can be generated from your account page at - https://airtable.com/account

## Local setup

You will need the following tools installed on your computer:

- [git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [yarn](https://yarnpkg.com/)

Then...

1. Create a [fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) of this repository
2. Clone your forked repository to create a local copy of the files
3. From the project create a copy of the `.env.example` file and call it `.env.local`, filling in the base ID and API key from the previous section.
4. Run `yarn start` from your terminal or IDE to start a development server.
5. Visit http://localhost:3000/

## Development

Further documentation about working with React can be found on the React website - https://reactjs.org/docs/getting-started.html

This project also makes use of TypeScript which you can learn more about here - https://www.typescriptlang.org

## Deploying

Run `yarn build` to create a production version of the app, either for local testing or deployment.

We recommend [Netlify](https://www.netlify.com/) as the fastest and easiest way to deploy the app but any similar service (e.g. Vercel or AWS Amplify) or traditional web host will work.
