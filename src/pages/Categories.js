/* eslint-disable react-hooks/exhaustive-deps */
import {useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProgramContext } from '../contexts/ProgramContext';
import styles from '../css/Categories.module.css';




const Categories = () => {
    const { categories } = useContext(ProgramContext);
    
    return ( 
    <div className={styles.container}>
        <div className={styles.logo}>
            <img src= { "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimg4.wikia.nocookie.net%2F__cb20100512063108%2Flogopedia%2Fimages%2F8%2F87%2FSverigeSRadio_2010.png&f=1&nofb=1"}  alt="logo"/>
        </div> 
        <h1>All Categories</h1>
        <div className={styles.categoryWrapper}>
            {categories && categories.map(category => (
                <Link to={`/categories/programs/${category.id}`} key={category.id} className={styles.category}>
                    <p><b>{category.name}</b></p>
                </Link>
            ))}
        </div>
        
    </div>  
    );
}
 
export default Categories;