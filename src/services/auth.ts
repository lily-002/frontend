export const encallAppKey = () => "qwertyuiopasdfghjklzxcvbnm";

export const setToken = (token: string) => {
    localStorage.setItem("ecToken", JSON.stringify(token));
}

export const getToken = () => {
    const token = localStorage.getItem("ecToken");
    if(token){ return JSON.parse(token) as string}
    return "";
}

export const removeToken = () => {
    localStorage.removeItem("ecToken");
}

// export const setResetStatus = (status: string) => {
//     localStorage.setItem("resetStatus", JSON.stringify(status));
// }

// export const getResetStatus = () => {
//     const resetStatus = localStorage.getItem("resetStatus");
//     if(resetStatus){ return JSON.parse(resetStatus) as string;}
//     return "";
// }

// export const removeResetStatus = () => {
//     localStorage.removeItem("resetStatus");
// }

// export const setResetToken = (token: string) => {
//     localStorage.setItem("rsToken", JSON.stringify(token));
// }

// export const getResetToken = () => {
//     const token = localStorage.getItem("rsToken");
//     if(token){ return JSON.parse(token) as string}
//     return "";
// }

// export const removeResetToken = () => {
//     localStorage.removeItem("rsToken");
// }

