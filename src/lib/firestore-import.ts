/**
 * Client-Side Firestore Data Import
 * Import initial data to Firestore using the Firebase Client SDK
 * 
 * This can be run from your Next.js app
 */

import { db } from '@/lib/firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Sample initial data
export const initialData = {
    // Company Information
    companyInfo: {
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
            missionStatement: 'To transform every kitchen into an organized, functional and beautiful space.',
            visionStatement: 'To be India\'s most trusted brand for modular kitchen solutions.'
        },
        socialMedia: {
            facebook: 'https://facebook.com/hilltonbaskets',
            instagram: 'https://instagram.com/hilltonbaskets',
            twitter: 'https://twitter.com/hilltonbaskets',
            linkedin: 'https://linkedin.com/company/hilltonbaskets'
        },
        isActive: true
    },

    // Categories
    categories: [
        {
            id: 'kitchen-baskets',
            name: 'Kitchen Baskets',
            description: 'Premium modular kitchen baskets',
            sortOrder: 1,
            isActive: true,
            productCount: 0
        },
        {
            id: 'kitchen-organizers',
            name: 'Kitchen Organizers',
            description: 'Space-saving kitchen organizers',
            sortOrder: 2,
            isActive: true,
            productCount: 0
        },
        {
            id: 'accessories',
            name: 'Accessories',
            description: 'Kitchen accessories and add-ons',
            sortOrder: 3,
            isActive: true,
            productCount: 0
        }
    ],

    // App Settings
    appSettings: {
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
            message: 'We are currently under maintenance. Please check back soon.'
        },
        minOrderValue: 500,
        loyaltyPointsConfig: {
            enabled: true,
            earnRatio: 1,
            redeemRatio: 1
        },
        referralConfig: {
            enabled: false,
            referrerReward: 100,
            refereeReward: 50
        }
    },

    // Cities
    cities: [
        {
            id: 'bangalore',
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
            status: 'active'
        }
    ]
};

/**
 * Import all initial data to Firestore
 */
export async function importAllData() {
    const results = {
        success: [] as string[],
        errors: [] as { collection: string; error: any }[]
    };

    try {
        // Import Company Info
        try {
            await setDoc(doc(db, 'company_info', 'hillton_baskets_main'), {
                ...initialData.companyInfo,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            results.success.push('company_info');
        } catch (error) {
            results.errors.push({ collection: 'company_info', error });
        }

        // Import Categories
        for (const category of initialData.categories) {
            try {
                await setDoc(doc(db, 'categories', category.id), {
                    categoryId: category.id,
                    ...category,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
                results.success.push(`categories/${category.id}`);
            } catch (error) {
                results.errors.push({ collection: `categories/${category.id}`, error });
            }
        }

        // Import App Settings
        try {
            await setDoc(doc(db, 'app_settings', 'global_config'), {
                settingId: 'global_config',
                ...initialData.appSettings,
                updatedAt: serverTimestamp()
            });
            results.success.push('app_settings');
        } catch (error) {
            results.errors.push({ collection: 'app_settings', error });
        }

        // Import Cities
        for (const city of initialData.cities) {
            try {
                await setDoc(doc(db, 'cities', city.id), {
                    cityId: city.id,
                    ...city,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
                results.success.push(`cities/${city.id}`);
            } catch (error) {
                results.errors.push({ collection: `cities/${city.id}`, error });
            }
        }

    } catch (error) {
        console.error('Error during import:', error);
        throw error;
    }

    return results;
}

/**
 * Import only categories
 */
export async function importCategories() {
    const results = [];

    for (const category of initialData.categories) {
        try {
            await setDoc(doc(db, 'categories', category.id), {
                categoryId: category.id,
                ...category,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            results.push({ id: category.id, success: true });
        } catch (error) {
            results.push({ id: category.id, success: false, error });
        }
    }

    return results;
}

/**
 * Import only company info
 */
export async function importCompanyInfo() {
    try {
        await setDoc(doc(db, 'company_info', 'hillton_baskets_main'), {
            ...initialData.companyInfo,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}

/**
 * Import only app settings
 */
export async function importAppSettings() {
    try {
        await setDoc(doc(db, 'app_settings', 'global_config'), {
            settingId: 'global_config',
            ...initialData.appSettings,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}
