import {useState,   useLayoutEffect} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import Headless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; 
import styles from './Header.module.scss';
import {images, icons} from '~/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsisVertical, faLanguage, faCircleQuestion, faKeyboard, 
faQrcode} 
from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import DialogForAll from '~/components/Dialog';
import login from '~/login';
import {useStore ,actions} from '~/store';
import {IconMessage, IconInbox, IconUser, IconTikTok, IconLanguage, IconSetting, IconQuestion, IconKeyboard, IconLogout, IconLike, IconComment, IconMention
,IconInboxL, IconUserL} from '~/components/Icons';
import Search from  '~/components/Search';
import Image from '~/components/Image';
import {Wrapper as PopperWrapper} from '~/components/Popper';
import * as request from '~/API/tiktokAPI';
import config from '~/config';
import { useEffect } from 'react';
const cx = classNames.bind(styles);
//example

const MENU_ITEM = [
    {
        icon:<FontAwesomeIcon icon={faLanguage}/>, 
        title:'English', 
        children:{
            title:'Language',
            data:[
                {
                    code:'en',
                    title:'English',
                    children:{
                        data:[
                            {
                                title:'test'
                            }
                        ]
                    }
                },
                {
                    code:'vi',
                    title:'Vietnamese'
                },
                {
                    code:'', 
                    title:'Deutsch'
                },
                {
                    code:'',
                    title:'Suomi'
                },
                {
                    code:'',
                    title:'Magyar'
                },
               
               
            ]
        }
    },
    {
        icon:<FontAwesomeIcon icon={faCircleQuestion}/>,
        title:'Feedback and help',
        to:'/feedback'
    },
    {
        icon:<FontAwesomeIcon icon={faKeyboard}/>,
        title:'Keyboard shortcuts'
    }
]

