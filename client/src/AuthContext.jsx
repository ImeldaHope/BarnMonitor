import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await fetch("https://barnmonitor.onrender.com/login", {
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

  const handleSignUp = async (data) => {
    try {
      const { name, email, phone, address, password } = data;
      
      const response = await fetch('https://barnmonitor.onrender.com/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, address, password })});
      const res = await response.json();
      console.log('Signup Response:', res);
      if (res.farmer) {
        setUser(res.farmer);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        localStorage.setItem("user", JSON.stringify(res.farmer));
        console.log("Navigating to dashboard");
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  }


  useEffect(() => {
    const fetchSession = async () => {    
    try{
      const res = await fetch("https://barnmonitor.onrender.com/check_session",{
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

  return <AuthContext.Provider value={{ token, user, handleLogin, handleLogout, handleSignUp }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};