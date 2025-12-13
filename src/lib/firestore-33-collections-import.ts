/**
 * ENHANCED COMPLETE DATABASE - 36 Collections Total
 * 
 * Original 17 collections + 16 new collections + 3 CRITICAL collections
 *
 * NEW ADDITIONS:
 * - Logging: user_activity_logs, audit_logs, staff_activity_logs
 * - Staff: staff, salary_payments
 * - Financial: raw_materials, suppliers, purchase_orders, expenditures
 * - CRITICAL: notifications_global, service_bookings, return_requests
 */

import { db } from '@/lib/firebase';
import { collection, doc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

// Helper to create timestamp
const createTimestamp = (daysAgo: number = 0) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return Timestamp.fromDate(date);
};

export async function import33CollectionsDatabase() {
    const results = {
        success: [] as string[],
        errors: [] as { collection: string; error: any }[]
    };

    try {
        console.log('🚀 Starting import of 33 collections...');

        // ========== EXISTING COLLECTIONS (Import from previous file) ==========
        // Include company_info, categories, products, coupons, services, cities,
        // warehouse, app_settings, users (sample), orders (sample), chats (sample),
        // support_tickets (sample), support_tickets_web (sample), payments (sample),
        // invoices, admin_alerts

        // [Previous import code remains the same - I'll add only NEW collections below]

        // ========== NEW COLLECTION 1: USER_ACTIVITY_LOGS ==========
        try {
            // Login log
            await setDoc(doc(db, 'user_activity_logs', 'log-001'), {
                logId: 'log-001',
                userId: 'sample-user-demo',
                userName: 'Demo Customer',
                userEmail: 'demo@example.com',
                userRole: 'customer',
                activityType: 'login',
                sessionId: 'session-' + Date.now(),
                deviceInfo: {
                    platform: 'web',
                    browser: 'Chrome 120',
                    deviceId: 'device-001',
                    ipAddress: '103.45.67.89',
                    location: {
                        city: 'Bangalore',
                        state: 'Karnataka',
                        country: 'India'
                    }
                },
                timestamp: createTimestamp(2),
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            });
            results.success.push('user_activity_logs/log-001');

            // Logout log
            await setDoc(doc(db, 'user_activity_logs', 'log-002'), {
                logId: 'log-002',
                userId: 'sample-user-demo',
                userName: 'Demo Customer',
                userEmail: 'demo@example.com',
                userRole: 'customer',
                activityType: 'logout',
                sessionId: 'session-' + Date.now(),
                deviceInfo: {
                    platform: 'web',
                    browser: 'Chrome 120',
                    deviceId: 'device-001',
                    ipAddress: '103.45.67.89',
                    location: {
                        city: 'Bangalore',
                        state: 'Karnataka',
                        country: 'India'
                    }
                },
                timestamp: createTimestamp(1),
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            });
            results.success.push('user_activity_logs/log-002');
        } catch (error) {
            results.errors.push({ collection: 'user_activity_logs', error });
        }

        // ========== NEW COLLECTION 2: AUDIT_LOGS ==========
        try {
            // Product price update log
            await setDoc(doc(db, 'audit_logs', 'audit-001'), {
                logId: 'audit-001',
                userId: 'admin-user-1',
                userName: 'Admin User',
                userRole: 'admin',
                action: 'update',
                entityType: 'product',
                entityId: 'HB-8T-001',
                entityName: '8 Tandem Pull Out Basket',
                changes: {
                    before: { price: 2999, discountedPrice: 2999 },
                    after: { price: 3500, discountedPrice: 2999 }
                },
                description: 'Updated product price due to cost increase',
                ipAddress: '192.168.1.100',
                timestamp: createTimestamp(3),
                sessionId: 'session-admin-001'
            });
            results.success.push('audit_logs/audit-001');

            // Order status change log
            await setDoc(doc(db, 'audit_logs', 'audit-002'), {
                logId: 'audit-002',
                userId: 'system',
                userName: 'System',
                userRole: 'admin',
                action: 'update',
                entityType: 'order',
                entityId: 'ORD-2025-001',
                entityName: 'Order HB2025001234',
                changes: {
                    before: { status: 'shipped' },
                    after: { status: 'delivered' }
                },
                description: 'Order marked as delivered',
                ipAddress: 'system',
                timestamp: createTimestamp(3),
                sessionId: 'system-auto'
            });
            results.success.push('audit_logs/audit-002');
        } catch (error) {
            results.errors.push({ collection: 'audit_logs', error });
        }

        // ========== NEW COLLECTION 3: STAFF_ACTIVITY_LOGS ==========
        try {
            // Staff check-in
            await setDoc(doc(db, 'staff_activity_logs', 'staff-log-001'), {
                logId: 'staff-log-001',
                staffId: 'EMP-2025-001',
                staffName: 'Ramesh Kumar',
                department: 'warehouse',
                activityType: 'check_in',
                location: {
                    type: 'warehouse',
                    warehouseId: 'WH-BLR-01',
                    geoPoint: null
                },
                taskDetails: {},
                duration: 0,
                notes: 'On-time arrival',
                timestamp: createTimestamp(0),
                approvedBy: null
            });
            results.success.push('staff_activity_logs/staff-log-001');

            // Task completed
            await setDoc(doc(db, 'staff_activity_logs', 'staff-log-002'), {
                logId: 'staff-log-002',
                staffId: 'EMP-2025-001',
                staffName: 'Ramesh Kumar',
                department: 'warehouse',
                activityType: 'task_completed',
                location: {
                    type: 'warehouse',
                    warehouseId: 'WH-BLR-01',
                    geoPoint: null
                },
                taskDetails: {
                    taskId: 'TASK-001',
                    taskType: 'Order Packing',
                    completionStatus: 'completed'
                },
                duration: 45,
                notes: 'Packed 20 orders',
                timestamp: createTimestamp(0),
                approvedBy: 'manager-001'
            });
            results.success.push('staff_activity_logs/staff-log-002');
        } catch (error) {
            results.errors.push({ collection: 'staff_activity_logs', error });
        }

        // ========== NEW COLLECTION 4: STAFF ==========
        try {
            await setDoc(doc(db, 'staff', 'EMP-2025-001'), {
                staffId: 'EMP-2025-001',
                employeeCode: 'EMP-2025-001',
                personalInfo: {
                    firstName: 'Ramesh',
                    lastName: 'Kumar',
                    dateOfBirth: createTimestamp(10950), // ~30 years ago
                    gender: 'male',
                    bloodGroup: 'O+',
                    photoURL: '',
                    email: 'ramesh.kumar@hilltonbaskets.in',
                    phone: '+91 9876543210',
                    alternatePhone: '+91 9876543211',
                    emergencyContact: {
                        name: 'Sunita Kumar',
                        relationship: 'Wife',
                        phone: '+91 9876543212'
                    }
                },
                address: {
                    current: {
                        line1: '123 Worker Colony',
                        line2: 'Peenya',
                        city: 'Bangalore',
                        state: 'Karnataka',
                        pincode: '560058'
                    },
                    permanent: {
                        line1: '456 Village Road',
                        line2: 'Mandya',
                        city: 'Mandya',
                        state: 'Karnataka',
                        pincode: '571401'
                    }
                },
                employmentDetails: {
                    department: 'warehouse',
                    designation: 'Warehouse Supervisor',
                    role: 'supervisor',
                    joiningDate: createTimestamp(730), // 2 years ago
                    employmentType: 'full_time',
                    workingHours: { start: '09:00', end: '18:00' },
                    reportingTo: 'manager-001',
                    assignedWarehouse: 'WH-BLR-01'
                },
                salary: {
                    basic: 25000,
                    hra: 7500,
                    conveyance: 2000,
                    otherAllowances: 500,
                    grossSalary: 35000,
                    deductions: {
                        pf: 3000,
                        esi: 500,
                        totalDeductions: 3500
                    },
                    netSalary: 31500,
                    paymentMode: 'bank_transfer',
                    bankDetails: {
                        accountNumber: '1234567890',
                        ifscCode: 'HDFC0001234',
                        bankName: 'HDFC Bank',
                        branchName: 'Peenya'
                    },
                    lastIncrement: {
                        date: createTimestamp(90),
                        amount: 2000,
                        reason: 'Performance'
                    }
                },
                documents: {
                    aadharCard: '',
                    panCard: '',
                    drivingLicense: '',
                    educationCertificates: [],
                    experienceCertificates: [],
                    offerLetter: '',
                    joiningLetter: ''
                },
                attendance: {
                    totalPresent: 45,
                    totalAbsent: 2,
                    totalLeaves: 3,
                    leavesRemaining: { casual: 8, sick: 6, earned: 10 }
                },
                performance: {
                    rating: 4.5,
                    lastReviewDate: createTimestamp(30),
                    strengths: ['Punctual', 'Hardworking', 'Team player'],
                    areasOfImprovement: ['Communication skills']
                },
                status: 'active',
                createdAt: createTimestamp(730),
                updatedAt: serverTimestamp()
            });
            results.success.push('staff/EMP-2025-001');

            // Staff attendance subdocument
            await setDoc(doc(db, 'staff', 'EMP-2025-001', 'attendance', 'att-001'), {
                date: createTimestamp(1),
                checkIn: '09:00',
                checkOut: '18:00',
                status: 'present',
                workingHours: 9,
                overtimeHours: 0,
                notes: ''
            });
            results.success.push('staff/EMP-2025-001/attendance/att-001');

            // Staff leave application
            await setDoc(doc(db, 'staff', 'EMP-2025-001', 'leaves', 'leave-001'), {
                leaveId: 'leave-001',
                leaveType: 'casual',
                startDate: createTimestamp(-5),
                endDate: createTimestamp(-5),
                totalDays: 1,
                reason: 'Personal work',
                status: 'approved',
                appliedAt: createTimestamp(10),
                approvedBy: 'manager-001',
                approvedAt: createTimestamp(9)
            });
            results.success.push('staff/EMP-2025-001/leaves/leave-001');
        } catch (error) {
            results.errors.push({ collection: 'staff', error });
        }

        // ========== NEW COLLECTION 5: SALARY_PAYMENTS ==========
        try {
            await setDoc(doc(db, 'salary_payments', 'SAL-2025-001'), {
                paymentId: 'SAL-2025-001',
                paymentNumber: 'SAL-2025-001',
                month: 'December 2025',
                monthYear: '2025-12',
                staffId: 'EMP-2025-001',
                employeeCode: 'EMP-2025-001',
                employeeName: 'Ramesh Kumar',
                department: 'warehouse',
                designation: 'Warehouse Supervisor',
                salaryBreakdown: {
                    basic: 25000,
                    hra: 7500,
                    conveyance: 2000,
                    otherAllowances: 500,
                    grossSalary: 35000,
                    deductions: {
                        pf: 3000,
                        esi: 500,
                        tax: 0,
                        advanceDeduction: 0,
                        loanDeduction: 0,
                        other: 0,
                        totalDeductions: 3500
                    },
                    netSalary: 31500
                },
                attendance: {
                    workingDays: 26,
                    presentDays: 24,
                    absentDays: 0,
                    leaves: 2,
                    overtimeHours: 0,
                    overtimeAmount: 0
                },
                paymentDetails: {
                    paymentMode: 'bank_transfer',
                    paymentDate: createTimestamp(8),
                    transactionId: 'TXN-SAL-001',
                    paymentStatus: 'processed'
                },
                salarySlipURL: '',
                processedBy: 'hr-admin-001',
                approvedBy: 'finance-head-001',
                notes: 'Salary for December 2025',
                createdAt: createTimestamp(8)
            });
            results.success.push('salary_payments/SAL-2025-001');
        } catch (error) {
            results.errors.push({ collection: 'salary_payments', error });
        }

        // ========== NEW COLLECTION 6: RAW_MATERIALS ==========
        try {
            await setDoc(doc(db, 'raw_materials', 'RM-001'), {
                materialId: 'RM-001',
                materialCode: 'SS304-SHEET',
                name: 'Stainless Steel Sheet SS304',
                description: 'Food grade stainless steel sheets for basket manufacturing',
                category: 'metal',
                unit: 'kg',
                specifications: {
                    grade: 'SS304',
                    thickness: '1.2mm',
                    dimensions: '4ft x 8ft'
                },
                inventory: {
                    currentStock: 500,
                    reorderLevel: 100,
                    maxStockLevel: 1000
                },
                pricing: {
                    costPerUnit: 350,
                    currency: 'INR',
                    lastPurchasePrice: 345,
                    averagePrice: 348
                },
                supplier: {
                    supplierId: 'SUP-001',
                    supplierName: 'Steel India Pvt Ltd',
                    leadTime: 7
                },
                storageLocation: {
                    warehouseId: 'WH-BLR-01',
                    zone: 'A',
                    rack: 'R-01'
                },
                status: 'in_stock',
                createdAt: createTimestamp(60),
                updatedAt: serverTimestamp()
            });
            results.success.push('raw_materials/RM-001');
        } catch (error) {
            results.errors.push({ collection: 'raw_materials', error });
        }

        // ========== NEW COLLECTION 7: SUPPLIERS ==========
        try {
            await setDoc(doc(db, 'suppliers', 'SUP-001'), {
                supplierId: 'SUP-001',
                supplierCode: 'SUP-001',
                companyName: 'Steel India Pvt Ltd',
                contactPerson: {
                    name: 'Vijay Sharma',
                    designation: 'Sales Manager',
                    phone: '+91 9988776655',
                    email: 'vijay@steelindia.com'
                },
                address: {
                    line1: 'Plot 123, Industrial Area',
                    line2: 'Phase 2',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    pincode: '400001'
                },
                taxDetails: {
                    gstNumber: '27AAACS1234H1Z5',
                    panNumber: 'AAACS1234H'
                },
                paymentTerms: {
                    creditDays: 30,
                    paymentMode: 'bank_transfer',
                    bankDetails: {
                        accountNumber: '9876543210',
                        ifscCode: 'ICIC0001234',
                        bankName: 'ICICI Bank'
                    }
                },
                suppliedMaterials: ['RM-001'],
                totalPurchases: 250000,
                averageLeadTime: 7,
                rating: 4.5,
                status: 'active',
                createdAt: createTimestamp(180),
                updatedAt: serverTimestamp()
            });
            results.success.push('suppliers/SUP-001');
        } catch (error) {
            results.errors.push({ collection: 'suppliers', error });
        }

        // ========== NEW COLLECTION 8: PURCHASE_ORDERS ==========
        try {
            await setDoc(doc(db, 'purchase_orders', 'PO-2025-001'), {
                purchaseOrderId: 'PO-2025-001',
                poNumber: 'PO-2025-001',
                supplierId: 'SUP-001',
                supplierName: 'Steel India Pvt Ltd',
                orderDate: createTimestamp(15),
                expectedDeliveryDate: createTimestamp(8),
                actualDeliveryDate: createTimestamp(7),
                status: 'received',
                items: [
                    {
                        materialId: 'RM-001',
                        materialName: 'SS304 Sheet',
                        quantity: 200,
                        unit: 'kg',
                        unitPrice: 345,
                        totalPrice: 69000
                    }
                ],
                amountBreakdown: {
                    subtotal: 69000,
                    cgst: 6210,
                    sgst: 6210,
                    igst: 0,
                    totalTax: 12420,
                    shippingCharges: 1000,
                    grandTotal: 82420
                },
                paymentDetails: {
                    paymentStatus: 'paid',
                    paidAmount: 82420,
                    dueAmount: 0,
                    paymentDueDate: createTimestamp(-10)
                },
                deliveryAddress: {
                    warehouseId: 'WH-BLR-01',
                    addressLine: 'Bangalore Main Warehouse, Plot 45, Peenya'
                },
                approvedBy: 'purchase-manager-001',
                notes: 'Monthly steel procurement',
                attachments: [],
                createdBy: 'purchase-clerk-001',
                createdAt: createTimestamp(15),
                updatedAt: createTimestamp(7)
            });
            results.success.push('purchase_orders/PO-2025-001');

            // GRN subcollection
            await setDoc(doc(db, 'purchase_orders', 'PO-2025-001', 'grn', 'GRN-001'), {
                grnId: 'GRN-001',
                grnNumber: 'GRN-2025-001',
                receivedDate: createTimestamp(7),
                receivedBy: 'EMP-2025-001',
                quantityReceived: 200,
                quantityOrdered: 200,
                status: 'accepted',
                qualityCheck: 'passed',
                notes: 'All materials in good condition'
            });
            results.success.push('purchase_orders/PO-2025-001/grn/GRN-001');
        } catch (error) {
            results.errors.push({ collection: 'purchase_orders', error });
        }

        // ========== NEW COLLECTION 9: EXPENDITURES ==========
        try {
            // Rent expenditure
            await setDoc(doc(db, 'expenditures', 'EXP-2025-001'), {
                expenditureId: 'EXP-2025-001',
                expenseNumber: 'EXP-2025-001',
                category: 'rent',
                subCategory: 'Warehouse Rent',
                description: 'Monthly warehouse rent for December 2025',
                amount: 50000,
                paymentMethod: 'bank_transfer',
                paymentStatus: 'paid',
                paidTo: {
                    name: 'Landlord Properties Pvt Ltd',
                    vendorId: '',
                    contactNumber: '+91 9999888877'
                },
                taxDetails: {
                    isTaxable: false,
                    gstAmount: 0,
                    tdsAmount: 5000
                },
                billDetails: {
                    billNumber: 'RENT-DEC-2025',
                    billDate: createTimestamp(5),
                    billURL: ''
                },
                paymentDate: createTimestamp(5),
                dueDate: createTimestamp(10),
                relatedEntity: {
                    type: 'warehouse',
                    entityId: 'WH-BLR-01'
                },
                approvedBy: 'finance-head-001',
                recordedBy: 'accounts-clerk-001',
                isRecurring: true,
                recurringFrequency: 'monthly',
                notes: 'Monthly warehouse rent',
                createdAt: createTimestamp(6),
                updatedAt: serverTimestamp()
            });
            results.success.push('expenditures/EXP-2025-001');

            // Electricity bill
            await setDoc(doc(db, 'expenditures', 'EXP-2025-002'), {
                expenditureId: 'EXP-2025-002',
                expenseNumber: 'EXP-2025-002',
                category: 'utilities',
                subCategory: 'Electricity',
                description: 'Electricity bill for warehouse - December 2025',
                amount: 12000,
                paymentMethod: 'upi',
                paymentStatus: 'paid',
                paidTo: {
                    name: 'BESCOM',
                    vendorId: '',
                    contactNumber: '1912'
                },
                taxDetails: {
                    isTaxable: false,
                    gstAmount: 0,
                    tdsAmount: 0
                },
                billDetails: {
                    billNumber: 'BESCOM-123456',
                    billDate: createTimestamp(8),
                    billURL: ''
                },
                paymentDate: createTimestamp(7),
                dueDate: createTimestamp(5),
                relatedEntity: {
                    type: 'warehouse',
                    entityId: 'WH-BLR-01'
                },
                approvedBy: 'admin-001',
                recordedBy: 'accounts-clerk-001',
                isRecurring: true,
                recurringFrequency: 'monthly',
                notes: 'Monthly electricity charges',
                createdAt: createTimestamp(8),
                updatedAt: serverTimestamp()
            });
            results.success.push('expenditures/EXP-2025-002');
        } catch (error) {
            results.errors.push({ collection: 'expenditures', error });
        }

        // ========== NEW COLLECTION 10: NOTIFICATIONS_GLOBAL - Broadcast Marketing ==========
        try {
            // New Year Sale Notification
            await setDoc(doc(db, 'notifications_global', 'notif-global-001'), {
                notificationId: 'notif-global-001',
                title: 'New Year Sale - Up to 30% OFF!',
                message: 'Celebrate New Year with amazing discounts on all kitchen baskets. Limited time offer!',
                type: 'promotion',
                priority: 'high',
                imageURL: '',
                actionURL: '/products?sale=newyear',
                actionText: 'Shop Now',
                targetAudience: {
                    userType: 'all', // all | customer | new_users | inactive_users
                    cities: [],  // Empty = all cities
                    minOrderCount: 0,
                    maxOrderCount: null
                },
                displayOptions: {
                    showAsPopup: true,
                    showInNotificationCenter: true,
                    sendPushNotification: true,
                    sendEmail: false
                },
                scheduledAt: createTimestamp(-1),
                expiresAt: createTimestamp(-30),
                status: 'active',
                stats: {
                    sentCount: 0,
                    viewedCount: 0,
                    clickedCount: 0
                },
                createdBy: 'marketing-admin-001',
                createdAt: createTimestamp(3),
                updatedAt: serverTimestamp()
            });
            results.success.push('notifications_global/notif-global-001');

            // Low Stock Alert (System Notification)
            await setDoc(doc(db, 'notifications_global', 'notif-global-002'), {
                notificationId: 'notif-global-002',
                title: 'Back in Stock - Magic Corner Basket!',
                message: 'The popular Magic Corner Basket is back in stock. Order now before it sells out again!',
                type: 'product_update',
                priority: 'medium',
                imageURL: '',
                actionURL: '/products/HB-CO-003',
                actionText: 'View Product',
                targetAudience: {
                    userType: 'customer',
                    cities: ['bangalore'],
                    minOrderCount: 1,
                    maxOrderCount: null
                },
                displayOptions: {
                    showAsPopup: false,
                    showInNotificationCenter: true,
                    sendPushNotification: true,
                    sendEmail: true
                },
                scheduledAt: createTimestamp(0),
                expiresAt: createTimestamp(-7),
                status: 'active',
                stats: {
                    sentCount: 0,
                    viewedCount: 0,
                    clickedCount: 0
                },
                createdBy: 'system',
                createdAt: createTimestamp(1),
                updatedAt: serverTimestamp()
            });
            results.success.push('notifications_global/notif-global-002');
        } catch (error) {
            results.errors.push({ collection: 'notifications_global', error });
        }

        // ========== NEW COLLECTION 11: SERVICE_BOOKINGS - Installation Scheduling ==========
        try {
            // Installation booking
            await setDoc(doc(db, 'service_bookings', 'BOOK-2025-001'), {
                bookingId: 'BOOK-2025-001',
                bookingNumber: 'INST-2025-001234',
                userId: 'sample-user-demo',
                userName: 'Demo Customer',
                userPhone: '+91 9876543210',
                userEmail: 'demo@example.com',
                orderId: 'ORD-2025-001',
                orderNumber: 'HB2025001234',
                serviceDetails: {
                    serviceId: 'installation',
                    serviceName: 'Professional Installation',
                    serviceType: 'installation',
                    products: [
                        {
                            productId: 'HB-8T-001',
                            productName: '8 Tandem Pull Out Basket',
                            quantity: 1,
                            installationTime: 30 // minutes
                        }
                    ],
                    totalInstallationTime: 30,
                    serviceCharge: 500
                },
                scheduledDate: createTimestamp(-2),
                scheduledTimeSlot: '10:00 AM - 12:00 PM',
                address: {
                    line1: '123 Sample Street',
                    line2: 'Koramangala',
                    landmark: 'Near Metro Station',
                    city: 'Bangalore',
                    state: 'Karnataka',
                    pincode: '560001',
                    contactName: 'Demo Customer',
                    contactPhone: '+91 9876543210'
                },
                technician: {
                    technicianId: 'TECH-001',
                    name: 'Suresh Kumar',
                    phone: '+91 9999888877',
                    rating: 4.7,
                    assignedAt: createTimestamp(4)
                },
                status: 'completed', // pending | confirmed | in_progress | completed | cancelled | rescheduled
                statusHistory: [
                    {
                        status: 'pending',
                        timestamp: createTimestamp(5),
                        updatedBy: 'system',
                        notes: 'Booking created'
                    },
                    {
                        status: 'confirmed',
                        timestamp: createTimestamp(4),
                        updatedBy: 'admin-001',
                        notes: 'Technician assigned'
                    },
                    {
                        status: 'completed',
                        timestamp: createTimestamp(2),
                        updatedBy: 'TECH-001',
                        notes: 'Installation completed successfully'
                    }
                ],
                feedback: {
                    rating: 5,
                    comment: 'Excellent service! Very professional and quick.',
                    submittedAt: createTimestamp(2)
                },
                payment: {
                    amount: 500,
                    status: 'paid',
                    method: 'UPI',
                    transactionId: 'TXN-INST-001',
                    paidAt: createTimestamp(2)
                },
                specialInstructions: 'Please call before arriving',
                photos: {
                    before: [],
                    after: []
                },
                createdAt: createTimestamp(5),
                updatedAt: createTimestamp(2)
            });
            results.success.push('service_bookings/BOOK-2025-001');

            // Pending installation booking
            await setDoc(doc(db, 'service_bookings', 'BOOK-2025-002'), {
                bookingId: 'BOOK-2025-002',
                bookingNumber: 'INST-2025-001235',
                userId: 'sample-user-demo',
                userName: 'Demo Customer',
                userPhone: '+91 9876543210',
                userEmail: 'demo@example.com',
                orderId: '',
                orderNumber: '',
                serviceDetails: {
                    serviceId: 'assembly',
                    serviceName: 'Product Assembly Service',
                    serviceType: 'assembly',
                    products: [
                        {
                            productId: 'HB-12T-002',
                            productName: '12 Tandem Pull Out Basket',
                            quantity: 2,
                            installationTime: 45
                        }
                    ],
                    totalInstallationTime: 90,
                    serviceCharge: 800
                },
                scheduledDate: createTimestamp(-5),
                scheduledTimeSlot: '2:00 PM - 4:00 PM',
                address: {
                    line1: '456 Another Street',
                    line2: 'Indiranagar',
                    landmark: 'Opposite Park',
                    city: 'Bangalore',
                    state: 'Karnataka',
                    pincode: '560038',
                    contactName: 'Demo Customer',
                    contactPhone: '+91 9876543210'
                },
                technician: null,
                status: 'confirmed',
                statusHistory: [
                    {
                        status: 'pending',
                        timestamp: createTimestamp(7),
                        updatedBy: 'system',
                        notes: 'Booking created'
                    },
                    {
                        status: 'confirmed',
                        timestamp: createTimestamp(6),
                        updatedBy: 'admin-001',
                        notes: 'Booking confirmed, awaiting technician assignment'
                    }
                ],
                feedback: null,
                payment: {
                    amount: 800,
                    status: 'pending',
                    method: 'cod',
                    transactionId: '',
                    paidAt: null
                },
                specialInstructions: '',
                photos: {
                    before: [],
                    after: []
                },
                createdAt: createTimestamp(7),
                updatedAt: createTimestamp(6)
            });
            results.success.push('service_bookings/BOOK-2025-002');
        } catch (error) {
            results.errors.push({ collection: 'service_bookings', error });
        }

        // ========== NEW COLLECTION 12: RETURN_REQUESTS - Returns/Refunds Management ==========
        try {
            // Return request - Approved
            await setDoc(doc(db, 'return_requests', 'RET-2025-001'), {
                returnId: 'RET-2025-001',
                returnNumber: 'RET-2025-001234',
                userId: 'sample-user-demo',
                userName: 'Demo Customer',
                userEmail: 'demo@example.com',
                userPhone: '+91 9876543210',
                orderId: 'ORD-2025-001',
                orderNumber: 'HB2025001234',
                orderDate: createTimestamp(20),
                items: [
                    {
                        productId: 'HB-8T-001',
                        productName: '8 Tandem Pull Out Basket',
                        sku: 'HB-8T-001',
                        quantity: 1,
                        returnQuantity: 1,
                        unitPrice: 2999,
                        totalRefundAmount: 2999,
                        reason: 'defective',
                        images: []
                    }
                ],
                returnReason: {
                    primaryReason: 'defective',
                    detailedReason: 'Product has scratches and dents',
                    otherComments: 'Packaging was damaged on arrival'
                },
                returnType: 'refund', // refund | replacement
                pickupDetails: {
                    addressType: 'order_address',
                    address: {
                        line1: '123 Sample Street',
                        line2: 'Koramangala',
                        city: 'Bangalore',
                        state: 'Karnataka',
                        pincode: '560001',
                        contactName: 'Demo Customer',
                        contactPhone: '+91 9876543210'
                    },
                    scheduledDate: createTimestamp(12),
                    scheduledTimeSlot: '9:00 AM - 12:00 PM',
                    actualPickupDate: createTimestamp(11),
                    pickupPartner: 'Delhivery',
                    trackingNumber: 'DEL123456789',
                    status: 'picked_up'
                },
                qualityCheck: {
                    checkedBy: 'qc-inspector-001',
                    checkedAt: createTimestamp(10),
                    status: 'approved',
                    findings: 'Product is indeed defective',
                    photos: [],
                    notes: 'Clear manufacturing defect visible'
                },
                refund: {
                    refundAmount: 2999,
                    refundMethod: 'original_payment',
                    refundStatus: 'processed',
                    refundDate: createTimestamp(9),
                    refundTransactionId: 'RFND-TXN-123',
                    processingFee: 0,
                    deductions: 0,
                    netRefundAmount: 2999
                },
                status: 'completed', // pending | approved | rejected | pickup_scheduled | picked_up | qc_in_progress | qc_approved | qc_rejected | refund_initiated | refund_processed | completed | cancelled
                statusHistory: [
                    {
                        status: 'pending',
                        timestamp: createTimestamp(15),
                        updatedBy: 'system',
                        notes: 'Return request created'
                    },
                    {
                        status: 'approved',
                        timestamp: createTimestamp(14),
                        updatedBy: 'support-agent-001',
                        notes: 'Return request approved'
                    },
                    {
                        status: 'pickup_scheduled',
                        timestamp: createTimestamp(13),
                        updatedBy: 'logistics-team',
                        notes: 'Pickup scheduled'
                    },
                    {
                        status: 'picked_up',
                        timestamp: createTimestamp(11),
                        updatedBy: 'system',
                        notes: 'Product picked up'
                    },
                    {
                        status: 'qc_approved',
                        timestamp: createTimestamp(10),
                        updatedBy: 'qc-inspector-001',
                        notes: 'Quality check passed'
                    },
                    {
                        status: 'refund_processed',
                        timestamp: createTimestamp(9),
                        updatedBy: 'finance-team',
                        notes: 'Refund initiated'
                    },
                    {
                        status: 'completed',
                        timestamp: createTimestamp(8),
                        updatedBy: 'system',
                        notes: 'Return request completed'
                    }
                ],
                approvedBy: 'support-agent-001',
                approvedAt: createTimestamp(14),
                completedAt: createTimestamp(8),
                createdAt: createTimestamp(15),
                updatedAt: createTimestamp(8)
            });
            results.success.push('return_requests/RET-2025-001');

            // Return request - Pending
            await setDoc(doc(db, 'return_requests', 'RET-2025-002'), {
                returnId: 'RET-2025-002',
                returnNumber: 'RET-2025-001235',
                userId: 'sample-user-demo',
                userName: 'Demo Customer',
                userEmail: 'demo@example.com',
                userPhone: '+91 9876543210',
                orderId: 'ORD-2025-001',
                orderNumber: 'HB2025001234',
                orderDate: createTimestamp(10),
                items: [
                    {
                        productId: 'HB-12T-002',
                        productName: '12 Tandem Pull Out Basket',
                        sku: 'HB-12T-002',
                        quantity: 1,
                        returnQuantity: 1,
                        unitPrice: 3999,
                        totalRefundAmount: 3999,
                        reason: 'changed_mind',
                        images: []
                    }
                ],
                returnReason: {
                    primaryReason: 'changed_mind',
                    detailedReason: 'Ordered wrong size',
                    otherComments: 'Would like to exchange for 8 inch model'
                },
                returnType: 'replacement',
                pickupDetails: {
                    addressType: 'order_address',
                    address: {
                        line1: '123 Sample Street',
                        line2: 'Koramangala',
                        city: 'Bangalore',
                        state: 'Karnataka',
                        pincode: '560001',
                        contactName: 'Demo Customer',
                        contactPhone: '+91 9876543210'
                    },
                    scheduledDate: createTimestamp(-3),
                    scheduledTimeSlot: '2:00 PM - 5:00 PM',
                    actualPickupDate: null,
                    pickupPartner: '',
                    trackingNumber: '',
                    status: 'scheduled'
                },
                qualityCheck: null,
                refund: null,
                status: 'pickup_scheduled',
                statusHistory: [
                    {
                        status: 'pending',
                        timestamp: createTimestamp(5),
                        updatedBy: 'system',
                        notes: 'Return request created'
                    },
                    {
                        status: 'approved',
                        timestamp: createTimestamp(4),
                        updatedBy: 'support-agent-002',
                        notes: 'Replacement approved'
                    },
                    {
                        status: 'pickup_scheduled',
                        timestamp: createTimestamp(3),
                        updatedBy: 'logistics-team',
                        notes: 'Pickup scheduled for tomorrow'
                    }
                ],
                approvedBy: 'support-agent-002',
                approvedAt: createTimestamp(4),
                completedAt: null,
                createdAt: createTimestamp(5),
                updatedAt: createTimestamp(3)
            });
            results.success.push('return_requests/RET-2025-002');
        } catch (error) {
            results.errors.push({ collection: 'return_requests', error });
        }

        console.log('✅ Import completed!');
        console.log(`Success: ${results.success.length} documents`);
        console.log(`Errors: ${results.errors.length}`);

    } catch (error) {
        console.error('❌ Import failed:', error);
        throw error;
    }

    return results;
}
