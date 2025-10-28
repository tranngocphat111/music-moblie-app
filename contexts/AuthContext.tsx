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
  // THAY ĐỔI: Hàm signIn và signUp nhận một đối tượng Credentials
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
          // THỰC HIỆN: Gọi API để fetch user info dựa trên token để xác thực lại
          try {
            // Giả định fetchUserByToken là hàm gọi API để lấy thông tin user từ token
            const fetchedUser = await fetchUserByToken(storedToken);
            setUser(fetchedUser);
          } catch (e) {
            // Nếu token không hợp lệ hoặc hết hạn, xóa token và đăng xuất
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

  // THAY ĐỔI: Hàm signIn nhận đối tượng và trích xuất email/password
  const signIn = async ({
    email,
    password,
  }: AuthCredentials): Promise<User> => {
    setIsLoading(true);
    setError(null); // Xóa lỗi cũ
    try {
      // Giả định loginUser(email, password) là đúng
      const data: AuthResponse = await loginUser(email, password);

      await SecureStore.setItemAsync("userToken", data.token);
      setToken(data.token);
      setUser(data.user);
      return data.user;
    } catch (error: any) {
      // Thiết lập lỗi
      const err =
        error instanceof Error
          ? error
          : new Error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      setError(err);
      throw err; // Ném lỗi để component SignInForm có thể xử lý (ví dụ: Alert)
    } finally {
      setIsLoading(false);
    }
  };

  // THAY ĐỔI: Hàm signUp nhận đối tượng và trích xuất email/password (hoặc các trường khác)
  const signUp = async (data: any): Promise<User> => {
    setIsLoading(true);
    setError(null); // Xóa lỗi cũ
    try {
      // Giả định registerUser(data) là đúng
      const response: AuthResponse = await registerUser(data);

      await SecureStore.setItemAsync("userToken", response.token);
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
      }} // THAY ĐỔI: Thêm error và clearError
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook để sử dụng Context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }
  return context;
};
