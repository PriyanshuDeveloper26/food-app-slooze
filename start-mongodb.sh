#!/bin/bash

echo "🚀 Starting MongoDB with Docker..."
echo ""

# Check if MongoDB container already exists
if [ "$(sudo docker ps -a -q -f name=food-delivery-mongo)" ]; then
    echo "📦 MongoDB container exists, starting it..."
    sudo docker start food-delivery-mongo
else
    echo "📦 Creating new MongoDB container..."
    sudo docker run -d \
        --name food-delivery-mongo \
        -p 27017:27017 \
        -v mongodb_data:/data/db \
        mongo:7.0
fi

echo ""
echo "⏳ Waiting for MongoDB to be ready..."
sleep 3

# Check if MongoDB is running
if sudo docker ps | grep -q food-delivery-mongo; then
    echo "✅ MongoDB is running!"
    echo ""
    echo "📍 Connection URL: mongodb://localhost:27017/food_delivery"
    echo ""
    echo "To stop MongoDB: sudo docker stop food-delivery-mongo"
    echo "To view logs: sudo docker logs food-delivery-mongo"
else
    echo "❌ Failed to start MongoDB"
    exit 1
fi
