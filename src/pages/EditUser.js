import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from '../css/Register.module.css';


const EditUser = () => {
    const { loggedUser, editUser} = useContext(UserContext);
    const [ username, setUsername] = useState("");
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const  [showEditMsg, setShowEditMsg] = useState(false);
    const  [editMsg, setEditMsg] = useState("");
    const [ editErrMsg, setEditErrMsg] = useState("");
    



    const handleUsernameChange = (e) => { setUsername(e.target.value)};
    const handleEmailChange = (e) => {setEmail(e.target.value)};
    const handlePasswordChange = (e) => {setPassword(e.target.value)};
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newUser = {
            username,email,password
        };
        let result = await editUser(loggedUser.userID, newUser);
        if (result.succes) {
            setEditMsg(result.succes);
            setShowEditMsg(true);
            setTimeout(()=>{
                setShowEditMsg(false);
            }, 2500);
            return;
        }
        if (result.error){
            setEditErrMsg(result.error);
            setShowEditMsg(true);
            setTimeout(()=>{
                setShowEditMsg(false);
            }, 2500);
            return;
        }
        
        
    };

    return ( 
        <div>
            
            { loggedUser && 
            <form className = {styles.form} onSubmit = {handleSubmit} >
            <h3>Edit Form</h3>
            <div className ={styles.input}>
                <label>Username :</label>
                <input 
                    type="text"
                    onChange = {handleUsernameChange}
                    placeholder = {loggedUser.username}
                    required/>
            </div>
            <div className ={styles.input}>
                <label>Email :</label>
                <input 
                    type="email"
                    onChange = {handleEmailChange}
                    placeholder = {loggedUser.email}
                    required/>
                    
            </div>
            <div className ={styles.input}>
                <label>Password :</label>
                <input 
                    type="password"
                    onChange = {handlePasswordChange}
                    required
                    />

            </div>
            <div className={styles.registerButton}>
                <button>Edit</button>
            </div>
            {showEditMsg && (
                <div>
                    { !editErrMsg ? <p className={styles.registerMsg}>{editMsg}</p> : <p className={styles.errorMessage}>{editErrMsg}</p>}
                </div>
                
            )}
          
        
        </form>}
        
        
        </div>
     );
}
 
export default EditUser;