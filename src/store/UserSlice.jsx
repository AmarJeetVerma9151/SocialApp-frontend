import { createSlice } from '@reduxjs/toolkit'


let details = JSON.parse(localStorage.getItem('blogsAuth'))

const initialState = {
  login:details? details.login : false,
  user:details? details.user : '',
  token:details? details.token : ''
}






export const UserSlice = createSlice({
  name: 'counter',
  initialState:initialState,

  reducers: {
   setState:(state,action)=>{
    console.log(action.payload);
    localStorage.setItem('blogsAuth' ,JSON.stringify({login:true, token:action.payload.token,user:""}) )
    state.login = true;
    state.token = action.payload.token
   },
   updateUser:(state,action)=>{
    console.log(action.payload)
    localStorage.setItem('blogsAuth' ,JSON.stringify({login:true,user:action.payload.user, token:state.token}) )
    state.user = action.payload.user
   },

   logout:(state,action)=>{
    localStorage.removeItem('blogsAuth');
    state.login = false;
    state.user = '';
    state.token = ''
   }
  },
})

// Action creators are generated for each case reducer function
export const { setState,updateUser,logout } = UserSlice.actions

export default UserSlice.reducer