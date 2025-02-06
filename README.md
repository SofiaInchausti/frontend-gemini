# Gemini Frontend 🔹

Gemini Frontend is an emergency reporting web application built with Next.js, TypeScript, Vitest for testing, and styled with Tailwind CSS. It allows users to input an emergency description, which is processed to detect important data such as date, location, description, injuries, and owner. If any required data is missing, the application prompts the user to provide the missing information and returns the complete result.

## The app is deployed. Follow this link to access it: [GeminiApp](https://gemini-sofiainchaustis-projects.vercel.app/), or follow the installation guidelines to set it up locally.

## Chat Functionality

When users enter emergency information, the app intelligently identifies missing details (such as location) and prompts the user to provide them. For instance, if a user writes, "My cat fell from a tree and got injured" but omits the location, the app will ask for the missing information. The user can then simply reply with the additional detail, like "In the park," without needing to retype the entire message.

This approach ensures a smooth and seamless experience, allowing users to complete their report in a natural, conversational flow, without having to repeat or rewrite previously entered information. It reduces friction and saves time, making the process of providing emergency details faster and more user-friendly.

## Installation

To get started with Gemini Frontend, follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/gemini-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd gemini-frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Usage

To run the project locally, use the following command:

```bash
npm run dev
# or
yarn dev
```
