import {
    type ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
  } from "react";
  // import { User } from "../types/users";
  
  interface User {
    email : string
    password : string
  }
  
  interface IAuthContextProps {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User;
  }
   
  interface IAuthProviderProps {
    children: ReactNode;
  }

  
  
  const initialValues: IAuthContextProps = {
    isAuthenticated: false,
    isLoading: true,
    user: null!,
  };
  
  const AuthContext = createContext(initialValues);
  
  export const AuthContextProvider : React.FC<IAuthProviderProps> = ({
    children,
  }) => {
    // const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(initialValues.isLoading);
    const [isAuthenticated, setIsAuthenticated] = useState(
      initialValues.isAuthenticated
    );
    const [user, setUser] = useState(initialValues.user);
    const checkAuth = useCallback(() => {
      const userToken = localStorage.getItem("token");
      if (userToken) {
        setIsAuthenticated(true);
  
        // use getMe api. (if ok => "storage user info in user state" else token not valid => "clear localStorage then go to login page.")
      }
      setIsLoading(false);
    }, []);
  
    useEffect(() => {
      checkAuth();
    }, []);
  
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          isLoading,
          user,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  // Create a custom hook to access  the auth context
  export const useAuthContext = () => useContext(AuthContext);
  