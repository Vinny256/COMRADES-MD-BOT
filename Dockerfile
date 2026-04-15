# Use a solid Debian core with Node.js installed
FROM node:18-bullseye

# 🛡️ Install heavy graphics drivers, FFMPEG, and compiling tools
RUN apt-get update && \
    apt-get install -y \
    wget \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    ffmpeg \
    pkg-config \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Set up the working directory
WORKDIR /app

# Copy the Ghost Loader package files first
COPY package*.json ./

# 🚀 THE FIX: Force the graphics engine to build from source
RUN npm install --build-from-source canvas

# Install the rest of the bot dependencies
RUN npm install

# Copy all remaining Ghost Loader files
COPY . .

# Open the port for the Web Server & Heartbeat Engine
EXPOSE 8080

# Boot the Ghost Loader
CMD ["node", "index.js"]
