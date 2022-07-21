import  {POPUP_DIALOG, LOG_IN, LOG_OUT} from './contance';
export const setOpenDialog = ()=>({type:POPUP_DIALOG});
export const handleLogin =()=>({type:LOG_IN});
export const handleLogout = () =>({type:LOG_OUT});