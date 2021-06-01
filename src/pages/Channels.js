import { useContext, useEffect , useState} from "react";
import AllChannels from "../components/AllChannels";
import PopUp from '../components/PopUp';
import styles from '../css/Channels.module.css';

import { ChannelContext } from "../contexts/ChannelContext";
import { UserContext } from "../contexts/UserContext";

const Channels = () => {

    const { channels } = useContext(ChannelContext);
    const {  showPopUp } = useContext(UserContext);
    const [showChannels, setShowChannels] = useState([]);
    const [number, setNumber] = useState(8);

    useEffect(() => {
        if (channels) {
            const showing = channels.slice(0, number);
            setShowChannels(showing);
        }
    }, [number, channels]);

    const handleClick = () => {
        setNumber(number + 8);
    };

    return ( 
        <div>
            { showPopUp ? <PopUp/> : <div></div>}
            <div className={styles.logo}>
                <img src= { "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimg4.wikia.nocookie.net%2F__cb20100512063108%2Flogopedia%2Fimages%2F8%2F87%2FSverigeSRadio_2010.png&f=1&nofb=1"}  alt="logo"/>
            </div> 
            <h1>All Channels</h1>
           
            
            <div className= {styles.channelCard}>
                
                {channels && showChannels.map((channel) => (
                    <AllChannels key={channel.id} channel= {channel}/>  
                ))}
            </div>
            <div className={styles.button}>
            {channels && showChannels.length < channels.length && (
                        <button  onClick={handleClick}>Show More</button>
                    )
                }
            </div>
        </div> 
        );
}
 
export default Channels;