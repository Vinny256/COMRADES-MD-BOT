
FROM node:18-bullseye-slim


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
    && rm -rf /var/lib/apt/lists/*


WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .


EXPOSE 8080


CMD ["node", "index.js"]
