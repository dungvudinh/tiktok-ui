import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
const cx =classNames.bind(styles);


function Header({onBack})
{
    return (
        <header className={cx('menu-header')} >
            <button className={cx('back-btn')} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <p className={cx('title')}>Language</p>
        </header>
    )
}
export default memo(Header);