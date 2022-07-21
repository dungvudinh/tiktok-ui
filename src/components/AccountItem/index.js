import classNames from "classnames/bind";
import styles from './AccountItem.module.scss';
import {icons} from '~/assets';
import Image from "~/components/Image";
const cx = classNames.bind(styles);
function AccountItem({profile}) {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <Image src={profile.photo_url}/>
            </div>  
            <div className={cx('infor')}>
                <p className={cx('nick-name')}>
                    {profile.user_name}
                    <img src={icons.iconVerify} alt="" className={cx('icon-verify')} hidden={!JSON.parse(profile.tick)} />
                </p>
                <h4 className={cx('full-name')}>{profile.full_name}</h4>
            </div>
        </div>
     );
}

export default AccountItem;