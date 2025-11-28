##############################
# 1️⃣ BUILD STAGE
##############################
FROM node:18 AS build

WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the source code
COPY . .

##############################
# 2️⃣ PRODUCTION STAGE
##############################
FROM node:18-alpine

WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

# Copy built production files and node_modules from builder stage
COPY --from=build /app /app

# Expose your production port
EXPOSE 3000

# Start the app with PM2 Runtime
CMD ["pm2-runtime", "src/app.js"]

