import config from '~/config';
import { GoogleAuthProvider,signInWithPopup  } from "firebase/auth";
const signInWithGoogle= async ()=>
{
    const provider = new GoogleAuthProvider();
    try 
    {
        const result = await signInWithPopup(config.authentication, provider)
        return result;
    }
    catch(error)
    {
        if(error) return null;
    }
   
}



function login(type)
{
    switch(type)
    {
        case 'email':
        case 'google': 
            return signInWithGoogle();
        default: 
            throw new Error('Invalid type');
    }
}

export default login;