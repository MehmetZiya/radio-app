import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from '../css/Register.module.css';


const EditUser = () => {
    const { loggedUser, editUser} = useContext(UserContext);
    const [ password, setPassword] = useState("");
    const [ newPassword, setNewPassword] = useState("");
    const [ confirmNewPassword, setConfirmNewPassword] = useState("");
    const  [showEditMsg, setShowEditMsg] = useState(false);
    const  [editMsg, setEditMsg] = useState("");
    const [ editErrMsg, setEditErrMsg] = useState("");
    

    const handlePasswordChange = (e) => {setPassword(e.target.value)};
    const handleNewPasswordChange = (e) => {setNewPassword(e.target.value)};
    const handleConfirmNewPasswordChange = (e) => {setConfirmNewPassword(e.target.value)};
   
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newUser = {
            password
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
            <h3>Edit Password</h3>
    
            <div className ={styles.input}>
                <label> Current Password :</label>
                <input 
                    type="password"
                    onChange = {handlePasswordChange}
                    required
                    />

            </div>
            <div className ={styles.input}>
                <label>New Password :</label>
                <input 
                    type="password"
                    onChange = {handleNewPasswordChange}
                    required
                    />

            </div>
            <div className ={styles.input}>
                <label> Confirm New Password :</label>
                <input 
                    type="password"
                    onChange = {handleConfirmNewPasswordChange}
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