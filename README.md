# LA County JENI Acessible Data Visualization App

This application provides a dynamic visualization of the Justice Equity Need Index (JENI) for Los Angeles County. The JENI, developed by Advancement Project California, is a pivotal tool that highlights ZIP Codes in dire need of public investments aimed at community healing, health, and prevention as a means to rectify historical injustices.

Access the tool [here](https://accessible-map-visualization.vercel.app/)

This project is committed to making this application as accessible as possible. The map visualization includes an automated feature that generates a visual description of the current map state, aiding users who rely on screen readers to understand and interact with the map content.

### Data Source

The JENI data is sourced from the Los Angeles County eGIS [Justice Equity Need Index ZIP Code dataset](https://egis-lacounty.hub.arcgis.com/datasets/lacounty::justice-equity-need-index-zip-code/about).

![LA County JENI Visualization](https://i.gyazo.com/e7a146f0b179d5488acc4dd13eeedb2a.jpg)

_Description: The screenshot above shows the interactive map of LA County, highlighting various ZIP Codes based on the JENI data. Areas are colored differently to represent varying levels of need according to the index._

# Running this project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

After cloning this repository:

Install packages

```bash
npm install
#or
yarn install

```

Add your .env variables. You will need an OpenAI API Key and Mapbox Public key.

```
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=<YOUR MAPBOX PUBLIC KEY>
OPENAI_API_KEY=<YOUR OPENAI API KEY>

```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the map.

## Testing with Playwright

This application uses [Playwright](https://playwright.dev/) for end-to-end testing to simulate user interactions and ensure the application functions as expected. Playwright tests are capable of capturing screenshots, generating snapshots, and producing trace files to provide a detailed view of the test execution.

### Running Tests

To run the end-to-end tests, execute the following command:

```bash
npx playwright test
```

After the test has run, you can access the trace files as follows:

```bash
npx playwright show-trace trace.zip
```
