# Google Sign-In Setup Guide 🔐

## ✅ What's New

Google Sign-In buttons have been added to both:
- **Login Page** (`/auth/login`)
- **Signup Page** (`/auth/signup`)

---

## 🔧 Firebase Console Setup (REQUIRED)

Before you can use Google Sign-In, you need to enable it in your Firebase Console:

### **Step 1: Enable Google Provider**

1. Go to [Firebase Console](https://console.firebase.com/)
2. Select your project: **hilltonbaskets-1c8c4**
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Google** in the providers list
5. Click the **Enable** toggle
6. **Project support email**: Select your email from the dropdown
7. Click **Save**

That's it! Google Sign-In is now enabled.

---

## 🧪 Testing Google Sign-In

### **On Signup Page:**
1. Go to `http://localhost:3000/auth/signup`
2. Click the **"Sign up with Google"** button
3. Select your Google account
4. Grant permissions
5. You'll be automatically signed up and redirected to the home page
6. Check Firebase Console → Authentication → Users to see your Google account listed

### **On Login Page:**
1. Go to `http://localhost:3000/auth/login`
2. Click the **"Sign in with Google"** button
3. Select your Google account
4. You'll be logged in and redirected to the home page

---

## 🎨 UI Features

### **Signup Page:**
- Full registration form (name, email, phone, password)
- **OR**
- Quick Google Sign-In button with Chrome icon
- Beautiful separator: "Or continue with"

### **Login Page:**
- Email/password login form
- **OR**
- Quick Google Sign-In button
- Demo credentials section (for testing email/password)

---

## 🔒 How It Works

1. **Google Provider**: Firebase handles the entire Google OAuth flow
2. **Popup Window**: User signs in via Google's secure popup
3. **Auto Account Creation**: If it's a new user, Firebase creates the account automatically
4. **Session Management**: Firebase maintains the session just like email/password auth
5. **User Object**: The same `User` object in AuthContext works for both methods

---

## 🐛 Troubleshooting

### "Google Sign-In is not configured"
- Make sure you enabled Google provider in Firebase Console
- Wait 1-2 minutes after enabling for changes to propagate

### "Popup blocked by browser"
- Allow popups for localhost in your browser settings
- Try clicking the button again

### "Auth domain is not whitelisted"
- This shouldn't happen with Firebase, but if it does:
- Go to Firebase Console → Authentication → Settings
- Check that your domain is in the authorized domains list

---

## 📱 Production Deployment

When deploying to production, you'll need to:

1. Add your production domain to Firebase authorized domains:
   - Firebase Console → Authentication → Settings → Authorized domains
   - Add your domain (e.g., `yourapp.com`)

2. No code changes needed! Firebase automatically handles different environments.

---

## 🎯 Benefits of Google Sign-In

✅ **No password to remember** - Users sign in with existing Google account  
✅ **Faster signup** - One click instead of filling a form  
✅ **More secure** - Leverages Google's security infrastructure  
✅ **Better conversion** - Reduces signup friction  
✅ **Verified emails** - Google accounts are already verified  

Happy authenticating! 🚀
