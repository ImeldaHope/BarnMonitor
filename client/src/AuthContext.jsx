import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode:"cors",
        credentials: 'include',
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchSession = async () => {    
    try{
      const res = await fetch("http://127.0.0.1:5000/check_session",{
        credentials: 'include',
        method: 'GET'
      })
      if (res.ok) {
          const {user} = await res.json()
           setUser(user)
      }else{
        throw new Error("Failed to fetch")
      }
    }catch(error){
      console.error(error)
    }
  }
    fetchSession()
      }, [])

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      const storedToken = localStorage.getItem('site');
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/");
  };

  return <AuthContext.Provider value={{ token, user, handleLogin, handleLogout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};