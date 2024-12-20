FROM mcr.microsoft.com/windows/servercore:ltsc2022

# Install Node.js
SHELL ["powershell", "-Command"]
RUN Invoke-WebRequest -Uri https://nodejs.org/dist/v18.19.0/node-v18.19.0-x64.msi -OutFile node.msi; \
    Start-Process msiexec.exe -Wait -ArgumentList '/i', 'node.msi', '/quiet', '/norestart'; \
    Remove-Item -Force node.msi

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "dev"]