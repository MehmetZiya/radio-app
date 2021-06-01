import Program from '../components/Program' ;
import { useContext, useState, useEffect } from "react";
import { ProgramContext } from '../contexts/ProgramContext';
import { UserContext } from "../contexts/UserContext";
import PopUp from '../components/PopUp';
import styles from '../css/Programs.module.css';

const Programs = () => {
    const { programs } = useContext(ProgramContext);
    const {  showPopUp } = useContext(UserContext);
    const [showPrograms, setShowPrograms] = useState([]);
    const [number, setNumber] = useState(8);

    useEffect(() => {
        if (programs) {
            const showing = programs.slice(0, number);
            setShowPrograms(showing);
        }
    }, [number, programs]);

    const handleClick = () => {
        setNumber(number + 8);
    };


    return ( 
        <div className={styles.programsWrapper}>
            { showPopUp ? <PopUp/> : <div></div>}
            <div className={styles.programContainer}>
            
            <div className={styles.logo}>
                <img src= { "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimg4.wikia.nocookie.net%2F__cb20100512063108%2Flogopedia%2Fimages%2F8%2F87%2FSverigeSRadio_2010.png&f=1&nofb=1"}  alt="logo"/>
            </div> 
                <h1>All Programs</h1>
            
                <div className={styles.allProgram}>
                {programs && showPrograms.map((program) => (
                    <Program key={program.id} program = {program}/>
                ))}
                </div>
                <div className={styles.button}>
                {programs && showPrograms.length < programs.length && (
                            <button  onClick={handleClick}>Show More</button>
                        )
                    }
                </div>
            
            </div> 
        </div>
    );
}
 
export default Programs;