
import { NavLink} from 'react-router-dom' ;
import { useContext, useState, useRef } from "react" ;
import { useHistory } from 'react-router-dom';
import OutsideClick from './OutsideClick';
import styles from '../css/Navbar.module.css' ;
import { UserContext } from '../contexts/UserContext';
import {HomeFilled, CompassFilled,SlidersFilled, ToolFilled, MenuOutlined,CloseCircleOutlined} from '@ant-design/icons';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Navbar = () => {
    
    const { loggedUser, logoutUser } = useContext(UserContext);
    const [ showDropdown, setShowDropdown] = useState(false);
    const navRef = useRef();
    const history = useHistory();

    const handleLogout = () => {
        logoutUser();
        setShowDropdown(false);
        history.push("/");
    }
    const handleClick = () => {
        setShowDropdown(!showDropdown);
    };
    const handleLinkClick = () => {
        setShowDropdown(false);
    }
    const handleClickOutside = () => {
        setShowDropdown(false);
    };
    
    OutsideClick(handleClickOutside, navRef);


    
    return ( 

        
            <nav className={`${styles.navbar} ${showDropdown && styles.dropstatus}`} ref={navRef}>
                { !showDropdown && (
                    <div className = {styles.logoLink}>
                    <NavLink to="/"> { <img className={styles.logoImg} 
                        src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F1.bp.blogspot.com%2F-cQX-WwGwSV4%2FTkwjHZv8w0I%2FAAAAAAAAB8s%2Fw3yltGMGEP4%2Fs500%2FSveriges%2BRadio%2Bemblem.png&f=1&nofb=1" 
                        alt="logo" />}</NavLink>
                </div>
                )}
                
                
                <div className = {styles.menu}>
                    <NavLink className = {styles.navItem} to="/"><HomeFilled className={styles.anticon}/> Home</NavLink>
                    <NavLink className = {styles.navItem} to="/channels"><QueueMusicIcon className={styles.icon}/> Channels</NavLink>
                    <NavLink className = {styles.navItem} to="/programs"><CompassFilled className={styles.anticon}/> Programs</NavLink>
                    <NavLink className = {styles.navItem} to="/categories"><SlidersFilled className={styles.anticon} /> Categories</NavLink>
                    <NavLink className = {styles.navItem} to="/users/mypage"><ToolFilled className={styles.anticon}/> My Page</NavLink>
                    { loggedUser ? ( 
                        <span>
                            <NavLink className = {styles.navItem} to="/" onClick={handleLogout}><ExitToAppIcon className={styles.icon} />Logout </NavLink>
                        </span>
                    
                    ) : (
                    <span>
                        <NavLink className = {styles.navItem} to="/login"><AccountCircleIcon className={styles.icon}/> Login</NavLink>
                    </span>
                    )}
                </div>

                {!showDropdown && <MenuOutlined onClick={handleClick} className={`${styles.baricon}  ${showDropdown && styles.menubar}` }/>}
                {showDropdown && (
                    <div className = {styles.dropMenu}>
                        <CloseCircleOutlined onClick={handleClick} className={styles.closeIcon} />
                        <NavLink onClick={handleLinkClick} className = {styles.navItem} to="/"> Home <HomeFilled className={styles.anticon}/></NavLink>
                        <NavLink onClick={handleLinkClick} className = {styles.navItem} to="/channels"> Channels <QueueMusicIcon className={styles.icon}/> </NavLink>
                        <NavLink onClick={handleLinkClick} className = {styles.navItem} to="/programs"> Programs <CompassFilled className={styles.anticon}/> </NavLink>
                        <NavLink onClick={handleLinkClick} className = {styles.navItem} to="/categories"> Categories <SlidersFilled className={styles.anticon} /> </NavLink>
                        <NavLink onClick={handleLinkClick} className = {styles.navItem} to="/users/mypage"> My Page <ToolFilled className={styles.anticon}/></NavLink>
                        
                    { loggedUser ? ( 
                        <span>
                            <NavLink className = {styles.navItem} to="/" onClick={handleLogout}> Logout <ExitToAppIcon className={styles.icon} /> </NavLink>
                        </span>
                    
                    ) : (
                    <span>
                        <NavLink onClick={handleLinkClick} className = {styles.navItem} to="/login"> Login <AccountCircleIcon className={styles.icon}/> </NavLink>
                    </span>
                    )}
                </div>
                )}
            </nav>
           
      
    );
}
 
export default Navbar;