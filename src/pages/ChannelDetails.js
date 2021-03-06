import { useContext, useEffect, useState } from 'react';
import { ChannelContext } from '../contexts/ChannelContext';
import { UserContext } from '../contexts/UserContext';
import { Link, useHistory } from 'react-router-dom';

import styles from '../css/ChannelDetails.module.css';


const ChannelDetails = (props) => {
    const { getChannelById, channelById  } = useContext(ChannelContext);
    const { loggedUser, addFavToDB, addFavToUser} = useContext(UserContext)
    const { channelId } = props.match.params;
    const [ showAddMsg, setShowAddMsg] = useState(false);
    const [ addMsg, setAddMsg] = useState("");
    const [ addingErrMsg , setAddingErrMsg] = useState("");
    const history = useHistory();
   
    
    

    useEffect(() => {
        getChannelById(channelId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sendFavToDB = async () => {
        let newFav = {
            favId: channelId,
            class: "Channel",
            name: channelById.name,
            imageURL : channelById.image
        };
        await addFavToDB(newFav);
        let result = await addFavToUser(loggedUser.userID, {name: channelById.name});
        if (result.success) {
            setAddMsg(result.success);
            setShowAddMsg(true);
            setTimeout(()=>{
                setShowAddMsg(false);
            }, 2500);
            return;
        }
        if (result.error){
            setAddingErrMsg(result.error);
            setShowAddMsg(true);
            setTimeout(()=>{
                setShowAddMsg(false);
            }, 2500);
            return;
        }
       
    }

    const goSchedule = () => {
        history.push(`/channels/schedule/${channelId}`);
        window.scrollTo(0,0);
    }
    

    let bgColorObj =  {};
    let textColorObj = {};

    if(channelById) {
        bgColorObj = {
            background : `#${channelById.color}`
        }
        textColorObj = {
            color : `#${channelById.color}`
        }
    }
 
    return (
        <div className={styles.channelContainer}>
            {showAddMsg && (
                <div>
                    { !addingErrMsg ? <p className={styles.registerMsg}>{addMsg}</p> : <p className={styles.errorMessage}>{addingErrMsg}</p>}
                </div>
                
            )}
             
            {channelById && (
            <div className={styles.card} style={bgColorObj} >
                <img className={styles.image} src={channelById.image} alt={channelById.name}/>
                <div className= {styles.container}>
                    <h3><b>Channel Name: {channelById.name}</b></h3>
                    <p>Channel Type : {channelById.channeltype}</p>
                </div>
                <audio controls className={styles.player}>
                    <source src= {channelById.liveaudio.url}/>
                </audio>
                <div className = {styles.btnGrp}>
                    <button style ={textColorObj} onClick={sendFavToDB}>Add to Fav +</button>
                    <button style ={textColorObj} onClick={goSchedule}>Schedule</button>
                </div>
            </div>
            )}
            
            

            {channelById && (
                    <div className={styles.channelInfo} style={textColorObj}>
                        <p>{channelById.tagline}</p>
                        <div className={styles.btn}>
                            <a href={channelById.siteurl} target="_blank" style = {bgColorObj} rel="noopener noreferrer" > Channel Website</a>
                            <Link to={`/channels/programs/${channelId}`} style = {bgColorObj} >Channels Programs</Link>
                        </div>
                    </div>
                )}
        </div>
    );
}
 
export default ChannelDetails;