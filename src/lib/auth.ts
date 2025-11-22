import { User, mockUsers } from "@/data/users";

const USER_STORAGE_KEY = "hillton_user";

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;
  try {
    const user = localStorage.getItem(USER_STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const saveUser = (user: User | null): void => {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
};

export const login = (email: string, password: string): User | null => {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );
  if (user) {
    saveUser(user);
    return user;
  }
  return null;
};

export const logout = (): void => {
  saveUser(null);
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const updateUserProfile = (updates: Partial<User>): User | null => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const updatedUser = { ...currentUser, ...updates };
  saveUser(updatedUser);
  return updatedUser;
};
