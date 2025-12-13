"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export interface CompanyInfo {
    companyId: string;
    companyName: string;
    tagline: string;
    logo: {
        url: string;
        thumbnailURL: string;
    };
    contactInfo: {
        email: string;
        phone: string;
        whatsapp: string;
        supportEmail: string;
    };
    address: {
        registeredOffice: string;
        line1: string;
        line2: string;
        city: string;
        state: string;
        pincode: string;
        country: string;
        gstNumber: string;
    };
    aboutUs: {
        title: string;
        description: string;
        missionStatement: string;
        visionStatement: string;
    };
    socialMedia: {
        facebook: string;
        instagram: string;
        twitter: string;
        linkedin: string;
    };
    isActive: boolean;
    createdAt: any;
    updatedAt: any;
}

export function useCompanyInfo() {
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            try {
                setLoading(true);
                setError(null);

                const docRef = doc(db, 'company_info', 'hillton_baskets_main');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCompanyInfo(docSnap.data() as CompanyInfo);
                } else {
                    setError('Company information not found');
                }
            } catch (err: any) {
                console.error('Error fetching company info:', err);
                setError(err.message || 'Failed to fetch company information');
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyInfo();
    }, []);

    return { companyInfo, loading, error };
}
