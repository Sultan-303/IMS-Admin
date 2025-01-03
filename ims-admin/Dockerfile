FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Install dev dependencies for build
RUN npm install tailwindcss postcss autoprefixer

# Build the app
RUN npm run build

EXPOSE 3000

# Use environment variable to determine startup command
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm start; else npm run dev; fi"]