#!/bin/bash

# Vastra Project - Quick Setup Script
# This script automatically sets up the entire backend infrastructure

set -e

echo "🚀 Vastra Backend Setup Script"
echo "======================================="

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed"
    echo "Please install PostgreSQL first:"
    echo "  Ubuntu: sudo apt-get install postgresql"
    echo "  macOS: brew install postgresql@15"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js first"
    exit 1
fi

echo "✅ Node.js and PostgreSQL found"

# Navigate to backend
cd backend

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Setup environment
echo "⚙️  Setting up environment..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file"
fi

# Create database
echo "🗄️  Creating database..."
psql -U postgres <<EOF
CREATE DATABASE IF NOT EXISTS vastra_db;
CREATE USER IF NOT EXISTS vastra_user WITH PASSWORD 'vastra_password';
ALTER ROLE vastra_user SET client_encoding TO 'utf8';
ALTER ROLE vastra_user SET default_transaction_isolation TO 'read committed';
GRANT ALL PRIVILEGES ON DATABASE vastra_db TO vastra_user;
EOF

echo "✅ Database created"

# Setup tables
echo "📋 Setting up database tables..."
pnpm run db:setup

# Seed data
echo "🌱 Seeding sample data..."
pnpm run db:seed

echo ""
echo "✨ Setup completed successfully!"
echo ""
echo "🚀 Start the backend server with:"
echo "   cd backend && pnpm run dev"
echo ""
echo "📝 Frontend should be running at: http://localhost:5173"
echo "🔧 Backend API: http://localhost:5000/api"
echo ""
echo "🧪 Test credentials:"
echo "   Email: customer@vastra.com"
echo "   Password: password123"
