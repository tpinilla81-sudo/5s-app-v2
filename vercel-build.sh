#!/bin/bash
set -e

echo "Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps

echo "Running Prisma generate..."
npx prisma generate

echo "Building with Next.js..."
npx next build

echo "Build completed!"
