import {Link} from 'react-router-dom';
import styles from './Button.module.scss';
import  classNames from 'classnames/bind';
const cx =classNames.bind(styles);


function Button({children, type, size, onClick, to, href, color, ...passProps})
{
    let Comp = 'button';
    let classes;
    const props = {
        onClick, 
        ...passProps
    }
    if(to) {
        props.to =to;
        Comp = Link;
    }
    else if(href) 
    {
        props.href= href;
        Comp  = 'a';
    }
    if(type==='primary') classes= cx('wrapper', {primary:'primary'});
    else if(type==='outline') {
        if(size ==='medium') classes=cx('wrapper', {outline:'outline', medium:'medium'})
        else if(size==='large') classes= cx('wrapper', {outline:'outline', large:'large'});
        else if(size==='max') classes= cx('wrapper', {outline:'outline', max:'max'})
        else classes =cx('wrapper', {outline:'outline'});
    }
    else if(type==='rounded') classes = cx('wrapper',{rounded:'rounded'});
    else if(type==='item') classes =cx('wrapper', {item:'item'});
    else if(type==='exit')
    {
        if(size ==='small') classes =cx('wrapper', {exit:'exit', small:'small'})
        else if(size ==='medium') classes =cx('wrapper', {exit:'exit', medium:'medium'})
    }
    return (
        <Comp {...props} className={classes} onClick={onClick} style={color ?{color} : {}}>
            {children}
        </Comp>
    )
}   

export default Button;