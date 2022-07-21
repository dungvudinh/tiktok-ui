import {useState, useCallback} from 'react';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; 
import MenuItem from './menuItem';
import {Wrapper as PopperWrapper} from '~/components/Popper';
import Header from './header';
const cx = classNames.bind(styles);

function Menu({children, menuItems, hideOnClick=true})
{
    const [history, setHistory]= useState([{data:menuItems}]);
    const currentMenuPage = history[history.length -1].data || history[history.length-1];
    const handleBack =useCallback(()=>setHistory(prev=>prev.slice(0, prev.length-1)));
    const handleClick =(index)=>
    {
        if(currentMenuPage[index].children) 
        {
            setHistory(prev=>[...prev,currentMenuPage[index].children]);
            document.body.style.overflow = "hidden";
        }
       
    }
    const handleHideMenu = ()=>
    {
        document.body.style.overflowY = "overlay";
        setHistory(prev=>prev.slice(0,1));
    }
    return (
        <Tippy render={attrs =>(
            <div className={cx('menu')} tabIndex= '-1' {...attrs}>
                <PopperWrapper>
                    {history.length>1 && <Header onBack={handleBack}/>}
                    <ul className={cx('menu-container')}>
                        {currentMenuPage.map((item,index)=>(
                            <li className={cx('menu-item', {separate:item.separate})} key={index} onClick={()=>handleClick(index)}>
                                <MenuItem to={item.to} separate={item.separate}>
                                    {item.icon}
                                    <span className={cx('title-item')}>{item.title}</span>
                                </MenuItem>
                            </li>
                        ))}
                    </ul>
                </PopperWrapper>
            </div>
        )}   placement='bottom-end' interactive delay={[0, 500]}  onHide ={()=>handleHideMenu()} offset={[10,10]} hideOnClick={hideOnClick}>
           {children}
        </Tippy>
    )
}

export default Menu;