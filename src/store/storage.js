export const  storage= 
 {
        setItem(value)
        {
            const prevState= JSON.parse(localStorage.getItem('initState'));
            return localStorage.setItem('initState',JSON.stringify({...prevState,...value }));
        },
        getItem()
        {
            return JSON.parse(localStorage.getItem('initState'))
        }
    }