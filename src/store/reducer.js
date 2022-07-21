import { LOG_IN, LOG_OUT, POPUP_DIALOG } from "./contance";
import { storage } from "./storage";
import axiosClient from "~/API/axiosClient";
// localStorage.setItem('initState', JSON.stringify({isLogin:false}))
const initState ={
    isShowDialog:false,
    isLogin:JSON.parse(localStorage.getItem('initState')).isLogin, 
}
function reducer(state, action)
{
    var newState;
    switch(action.type)
    {
        case POPUP_DIALOG: 
            newState= {...state,isShowDialog:!state.isShowDialog};
            break;
        case LOG_IN: 
                newState = {...state, isLogin:true};
                storage.setItem({isLogin:true});
            break;
        case LOG_OUT: 
            newState = {...state, isLogin:false};
            storage.setItem({isLogin:false});
            break;
        default: 
            throw new Error('invalid action');
    }
    return  newState;
}

export {initState};
export default reducer;