import { Dialog, DialogContent } from '@reach/dialog';
import "@reach/dialog/styles.css";
import styles from './Dialog.module.scss';
import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import Button from "~/components/Button";
import {useStore, actions} from '~/store'

const cx = classNames.bind(styles);


function DialogForAll({children, modalName, size})
{

    const [state, dispatch]= useStore();
    const classes =cx(modalName);
    let styled;
    if(size==='medium') styled = {width:'483px', height:'683px'};
    else if(size==='small') styled = {width:'400px', height:'280px'};
    return (
        <Dialog isOpen={state.isShowDialog}  style={{...styled, position:'relative', borderRadius:'10px', padding:0}} aria-label="close">
          <div className={classes}>
            <Button type='exit' size= 'medium' onClick={()=>dispatch(actions.setOpenDialog())}>
                <FontAwesomeIcon icon={faXmark}/>
            </Button>
              {children}
          </div>
        </Dialog>    
    )
}


export default DialogForAll;