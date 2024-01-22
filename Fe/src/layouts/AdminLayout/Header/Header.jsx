import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Avatar from '@mui/material/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
// import { AuthContext } from '../../../contexts/AuthContex';
import axios from 'axios';

const cx = classNames.bind(styles);

function Header({ title }) {
  const [name, setName] = useState('');
  // const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get("http://localhost:8085/api/v1/auth/current-user");
        // Assuming response.data contains the user's name

        setName(response.data.name);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserName();
  }, []); // Empty dependency array to ensure it runs only once on mount

  return (
    <div className={cx('wrapHeader')}>
      <h3>{title}</h3>
      <div className={cx('group')}>
        <div className={cx('sub')}>
          <svg width="24" height="24">
            <path></path>
          </svg>
          <FontAwesomeIcon style={{ fontSize: '28px' }} icon={faCircleUser} />
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
