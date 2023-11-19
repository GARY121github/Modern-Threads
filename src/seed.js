import mongoose from "mongoose";
import { Product } from './models/index.js';

const dummyData = [
    {
        name: 'Laptop',
        description: 'Powerful laptop with high-performance specs.',
        price: 999.99,
        image: 'https://images.pexels.com/photos/5076531/pexels-photo-5076531.jpeg',
        stock: 50,
    },
    {
        name: 'Smartphone',
        description: 'Latest smartphone with advanced features.',
        price: 599.99,
        image: 'https://images.pexels.com/photos/1100447/pexels-photo-1100447.jpeg',
        stock: 30,
    },
    {
        name: 'Headphones',
        description: 'High-quality noise-canceling headphones.',
        price: 149.99,
        image: 'https://images.pexels.com/photos/6686442/pexels-photo-6686442.jpeg',
        stock: 20,
    }
];

const seedDummyData = async () => {
    try {
        // Remove existing data
        await Product.deleteMany({});

        // Insert dummy data
        await Product.insertMany(dummyData);

        console.log('Dummy data seeded successfully');
    } catch (error) {
        console.error('Error seeding dummy data ::', error.message);
    } finally {
        // Disconnect from the database
        mongoose.disconnect();
    }
}

export default seedDummyData;