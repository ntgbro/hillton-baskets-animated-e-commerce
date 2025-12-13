/**
 * Firestore Data Import Script
 * This imports initial data collections to your Firebase Firestore database
 * 
 * Usage: npx ts-node scripts/import-firestore-data.ts
 */

import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Import service account credentials
const serviceAccount = require('../hillton.json');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: 'hilltonbaskets-1c8c4',
    });
}

const db = admin.firestore();

// Sample data to populate initial collections
const initialData = {
    // Company Information
    company_info: {
        'hillton_baskets_main': {
            companyId: 'hillton_baskets_main',
            companyName: 'Hillton Baskets',
            tagline: 'Premium Modular Kitchen Solutions',
            contactInfo: {
                email: 'contact@hilltonbaskets.in',
                phone: '+91 9876543210',
                whatsapp: '+91 9876543210',
                supportEmail: 'support@hilltonbaskets.in'
            },
            address: {
                line1: '123 Kitchen Street',
                line2: 'Industrial Area',
                city: 'Bangalore',
                state: 'Karnataka',
                pincode: '560001',
                country: 'India',
                gstNumber: 'GST123456789'
            },
            aboutUs: {
                title: 'About Hillton Baskets',
                description: 'Leading manufacturer and supplier of premium modular kitchen solutions in India.',
                missionStatement: 'To transform every kitchen into a organized, functional and beautiful space.',
                visionStatement: 'To be India\'s most trusted brand for modular kitchen solutions.'
            },
            socialMedia: {
                facebook: 'https://facebook.com/hilltonbaskets',
                instagram: 'https://instagram.com/hilltonbaskets',
                twitter: 'https://twitter.com/hilltonbaskets',
                linkedin: 'https://linkedin.com/company/hilltonbaskets'
            },
            isActive: true,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }
    },

    // Categories
    categories: {
        'kitchen-baskets': {
            categoryId: 'kitchen-baskets',
            name: 'Kitchen Baskets',
            description: 'Premium modular kitchen baskets',
            sortOrder: 1,
            isActive: true,
            productCount: 0,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        },
        'kitchen-organizers': {
            categoryId: 'kitchen-organizers',
            name: 'Kitchen Organizers',
            description: 'Space-saving kitchen organizers',
            sortOrder: 2,
            isActive: true,
            productCount: 0,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        },
        'accessories': {
            categoryId: 'accessories',
            name: 'Accessories',
            description: 'Kitchen accessories and add-ons',
            sortOrder: 3,
            isActive: true,
            productCount: 0,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }
    },

    // App Settings
    app_settings: {
        'global_config': {
            settingId: 'global_config',
            freeShippingThreshold: 2000,
            codAvailable: true,
            codCharges: 50,
            maxCodAmount: 50000,
            defaultShippingCharges: 100,
            taxRates: {
                defaultGST: 18
            },
            maintenanceMode: {
                enabled: false,
                message: 'We are currently under maintenance. Please check back soon.',
                startTime: null,
                endTime: null
            },
            minOrderValue: 500,
            loyaltyPointsConfig: {
                enabled: true,
                earnRatio: 1, // 1 point per rupee
                redeemRatio: 1 // 1 rupee per point
            },
            referralConfig: {
                enabled: false,
                referrerReward: 100,
                refereeReward: 50
            },
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }
    },

    // Cities
    cities: {
        'bangalore': {
            cityId: 'bangalore',
            name: 'Bangalore',
            state: 'Karnataka',
            country: 'India',
            isServiceable: true,
            deliveryZones: [
                {
                    name: 'Central Bangalore',
                    pincodes: ['560001', '560002', '560003', '560004', '560005'],
                    deliveryFee: 50,
                    freeDeliveryAbove: 2000,
                    estimatedDays: 1
                },
                {
                    name: 'Outer Bangalore',
                    pincodes: ['560066', '560067', '560068', '560100'],
                    deliveryFee: 100,
                    freeDeliveryAbove: 2500,
                    estimatedDays: 2
                }
            ],
            popularAreas: ['Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City', 'Hebbal'],
            currency: 'INR',
            taxRate: {
                cgst: 9,
                sgst: 9
            },
            status: 'active',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }
    }
};

async function importData() {
    console.log('🚀 Starting Firestore data import...\n');

    try {
        // Import each collection
        for (const [collectionName, documents] of Object.entries(initialData)) {
            console.log(`📦 Importing collection: ${collectionName}`);

            for (const [docId, docData] of Object.entries(documents)) {
                await db.collection(collectionName).doc(docId).set(docData, { merge: true });
                console.log(`   ✓ Created/Updated document: ${docId}`);
            }

            console.log(`✅ Completed: ${collectionName}\n`);
        }

        console.log('🎉 All data imported successfully!');
        console.log('\n📊 Import Summary:');
        console.log(`   - Company Info: 1 document`);
        console.log(`   - Categories: ${Object.keys(initialData.categories).length} documents`);
        console.log(`   - App Settings: 1 document`);
        console.log(`   - Cities: ${Object.keys(initialData.cities).length} document(s)`);

    } catch (error) {
        console.error('❌ Error importing data:', error);
        throw error;
    }
}

// Run the import
importData()
    .then(() => {
        console.log('\n✨ Import completed. You can now close this script.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Import failed:', error);
        process.exit(1);
    });
