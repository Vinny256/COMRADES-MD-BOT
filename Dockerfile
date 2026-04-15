
FROM node:20-bullseye


RUN apt-get update && \
    apt-get install -y \
    wget \
    ffmpeg \
    python3 \
    make \
    g++ \
    build-essential \
    libfontconfig1 \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 8080


CMD ["node", "index.js"]
