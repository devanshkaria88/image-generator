# AI Image Generator

A web application for generating images using the DALL-E API from OpenAI.

## Features

- Clean, modern UI using shadcn/ui components
- Generate images with DALL-E 3
- Display generated images with their prompts
- Securely store API key in local storage

## Technologies Used

- React with TypeScript
- Vite as the build tool
- Tailwind CSS for styling
- shadcn/ui for UI components
- OpenAI's DALL-E API for image generation

## Getting Started

### Prerequisites

- Node.js 16+
- Yarn package manager
- OpenAI API key with DALL-E access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/image-generator.git
cd image-generator
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Using the Application

1. Enter your OpenAI API key when prompted
2. Type a description of the image you want to generate
3. Click "Generate Image" and wait for the result

## Environment Variables

This project uses local storage to save your API key. No environment variables are required to run the application.

## License

MIT