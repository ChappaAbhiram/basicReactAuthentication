import React,{useState} from 'react';
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
    const loginHandler = (token) =>{
        localStorage.setItem('token',token);
        setToken(token);
    }
    const logoutHandler = ()=>{
        setToken(null);
        localStorage.removeItem('token');
    }
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