const PLATFORM =[
    {
        title:'login',
        data:[
            {
                title:'Use QR code',
                type:'code',
                icon:<FontAwesomeIcon icon={faQrcode}/>
            },
            {
                title:'Continue with Google',
                type:'google',
                icon:<img src={icons.iconGoogle}/>
            },
        ]
    },
    {
        title:'sign up', 
        data:[
            {
                title:'Use QR code',
                icon:<FontAwesomeIcon icon={faQrcode}/>
            }, 
            {
                title:'Continue with Google',
                icon:<img src={icons.iconGoogle}/>
            },
        ]
    }
   
  
]
const PROFILE =[
    {
        title:'View profile', 
        icon:<IconUser />
    },
    {
        title:'Get coins',
        icon:<IconTikTok />
    },
    {
        title:'Settings',
        icon:<IconSetting />
    },
    {
        title:'Language',
        icon:<IconLanguage />, 
        children:MENU_ITEM[0].children
    },
    {
        title:'Feedback and help',
        icon: <IconQuestion />
    },
    {
        title:'Keyboard shortcuts',
        icon:<IconKeyboard />
    },
    {
        title:'Log out', 
        icon:<IconLogout />,
        separate:true
    }
]
const NOTI = [
    {
        title:'All',
        contentError:{
            icon:<IconInboxL /> , 
            title:'All activity',
            desc:'Notifications about your account will appear here.'
        }
    },
    {
        title:'Likes',
        contentError:{
            icon:<IconLike />,
            title:'Likes on your videos',
            desc:"When someone likes one of your videos, you'll see it here"
        }
    }, 
    {
        title:'Comments', 
        contentError:{
            icon: <IconComment />,
            title:'Comments on your videos',
            desc:"When someone comments on one of your videos, you'll see it here"
        }
    }, 
    {
        title:'Mentions', 
        contentError:
        {
            icon:<IconMention />,
            title:'Mentions of you',
            desc:"When someone mentions you, you'll see it here"
        }
    },
    {
        title:'Followers',
        contentError:{
            icon:<IconUserL />,
            title:'New followers',
            desc:"When someone new follows you, you'll see it here"
        }
    }
]
 function Header() {
    const [state, dispatch]= useStore();
    const [index, setIndex]= useState(0);
    const [currentUser, setCurrentUser]= useState(null);
    const listPlatform= PLATFORM[index].data;
    const [isShowMenu, setIsShowMenu] =  useState(false);
    const [currentPageNoti, setCurrentPageNoti]= useState(0);
    const handleAuth = async (type)=>
    {
        const result = await login(type);
        request.checkInfor('/user/insert', {uid:result.user.providerData[0].uid});
        dispatch(actions.handleLogin());
        window.location.reload();
    }   
    useLayoutEffect(()=>
    {
        if(state.isLogin===true)
        {
            request.getProfile('/user/current')
            .then(([profile])=>setCurrentUser(profile))
        }
    },[])
    const handleLogin =()=>dispatch(actions.setOpenDialog());
    useEffect(()=>
    {
        if(isShowMenu) document.body.style.overflow= 'hidden';
        else document.body.style.overflowY= 'overlay';
    },[isShowMenu])
    return ( 
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>    
                    <Link to={config.routes.home}>
                        <img src={images.logo} alt='TikTok'></img>
                    </Link>
                </div>
                {/* search */}
                <Search />
                <div className={cx('right')}>
                        <Button  size='medium' type='outline'>
                            <FontAwesomeIcon icon={faPlus} className= {cx('icon-upload')}/>
                            <h3 className={cx('text')}>Upload</h3>
                        </Button>
                       { state.isLogin ? (
                            <>
                            <Tippy content='Messages'>
                                <button className={cx('btn-message')}>
                                        <IconMessage />
                                </button>
                            </Tippy>
                            <Headless render={attrs =>(
                                <div className={cx('container-inbox')} tabIndex= '-1' {...attrs}>
                                    <PopperWrapper>
                                        <div className={cx('header-container')}>
                                            <h2 className={cx('title')}>Notifications</h2>
                                            <ul className={cx('group-container')}>
                                                {NOTI.map((item, index)=>(
                                                    <li className={cx('group-item')} key={index} onClick={()=>setCurrentPageNoti(index)} 
                                                    style={ index===currentPageNoti ? {backgroundColor:'rgb(22,24,35)'} :{}}>
                                                        <Button type='rounded' color={index===currentPageNoti  ? 'rgb(255,255,255)' : ''}>
                                                            {item.title}
                                                        </Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className={cx('content-container')}>
                                            <div className={cx('error-container')}>
                                                    {NOTI[currentPageNoti].contentError.icon}
                                                <h3 className={cx('error-title')}>
                                                    {NOTI[currentPageNoti].contentError.title}
                                                </h3>
                                                <p className={cx('error-desc')}>
                                                    {NOTI[currentPageNoti].contentError.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </PopperWrapper>
                                </div>
                            )}   placement='bottom-end' interactive delay={[0, 500]}   offset={[70,5]} visible={isShowMenu} onClickOutside={()=>setIsShowMenu(false)}
                            appendTo={()=>document.body}>
                                <Tippy content='Inbox'>
                                        <button className={cx('btn-inbox')} onClick={()=> setIsShowMenu(prev=>!prev)}>
                                            <IconInbox />
                                        </button>
                                </Tippy>
                            </Headless>
                            <Menu menuItems={PROFILE} hideOnClick={false}>
                                <Image src={currentUser && currentUser.photo_path} alt=""/>
                            </Menu>
                            </>
                        ) : <>
                            <Button type='primary' onClick ={handleLogin}>
                                <h3 className={cx('text')}>Log in</h3>
                            </Button>
                            <Menu menuItems={MENU_ITEM}>
                                <button className={cx('button-menu')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical}/>
                                </button>
                            </Menu>
                        </>
                        }
                        
                </div>
            </div>
           <DialogForAll modalName='login-modal' size='medium'>
                    <div className={cx('login-container')}>
                        <div  className={cx('item')}>
                               <h2 className={cx('title')}>Log in to TikTok</h2>
                        </div>
                        {listPlatform.map((item,index)=>(
                         <div className={cx('item')} key={index}>
                            <Button key={index} type='outline' size='max' onClick={()=>handleAuth(item.type)}>
                                {item.icon}
                                <span className={cx('title')}>{item.title}</span>
                            </Button>
                         </div>
                        ))}
                    </div>
                    <footer className={cx('footer')}>
                        <div className={'title'}>Don't have an account? </div>
                        <a href="/signup" className={cx('link-text')}>Sign up</a>
                    </footer>
           </DialogForAll>
        </header>
     );
}

export default Header;