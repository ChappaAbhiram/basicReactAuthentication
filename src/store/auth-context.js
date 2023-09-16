import React,{useState,useEffect} from 'react';
const AuthContext = React.createContext({
token : '',
isLoggedIn : false,
login : (token )=>{},
logout : (token)=>{}
});
export const AuthContextProvider = (props)=>{
    const initialToken = localStorage.getItem('token');
    const [token,setToken] = useState(initialToken);
    const userisLoggedIn = !!token;
    const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
    let logoutTimer;
    const loginHandler = (token) =>{
        const expirationTime = new Date().getTime() + 5 * 60 * 1000; // 5 minutes
        localStorage.setItem('token',token);
        localStorage.setItem('tokenExpirationTime', expirationTime);
        setToken(token);
    }
    logoutTimer = setTimeout(() => {
        logoutHandler();
      }, 5 * 60 * 1000); // 5 minutes
    const logoutHandler = ()=>{
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpirationTime');
        clearTimeout(logoutTimer); 
    }
    useEffect(() => {
        if (tokenExpirationTime && new Date().getTime() > tokenExpirationTime) {
          logoutHandler();
        }
      }, [tokenExpirationTime]);
    
    const contextValue = {
        token : token,
        isLoggedIn : userisLoggedIn,
        login : loginHandler,
        logout :logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;