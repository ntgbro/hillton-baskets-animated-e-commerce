/**
 * COMPLETE DATABASE IMPORT - ALL 17 Collections + Subcollections
 * 
 * This creates sample data for EVERYTHING including:
 * - Main collections (11 with initial data)
 * - Dynamic collections (6 with sample data for reference)
 * - ALL subcollections with nested data
 */

import { db } from '@/lib/firebase';
import { collection, doc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

// Helper to create past timestamp
const createTimestamp = (daysAgo: number = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return Timestamp.fromDate(date);
};

/**
 * Import function that creates ALL collections with subcollections
 */
export async function importCompleteDatabase() {
    const results = {
        success: [] as string[],
        errors: [] as { collection: string; error: any }[]
    };

    try {
        // ===== 1. COMPANY INFO =====
        try {
            const companyData = {
                companyId: 'hillton_baskets_main',
                companyName: 'Hillton Baskets',
                tagline: 'Premium Modular Kitchen Solutions',
                logo: { url: '', thumbnailURL: '' },
                contactInfo: {
                    email: 'contact@hilltonbaskets.in',
                    phone: '+91 9876543210',
                    whatsapp: '+91 9876543210',
                    supportEmail: 'support@hilltonbaskets.in'
                },
                address: {
                    registeredOffice: 'Hillton Baskets Pvt Ltd, Bangalore',
                    line1: '123 Kitchen Street',
                    line2: 'Industrial Area, Phase 2',
                    city: 'Bangalore',
                    state: 'Karnataka',
                    pincode: '560001',
                    country: 'India',
                    gstNumber: '29AAAAA0000A1Z5'
                },
                aboutUs: {
                    title: 'About Hillton Baskets',
                    description: 'Leading manufacturer of premium modular kitchen solutions.',
                    missionStatement: 'Transform every kitchen into an organized space.',
                    visionStatement: 'India\'s most trusted kitchen solutions brand.'
                },
                socialMedia: {
                    facebook: 'https://facebook.com/hilltonbaskets',
                    instagram: 'https://instagram.com/hilltonbaskets',
                    twitter: 'https://twitter.com/hilltonbaskets',
                    linkedin: 'https://linkedin.com/company/hilltonbaskets'
                },
                isActive: true,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            await setDoc(doc(db, 'company_info', 'hillton_baskets_main'), companyData);
            results.success.push('company_info/hillton_baskets_main');
        } catch (error) {
            results.errors.push({ collection: 'company_info', error });
        }

        // ===== 2. CATEGORIES =====
        const categories = [
            { id: 'kitchen-baskets', name: 'Kitchen Baskets', sortOrder: 1 },
            { id: 'kitchen-organizers', name: 'Kitchen Organizers', sortOrder: 2 },
            { id: 'accessories', name: 'Accessories', sortOrder: 3 },
            { id: 'pull-out-baskets', name: 'Pull Out Baskets', sortOrder: 4, parentCategoryId: 'kitchen-baskets' },
            { id: 'corner-baskets', name: 'Corner Baskets', sortOrder: 5, parentCategoryId: 'kitchen-baskets' }
        ];

        for (const cat of categories) {
            try {
                await setDoc(doc(db, 'categories', cat.id), {
                    categoryId: cat.id,
                    name: cat.name,
                    description: `${cat.name} collection`,
                    imageURL: '',
                    parentCategoryId: cat.parentCategoryId || null,
                    sortOrder: cat.sortOrder,
                    isActive: true,
                    productCount: 0,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
                results.success.push(`categories/${cat.id}`);
            } catch (error) {
                results.errors.push({ collection: `categories/${cat.id}`, error });
            }
        }

        // ===== 3. PRODUCTS =====
        const products = [
            {
                id: 'HB-8T-001',
                name: '8 Tandem Pull Out Basket',
                price: 3500,
                discountedPrice: 2999,
                mrp: 4500,
                stock: 50,
                category: 'kitchen-baskets'
            },
            {
                id: 'HB-12T-002',
                name: '12 Tandem Pull Out Basket',
                price: 4500,
                discountedPrice: 3999,
                mrp: 5500,
                stock: 35,
                category: 'kitchen-baskets'
            },
            {
                id: 'HB-CO-003',
                name: 'Magic Corner Basket',
                price: 8500,
                discountedPrice: 7499,
                mrp: 10000,
                stock: 20,
                category: 'kitchen-baskets'
            }
        ];

        for (const prod of products) {
            try {
                await setDoc(doc(db, 'products', prod.id), {
                    productId: prod.id,
                    sku: prod.id,
                    name: prod.name,
                    description: `Premium quality ${prod.name.toLowerCase()}`,
                    mainImageURL: '',
                    galleryURLs: [],
                    category: prod.category,
                    subCategory: 'pull-out-baskets',
                    specifications: {
                        material: 'Stainless Steel SS304',
                        finish: 'Chrome Plated',
                        weight: '2.5 kg'
                    },
                    price: prod.price,
                    discountedPrice: prod.discountedPrice,
                    mrp: prod.mrp,
                    tax: { gstRate: 18, hsnCode: '73239990' },
                    inventory: { currentStock: prod.stock, reorderLevel: 10, maxStockLevel: 100 },
                    isAvailable: true,
                    isFeatured: true,
                    tags: ['bestseller', 'premium'],
                    avgRating: 4.5,
                    totalRatings: 20,
                    orderCount: 100,
                    status: 'active',
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
                results.success.push(`products/${prod.id}`);
            } catch (error) {
                results.errors.push({ collection: `products/${prod.id}`, error });
            }
        }

        // ===== 4. COUPONS, PROMOTIONS, SERVICES =====
        // Coupons
        try {
            await setDoc(doc(db, 'coupons', 'WELCOME20'), {
                couponId: 'WELCOME20',
                code: 'WELCOME20',
                title: 'Welcome Offer',
                description: '20% off on first order',
                type: 'percentage',
                discountValue: 20,
                minOrderAmount: 2000,
                maxDiscountAmount: 500,
                usageLimit: { totalUsage: 1000, usedCount: 0, perUserLimit: 1 },
                applicableFor: { userType: 'new_users', categories: [], products: [] },
                isActive: true,
                createdAt: serverTimestamp()
            });
            results.success.push('coupons/WELCOME20');
        } catch (error) {
            results.errors.push({ collection: 'coupons/WELCOME20', error });
        }

        // ===== PROMOTIONS =====
        try {
            // New Year Sale Promotion
            await setDoc(doc(db, 'promotions', 'newyear-sale-2026'), {
                promotionId: 'newyear-sale-2026',
                title: 'New Year Mega Sale',
                description: 'Flat 30% OFF on all kitchen baskets!',
                bannerURL: '',
                promotionType: 'seasonal',
                startDate: createTimestamp(-5),
                endDate: createTimestamp(-35),
                isActive: true,
                targetAudience: ['all'],
                createdAt: serverTimestamp()
            });
            results.success.push('promotions/newyear-sale-2026');

            // Flash Sale Promotion
            await setDoc(doc(db, 'promotions', 'flash-sale-jan'), {
                promotionId: 'flash-sale-jan',
                title: 'Flash Sale - 24 Hours Only!',
                description: 'Limited time offer on selected products',
                bannerURL: '',
                promotionType: 'flash_sale',
                startDate: createTimestamp(-2),
                endDate: createTimestamp(-3),
                isActive: false,
                targetAudience: ['customer'],
                createdAt: serverTimestamp()
            });
            results.success.push('promotions/flash-sale-jan');
        } catch (error) {
            results.errors.push({ collection: 'promotions', error });
        }

        // Services
        const services = [
            { id: 'standard-delivery', name: 'Standard Delivery', price: 100, type: 'delivery' },
            { id: 'express-delivery', name: 'Express Delivery', price: 250, type: 'delivery' },
            { id: 'installation', name: 'Installation Service', price: 500, type: 'installation' }
        ];

        for (const service of services) {
            try {
                await setDoc(doc(db, 'services', service.id), {
                    serviceId: service.id,
                    name: service.name,
                    description: service.name,
                    type: service.type,
                    pricing: { basePrice: service.price, freeAboveOrderValue: 2000 },
                    availability: { cities: ['bangalore'], pincodes: [] },
                    isActive: true,
                    createdAt: serverTimestamp()
                });
                results.success.push(`services/${service.id}`);
            } catch (error) {
                results.errors.push({ collection: `services/${service.id}`, error });
            }
        }

        // ===== 5. APP SETTINGS =====
        try {
            await setDoc(doc(db, 'app_settings', 'global_config'), {
                settingId: 'global_config',
                freeShippingThreshold: 2000,
                codAvailable: true,
                codCharges: 50,
                maxCodAmount: 50000,
                defaultShippingCharges: 100,
                taxRates: { defaultGST: 18 },
                minOrderValue: 500,
                updatedAt: serverTimestamp()
            });
            results.success.push('app_settings/global_config');
        } catch (error) {
            results.errors.push({ collection: 'app_settings', error });
        }

        // ===== 6. CITIES with ZONES subcollection =====
        try {
            // Bangalore City
            await setDoc(doc(db, 'cities', 'bangalore'), {
                cityId: 'bangalore',
                name: 'Bangalore',
                state: 'Karnataka',
                country: 'India',
                isServiceable: true,
                currency: 'INR',
                taxRate: { cgst: 9, sgst: 9 },
                status: 'active',
                createdAt: serverTimestamp()
            });
            results.success.push('cities/bangalore');

            // Zones subcollection with pincodes
            await setDoc(doc(db, 'cities', 'bangalore', 'zones', 'central'), {
                zoneId: 'central',
                name: 'Central Bangalore',
                deliveryFee: 50,
                freeDeliveryAbove: 2000,
                estimatedDays: 1,
                pincodes: ['560001', '560002', '560003', '560004', '560005'],
                isActive: true
            });
            results.success.push('cities/bangalore/zones/central');

            await setDoc(doc(db, 'cities', 'bangalore', 'zones', 'outer'), {
                zoneId: 'outer',
                name: 'Outer Bangalore',
                deliveryFee: 100,
                freeDeliveryAbove: 2500,
                estimatedDays: 2,
                pincodes: ['560066', '560067', '560068', '560100'],
                isActive: true
            });
            results.success.push('cities/bangalore/zones/outer');
        } catch (error) {
            results.errors.push({ collection: 'cities', error });
        }

        // ===== 7. WAREHOUSE with INVENTORY subcollection =====
        try {
            await setDoc(doc(db, 'warehouse', 'WH-BLR-01'), {
                warehouseId: 'WH-BLR-01',
                name: 'Bangalore Main Warehouse',
                code: 'WH-BLR-01',
                address: {
                    line1: 'Plot 45, Industrial Estate',
                    city: 'Bangalore',
                    state: 'Karnataka',
                    pincode: '560058'
                },
                contactPerson: {
                    name: 'Ramesh Kumar',
                    phone: '+91 9876543210',
                    email: 'warehouse.blr@hilltonbaskets.in'
                },
                isActive: true,
                isPrimary: true,
                totalProducts: 250,
                createdAt: serverTimestamp()
            });
            results.success.push('warehouse/WH-BLR-01');

            // Inventory subcollection
            await setDoc(doc(db, 'warehouse', 'WH-BLR-01', 'inventory', 'HB-8T-001'), {
                inventoryId: 'HB-8T-001',
                productId: 'HB-8T-001',
                sku: 'HB-8T-001',
                name: '8 Tandem Pull Out Basket',
                currentStock: 50,
                reorderLevel: 10,
                maxStockLevel: 100,
                location: { zone: 'A', rack: 'R-01', shelf: 'S-03' },
                status: 'in_stock',
                updatedAt: serverTimestamp()
            });
            results.success.push('warehouse/WH-BLR-01/inventory/HB-8T-001');
        } catch (error) {
            results.errors.push({ collection: 'warehouse', error });
        }

        // ===== 8. SAMPLE USER with SUBCOLLECTIONS =====
        const sampleUserId = 'sample-user-demo';
        try {
            // Main user document
            await setDoc(doc(db, 'users', sampleUserId), {
                userId: sampleUserId,
                name: 'Demo Customer',
                email: 'demo@example.com',
                phone: '+91 9876543210',
                photoURL: '',
                role: 'customer',
                status: 'active',
                walletBalance: 0,
                loyaltyPoints: 100,
                totalOrders: 2,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            results.success.push(`users/${sampleUserId}`);

            // Addresses subcollection
            await setDoc(doc(db, 'users', sampleUserId, 'addresses', 'addr-home'), {
                addressId: 'addr-home',
                label: 'home',
                line1: '123 Sample Street',
                line2: 'Koramangala',
                landmark: 'Near Metro Station',
                city: 'Bangalore',
                state: 'Karnataka',
                pincode: '560001',
                contactName: 'Demo Customer',
                contactPhone: '+91 9876543210',
                isDefault: true,
                isActive: true,
                createdAt: serverTimestamp()
            });
            results.success.push(`users/${sampleUserId}/addresses/addr-home`);

            // Cart subcollection
            await setDoc(doc(db, 'users', sampleUserId, 'cart', 'active-cart'), {
                cartId: 'active-cart',
                status: 'active',
                totalAmount: 2999,
                itemCount: 1,
                addedAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            results.success.push(`users/${sampleUserId}/cart/active-cart`);

            // Cart Items subcollection (nested under cart)
            await setDoc(doc(db, 'users', sampleUserId, 'cart', 'active-cart', 'cart_items', 'item-1'), {
                itemId: 'item-1',
                productId: 'HB-8T-001',
                name: '8 Tandem Pull Out Basket',
                price: 2999,
                quantity: 1,
                totalPrice: 2999,
                imageURL: '',
                addedAt: serverTimestamp()
            });
            results.success.push(`users/${sampleUserId}/cart/active-cart/cart_items/item-1`);

            // Wishlist subcollection
            await setDoc(doc(db, 'users', sampleUserId, 'wishlist', 'wish-1'), {
                wishlistId: 'wish-1',
                productId: 'HB-CO-003',
                addedAt: serverTimestamp(),
                price: 7499
            });
            results.success.push(`users/${sampleUserId}/wishlist/wish-1`);

            // Notifications subcollection
            await setDoc(doc(db, 'users', sampleUserId, 'notifications', 'notif-1'), {
                notificationId: 'notif-1',
                title: 'Welcome to Hillton Baskets!',
                message: 'Thank you for joining us. Enjoy 20% off on your first order!',
                type: 'promotion',
                imageURL: '',
                isRead: false,
                createdAt: serverTimestamp(),
                actionURL: '/products'
            });
            results.success.push(`users/${sampleUserId}/notifications/notif-1`);
        } catch (error) {
            results.errors.push({ collection: 'users', error });
        }

        // ===== 9. SAMPLE ORDER with SUBCOLLECTIONS =====
        const sampleOrderId = 'ORD-2025-001';
        try {
            await setDoc(doc(db, 'orders', sampleOrderId), {
                orderId: sampleOrderId,
                orderNumber: 'HB2025001234',
                userId: sampleUserId,
                status: 'delivered',
                paymentStatus: 'paid',
                paymentMethod: 'UPI',
                subtotal: 2999,
                discount: 0,
                shippingCharges: 0,
                tax: { cgst: 269.91, sgst: 269.91, totalTax: 539.82 },
                totalAmount: 3538.82,
                shippingAddress: {
                    line1: '123 Sample Street',
                    city: 'Bangalore',
                    state: 'Karnataka',
                    pincode: '560001',
                    contactName: 'Demo Customer',
                    contactPhone: '+91 9876543210'
                },
                createdAt: createTimestamp(10),
                updatedAt: createTimestamp(3)
            });
            results.success.push(`orders/${sampleOrderId}`);

            // Order Items subcollection
            await setDoc(doc(db, 'orders', sampleOrderId, 'order_items', 'item-1'), {
                itemId: 'item-1',
                productId: 'HB-8T-001',
                sku: 'HB-8T-001',
                name: '8 Tandem Pull Out Basket',
                quantity: 1,
                unitPrice: 2999,
                totalPrice: 2999,
                imageURL: '',
                tax: { gstRate: 18, taxAmount: 539.82 }
            });
            results.success.push(`orders/${sampleOrderId}/order_items/item-1`);

            // Status History subcollection
            const statuses = [
                { id: 'status-1', status: 'pending', timestamp: createTimestamp(10), remarks: 'Order placed' },
                { id: 'status-2', status: 'confirmed', timestamp: createTimestamp(9), remarks: 'Order confirmed' },
                { id: 'status-3', status: 'shipped', timestamp: createTimestamp(7), remarks: 'Out for delivery' },
                { id: 'status-4', status: 'delivered', timestamp: createTimestamp(3), remarks: 'Successfully delivered' }
            ];

            for (const statusItem of statuses) {
                await setDoc(doc(db, 'orders', sampleOrderId, 'status_history', statusItem.id), {
                    statusId: statusItem.id,
                    status: statusItem.status,
                    updatedBy: 'system',
                    timestamp: statusItem.timestamp,
                    remarks: statusItem.remarks
                });
                results.success.push(`orders/${sampleOrderId}/status_history/${statusItem.id}`);
            }
        } catch (error) {
            results.errors.push({ collection: 'orders', error });
        }

        // ===== 10. SAMPLE CHAT with MESSAGES =====
        const sampleChatId = 'chat-001';
        try {
            await setDoc(doc(db, 'chats', sampleChatId), {
                chatId: sampleChatId,
                userId: sampleUserId,
                assignedTo: 'support-agent-1',
                status: 'active',
                subject: 'Product Inquiry',
                lastMessage: 'Yes, we have it in stock!',
                lastMessageAt: createTimestamp(0),
                unreadCount: { user: 0, agent: 0 },
                priority: 'medium',
                tags: ['product_info'],
                createdAt: createTimestamp(1),
                updatedAt: createTimestamp(0)
            });
            results.success.push(`chats/${sampleChatId}`);

            // Messages subcollection
            await setDoc(doc(db, 'chats', sampleChatId, 'messages', 'msg-1'), {
                messageId: 'msg-1',
                senderId: sampleUserId,
                senderType: 'user',
                message: 'Is the Magic Corner Basket available?',
                attachmentURLs: [],
                messageType: 'text',
                isRead: true,
                timestamp: createTimestamp(1)
            });
            results.success.push(`chats/${sampleChatId}/messages/msg-1`);

            await setDoc(doc(db, 'chats', sampleChatId, 'messages', 'msg-2'), {
                messageId: 'msg-2',
                senderId: 'support-agent-1',
                senderType: 'support_agent',
                message: 'Yes, we have it in stock!',
                attachmentURLs: [],
                messageType: 'text',
                isRead: true,
                timestamp: createTimestamp(0)
            });
            results.success.push(`chats/${sampleChatId}/messages/msg-2`);
        } catch (error) {
            results.errors.push({ collection: 'chats', error });
        }

        // ===== 11. SAMPLE SUPPORT TICKET with MESSAGES =====
        const sampleTicketId = 'TKT-2025-001';
        try {
            await setDoc(doc(db, 'support_tickets', sampleTicketId), {
                ticketId: sampleTicketId,
                ticketNumber: 'TKT-2025-001234',
                userId: sampleUserId,
                userEmail: 'demo@example.com',
                userName: 'Demo Customer',
                orderId: sampleOrderId,
                category: 'order_issue',
                priority: 'medium',
                status: 'resolved',
                title: 'Order Delivery Query',
                description: 'When will my order be delivered?',
                attachmentURLs: [],
                assignedTo: 'support-agent-1',
                resolution: 'Order delivered successfully',
                rating: 5,
                feedback: 'Great support!',
                createdAt: createTimestamp(5),
                updatedAt: createTimestamp(3),
                resolvedAt: createTimestamp(3)
            });
            results.success.push(`support_tickets/${sampleTicketId}`);

            // Messages subcollection
            await setDoc(doc(db, 'support_tickets', sampleTicketId, 'messages', 'msg-1'), {
                messageId: 'msg-1',
                senderId: sampleUserId,
                senderType: 'user',
                message: 'When will my order be delivered?',
                attachmentURLs: [],
                isRead: true,
                timestamp: createTimestamp(5)
            });
            results.success.push(`support_tickets/${sampleTicketId}/messages/msg-1`);

            await setDoc(doc(db, 'support_tickets', sampleTicketId, 'messages', 'msg-2'), {
                messageId: 'msg-2',
                senderId: 'support-agent-1',
                senderType: 'support_agent',
                message: 'Your order is out for delivery and will reach you today!',
                attachmentURLs: [],
                isRead: true,
                timestamp: createTimestamp(4)
            });
            results.success.push(`support_tickets/${sampleTicketId}/messages/msg-2`);
        } catch (error) {
            results.errors.push({ collection: 'support_tickets', error });
        }

        // ===== 12. SAMPLE GUEST SUPPORT TICKET with MESSAGES =====
        const sampleWebTicketId = 'WEB-2025-001';
        try {
            await setDoc(doc(db, 'support_tickets_web', sampleWebTicketId), {
                ticketId: sampleWebTicketId,
                ticketNumber: 'WEB-2025-001234',
                guestEmail: 'guest@example.com',
                guestName: 'Guest User',
                guestPhone: '+91 9999999999',
                orderNumber: '',
                category: 'product_inquiry',
                priority: 'low',
                status: 'open',
                title: 'Product Availability',
                description: 'Do you deliver to Mumbai?',
                attachmentURLs: [],
                assignedTo: '',
                resolution: '',
                ipAddress: '192.168.1.1',
                userAgent: 'Mozilla/5.0',
                createdAt: createTimestamp(1),
                updatedAt: createTimestamp(1)
            });
            results.success.push(`support_tickets_web/${sampleWebTicketId}`);

            // Messages subcollection
            await setDoc(doc(db, 'support_tickets_web', sampleWebTicketId, 'messages', 'msg-1'), {
                messageId: 'msg-1',
                senderType: 'guest',
                senderName: 'Guest User',
                senderEmail: 'guest@example.com',
                message: 'Do you deliver to Mumbai?',
                attachmentURLs: [],
                isRead: false,
                timestamp: createTimestamp(1)
            });
            results.success.push(`support_tickets_web/${sampleWebTicketId}/messages/msg-1`);
        } catch (error) {
            results.errors.push({ collection: 'support_tickets_web', error });
        }

        // ===== 13. SAMPLE PAYMENT =====
        const samplePaymentId = 'PAY-2025-001';
        try {
            await setDoc(doc(db, 'payments', samplePaymentId), {
                paymentId: samplePaymentId,
                orderId: sampleOrderId,
                userId: sampleUserId,
                amount: 3538.82,
                method: 'UPI',
                provider: 'Razorpay',
                status: 'success',
                gatewayTransactionId: 'pay_123456789',
                gatewayResponse: {
                    code: 'SUCCESS',
                    message: 'Payment successful'
                },
                timestamp: createTimestamp(10),
                fees: { gatewayFee: 0, platformFee: 0 }
            });
            results.success.push(`payments/${samplePaymentId}`);
        } catch (error) {
            results.errors.push({ collection: 'payments', error });
        }

        // ===== 14. ADMIN ALERTS =====
        try {
            await setDoc(doc(db, 'admin_alerts', 'alert-001'), {
                alertId: 'alert-001',
                title: 'Low Stock Alert',
                message: 'Magic Corner Basket is running low on stock',
                type: 'low_stock',
                severity: 'warning',
                isRead: false,
                isResolved: false,
                relatedEntity: {
                    type: 'product',
                    id: 'HB-CO-003',
                    name: 'Magic Corner Basket'
                },
                actionRequired: true,
                actionURL: '/admin/products/HB-CO-003',
                assignedTo: [],
                createdAt: serverTimestamp()
            });
            results.success.push('admin_alerts/alert-001');
        } catch (error) {
            results.errors.push({ collection: 'admin_alerts', error });
        }

        // ===== 15. INVOICES =====
        try {
            await setDoc(doc(db, 'invoices', 'INV-2025-001'), {
                invoiceId: 'INV-2025-001',
                invoiceNumber: 'INV-2025-001234',
                orderId: sampleOrderId,
                userId: sampleUserId,
                customerDetails: {
                    name: 'Demo Customer',
                    email: 'demo@example.com',
                    phone: '+91 9876543210'
                },
                items: [
                    {
                        productName: '8 Tandem Pull Out Basket',
                        sku: 'HB-8T-001',
                        quantity: 1,
                        unitPrice: 2999,
                        taxRate: 18,
                        taxAmount: 539.82,
                        totalPrice: 2999
                    }
                ],
                amountBreakdown: {
                    subtotal: 2999,
                    discount: 0,
                    shippingCharges: 0,
                    cgst: 269.91,
                    sgst: 269.91,
                    totalTax: 539.82,
                    grandTotal: 3538.82
                },
                paymentDetails: {
                    method: 'UPI',
                    transactionId: 'pay_123456789',
                    paidAt: createTimestamp(10)
                },
                invoiceDate: createTimestamp(10),
                status: 'paid',
                createdAt: createTimestamp(10)
            });
            results.success.push('invoices/INV-2025-001');
        } catch (error) {
            results.errors.push({ collection: 'invoices', error });
        }

    } catch (error) {
        console.error('Error during import:', error);
        throw error;
    }

    return results;
}
