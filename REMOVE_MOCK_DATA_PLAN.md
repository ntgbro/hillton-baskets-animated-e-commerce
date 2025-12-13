# 🔄 REMOVE MOCK DATA - CONNECT TO FIREBASE

## 📋 **Current Mock Data Usage:**

### **Mock Files to Remove:**
1. ❌ `src/data/products.ts` - 28KB of fake products
2. ❌ `src/data/reviews.ts` - Fake reviews  
3. ❌ `src/data/orders.ts` - Fake orders
4. ❌ `src/data/users.ts` - Fake users
5. ❌ `src/data/company.ts` - Fake company data

### **Pages Using Mock Data:**
1. `/products` - Using `@/data/products`
2. `/products/[slug]` - Using products + reviews
3. `/profile` - Using mock orders
4. `/profile/orders` - Using mock orders
5. `/about` - Using company info
6. `/contact` - Using company info
7. `/faq` - Using company info
8. `/policies/[slug]` - Using company policies

---

## 🎯 **Solution: Replace with Firebase Data**

### **Step 1: Create Firebase Hooks**

We'll create custom hooks to fetch real data from Firestore:

**Files to Create:**
1. ✅ `src/hooks/useProducts.ts` - Fetch products
2. ✅ `src/hooks/useProduct.ts` - Fetch single product
3. ✅ `src/hooks/useCategories.ts` - Fetch categories  
4. ✅ `src/hooks/useOrders.ts` - Fetch user orders
5. ✅ `src/hooks/useCompanyInfo.ts` - Fetch company data
6. ✅ `src/hooks/useReviews.ts` - Fetch product reviews

---

### **Step 2: Update Pages**

**Before (Mock Data):**
```typescript
import { products } from "@/data/products";
```

**After (Firebase):**
```typescript
import { useProducts } from "@/hooks/useProducts";

// In component
const { products, loading, error } = useProducts();
```

---

## 🚀 **Implementation Plan:**

### **Phase 1: Create Hooks** (I'll do this)
Create all Firebase data-fetch hooks

### **Phase 2: Update Pages** (I'll do this)
Update all pages to use hooks instead of mock data

### **Phase 3: Remove Mock Files** (I'll do this)
Delete all `/src/data/*.ts` files

### **Phase 4: Fix Next.js Image** (I'll do this)
Update `next.config.js` to handle Firebase/real images instead of Unsplash

---

## ✅ **What You'll Get:**

**Before:**
- ❌ Unsplash placeholder images
- ❌ Fake products that don't exist
- ❌ Mock orders that never happened
- ❌ Hardcoded company info

**After:**
- ✅ Real products from Firestore
- ✅ Actual images (or placeholders if empty)
- ✅ User's real orders
- ✅ Live company information
- ✅ Loading states
- ✅ Error handling

---

## 🎯 **Benefits:**

1. ✅ **Real Data** - Everything comes from Firebase
2. ✅ **Live Updates** - Changes in Firebase reflect immediately
3. ✅ **No 404 Errors** - No more broken Unsplash images
4. ✅ **Scalable** - Add products via admin panel
5. ✅ **Production Ready** - Works with real users

---

## 📝 **Next Steps:**

**I will:**
1. Create all Firebase hooks
2. Update all pages
3. Remove mock data files
4. Update Next.js config
5. Test that everything works

**Time:** ~15-20 minutes  
**Result:** Fully connected to Firebase!

---

**Ready to proceed? I'll start implementing now!** 🚀
