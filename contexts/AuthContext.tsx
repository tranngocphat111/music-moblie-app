// contexts/AuthContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";
import {
  loginUser,
  registerUser,
  User,
  AuthResponse,
  fetchUserByToken,
} from "../services/authService";

interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (credentials: AuthCredentials) => Promise<User>;
  signUp: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<User>;
  signOut: () => Promise<void>;
  error: Error | null;
  clearError: () => void;
}

const TOKEN_KEY = "authToken"; // TÊN THỐNG NHẤT

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const clearError = () => setError(null);

  // TẢI LẠI TRẠNG THÁI KHI MỞ APP
  useEffect(() => {
    const loadInitialState = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
        if (storedToken) {
          setToken(storedToken);
          try {
            const fetchedUser = await fetchUserByToken(storedToken);
            setUser(fetchedUser);
          } catch (e) {
            console.error("Token không hợp lệ:", e);
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            setToken(null);
          }
        }
      } catch (e) {
        console.error("Lỗi tải token:", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialState();
  }, []);

  // ĐĂNG NHẬP
  const signIn = async ({
    email,
    password,
  }: AuthCredentials): Promise<User> => {
    setIsLoading(true);
    clearError();
    try {
      const data: AuthResponse = await loginUser(email, password);

      await SecureStore.setItemAsync(TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user);

      return data.user;
    } catch (err: any) {
      const error =
        err instanceof Error ? err : new Error("Đăng nhập thất bại");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ĐĂNG KÝ
  const signUp = async (data: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> => {
    setIsLoading(true);
    clearError();
    try {
      const response: AuthResponse = await registerUser(data);

      // LƯU TOKEN SAU KHI ĐĂNG KÝ
      await SecureStore.setItemAsync(TOKEN_KEY, response.token);
      setToken(response.token);
      setUser(response.user);

      return response.user; // TRẢ VỀ USER
    } catch (err: any) {
      const error = err instanceof Error ? err : new Error("Đăng ký thất bại");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ĐĂNG XUẤT
  const signOut = async () => {
    setIsLoading(true);
    clearError();
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } finally {
      setToken(null);
      setUser(null);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        signIn,
        signUp,
        signOut,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth phải dùng trong AuthProvider");
  return context;
};
