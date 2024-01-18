import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const initialState = {
    user: {username:'Deepak'},
    theme: 'autumn',
}
const themes = {
    autumn: 'autumn',
    dim: 'dim',
}
const getThemeFromLocalStorage = () =>{
    const theme =  localStorage.getItem('theme') || themes.dim;
    document.documentElement.setAttribute('data-theme', theme);
    return theme;
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            console.log(action.payload);
          },
        logoutUser: (state)=>{
            console.log("logout");
            state.user = null;
            localStorage.removeItem(state.users);
            toast.success("Logged out Successfully");
        },
        toggleTheme: (state)=>{

            console.log("toggleTheme");
            const {dim, autumn} = themes;
            state.theme = state.theme === dim?autumn:dim;
            document.documentElement.setAttribute('data-theme', state.theme);
            localStorage.setItem('theme', state.theme);
        }

    }
});
export const {loginUser, logoutUser, toggleTheme} = userSlice.actions;
export default userSlice.reducer;