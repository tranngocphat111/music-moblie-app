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
  signUp: (data: any) => Promise<User>; // Giữ data: any cho đến khi định nghĩa rõ ràng
  signOut: () => Promise<void>;
  error: Error | null; // THÊM: Trạng thái lỗi để hiển thị trong form
  clearError: () => void; // THÊM: Hàm xóa lỗi
}

// Khởi tạo Context với giá trị mặc định
export const AuthContext = createContext<AuthContextType | null>(null);

// Component Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null); // THÊM: State quản lý lỗi

  // Xóa lỗi
  const clearError = () => setError(null);

  useEffect(() => {
    const loadInitialState = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("userToken");
        if (storedToken) {
          setToken(storedToken);
          try {
            const fetchedUser = await fetchUserByToken(storedToken);
            setUser(fetchedUser);
          } catch (e) {
            console.error("Token không hợp lệ hoặc hết hạn:", e);
            await SecureStore.deleteItemAsync("userToken");
            setToken(null);
            setUser(null);
          }
        }
      } catch (e) {
        console.error("Lỗi khi tải trạng thái xác thực ban đầu:", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialState();
  }, []);

  const signIn = async ({
    email,
    password,
  }: AuthCredentials): Promise<User> => {
    setIsLoading(true);
    setError(null); // Xóa lỗi cũ
    try {
      const data: AuthResponse = await loginUser(email, password);

      await SecureStore.setItemAsync("userToken", data.token);
      setToken(data.token);
      setUser(data.user);
      return data.user;
    } catch (error: any) {
      const err =
        error instanceof Error
          ? error
          : new Error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: any): Promise<User> => {
    setIsLoading(true);
    setError(null);
    try {
      const response: AuthResponse = await registerUser(data);
      setToken(response.token);
      setUser(response.user);
      return response.user;
    } catch (error: any) {
      const err =
        error instanceof Error
          ? error
          : new Error("Đăng ký thất bại. Vui lòng thử lại.");
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    setError(null);
    await SecureStore.deleteItemAsync("userToken");
    setToken(null);
    setUser(null);
    setIsLoading(false);
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
  if (!context) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }
  return context;
};
