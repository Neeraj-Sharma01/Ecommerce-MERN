import {createContext,useState} from 'react'

export const AuthContext = createContext();

const AuthProvider({children}) => {
    const[user,setUser] = useState(null);
    const[token,setToken] = useState(
        localStorage.getItem("token") || ""
    );
    const login = (userData,jwtToken) => {
        setUser(userData);
        setToken(jwtToken);
        localStorage.setItem("token", jwtToken);
    }
    const logout = () => {
    setUser(null);

    setToken("");

    localStorage.removeItem("token");
     };

     return(
        <AuthContext.Provider value={{user,token,login,logout}}>
            {children}
        </AuthContext.Provider>
     )
}
 
export default AuthContext