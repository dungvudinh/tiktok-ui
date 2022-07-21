import  {useContext, useState, useEffect} from 'react';
import Context from './context';
const useStore=  ()=>
{
    const [state, dispatch]=  useContext(Context);
    return [state, dispatch];   
}
const useDebounce = (value ,delay)=>
{
    const [debounce, setDebounce] = useState(value);
    useEffect(()=>
    {
        const timer = setTimeout(()=>setDebounce(value), delay);
        return ()=>clearTimeout(timer);
    }, [value])
    return debounce;
}

export {useStore, useDebounce};  