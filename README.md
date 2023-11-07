lazyftp-v0 is a web application that allows you to view an FTP website in the browser, and depending on your platform and browser you may be able to do additional things.

Some of the components are generated using [Vercel's v0](https://vercel.com/v0)

## Features

- Browse FTP directories and files in a user-friendly interface
- Download files from FTP servers to your local machine
<!-- - Upload files from your local machine to FTP servers (requires Chrome or Firefox) -->
<!-- - Delete files from FTP servers (requires Chrome or Firefox) -->
<!-- - Create new directories on FTP servers (requires Chrome or Firefox) -->
<!-- - Rename files and directories on FTP servers (requires Chrome or Firefox) -->
<!-- - Securely store your FTP credentials using cryptr -->
- Authenticate with Next Auth and Google OAuth

## Installation

To run this project locally, you need to have Node.js and npm installed on your machine.

Clone this repository and install the dependencies:

```bash
git clone https://github.com/your-username/lazyftp-v0.git
cd lazyftp-v0
npm install
```

Create a `.env.local` file in the root directory and add the following variables:

```bash
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CRYPTR_SECRET=your-cryptr-secret
```

You can obtain a Google client ID and secret from the [Google Developers Console](https://console.developers.google.com/).

You can generate a cryptr secret using any random string generator.

## Usage

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To build the project for production, run:

```bash
npm run build
```

To start the production server, run:

```bash
npm run start
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.