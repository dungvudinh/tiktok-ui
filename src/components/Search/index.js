import { useState, useRef, useEffect } from 'react';
import Headless from '@tippyjs/react/headless';
import { faMagnifyingGlass,faCircleXmark, faCircleNotch} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import {Wrapper as PopperWrapper} from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import axiosClient from '~/API/axiosClient';
import * as request from '~/API/tiktokAPI';
const cx =classNames.bind(styles);
function Search()
{
    const [searchResult,setSearchResult]=  useState([]);
    const [searchValue, setSearchValue]=  useState('');
    const [showResult, setShowResult]= useState(false);
    const [isLoading, setIsLoading]=  useState(false);
    const inputRef= useRef();
    useEffect(()=>
    {
        if(!searchValue.trim())
        {
            setIsLoading(false);
            return;
        } 
        setIsLoading(true);
        const timer=  setTimeout(()=>
        {
                request.getSearchResult('/user/search',{
                    q:searchValue.trim(),
                    type:'less'
                } )
                .then(res=>{
                    setIsLoading(false);
                    setSearchResult(res);
                })
        }, 1000)
       return ()=>clearTimeout(timer);
    },[searchValue])
    const handleHideResult =()=>setShowResult(false);
    const handleClear =()=>
    {
        setSearchValue(''); 
        setSearchResult([]);
        inputRef.current.focus();
    }
    const handleChange= (e)=>
    {
        if(!e.target.value.startsWith(' '))
        {
            setSearchValue(e.target.value)
        }
    }
   
    return (
        <div className={cx('center')}>
        <Headless render={attrs =>(
            <div className={cx('search-result')} tabIndex= '-1' {...attrs}>
            <PopperWrapper>
                <h3 className={cx('title-result')}>Accounts</h3>
                <ul className={cx('list-accounts-result')}>
                    {searchResult.length >0   && searchResult.map((item, index)=>(
                        <li key={index}>
                            <AccountItem profile ={{photo_url:item.photo_url, user_name:item.user_name, full_name:item.full_name, tick:item.tick}}/>
                        </li>
                    ))}
                    <li>
                        <div className={cx('more-text')}>
                            <p className={cx('content')}>View all results for "{searchValue}"</p>
                        </div>
                    </li>
                </ul>
            </PopperWrapper>
            </div>
        )} visible={showResult && searchResult.length > 0 && !isLoading} interactive onClickOutside={handleHideResult}>
        <div className={cx('search-form')}>
            <form action="" className={cx('search-input')}>
                <input type="text" className={cx('input-element')} placeholder='Search accounts and videos' spellCheck ={false} 
                 onChange={handleChange}
                value={searchValue} ref={inputRef} onFocus={()=>setShowResult(true)} name='q'/>
                {!!searchValue && isLoading===false &&
                <button className={cx('icon-clear')} onClick={handleClear}>
                    <FontAwesomeIcon icon={faCircleXmark}/>
                </button>}
                <span className={cx('span-spliter')}></span>
                {isLoading===true  && <FontAwesomeIcon icon={faCircleNotch } className={cx('icon-loading')}/> }
                <button type='submit' className={cx('button-search')} onMouseDown ={e=>e.preventDefault()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </div>
        </Headless>
    </div>
    )
}
export default Search;