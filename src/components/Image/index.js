import { forwardRef, useState } from "react";
import classNames from "classnames/bind";
import styles from  './Image.module.scss';
import imgNoUser from '~/assets/images/no_user.png'
const cx =  classNames.bind(styles);
function Image({src,alt, ...props},ref)
{
    return (
        <img src={src || imgNoUser} alt={alt} className={cx('avatar')} ref={ref} {...props}/>
    )
}

export default forwardRef(Image);