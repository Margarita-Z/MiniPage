export const getUser = () => {
    const user = localStorage.getItem("user");
    if(user) return JSON.parse(user);
    else return null;
}

export const getToken = () => {
    return localStorage.getItem("token") || null;
}

export const setUserStorage = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
}

export const removeUserStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");   
   
}