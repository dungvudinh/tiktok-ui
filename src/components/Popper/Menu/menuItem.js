
import { useStore,actions } from "~/store";

import Button from "~/components/Button";

function MenuItem({children, to, separate})
{
    const [state, dispatch]= useStore();
    const handleLogout= ()=>
    {
        dispatch(actions.handleLogout(false));
        // window.location.reload();
    };
    return (
        <Button type='item' to={to} onClick={()=>separate && handleLogout()}>
            {children}
        </Button>
    )
}

export default MenuItem;