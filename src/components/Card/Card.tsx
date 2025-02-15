import { Link } from 'react-router-dom'; 
import styles from './Card.module.css';
import { CardProps } from './Card.props';

import image1 from '/public/home.png';
import image2 from '/public/car.png';
import image3 from '/public/service.png';

function Card(props: CardProps) {
	const getImage = () => {
	    switch (props.type) {
	        case 'Недвижимость':
	            return image1;
	        case 'Авто':
	            return image2;
	        case 'Услуги':
	            return image3;
	        default:
	            return '';
    	}
	};

	return (
	    <Link to={`/item/${props.id}`} className={styles.link}>
	        <div className={styles.card}>
	            <div className={styles['image-card']}>
	                <img src={getImage()} alt={props.type} className={styles['image']} />
	            </div>
             	<div className={styles['text-card']}>
            	    <p><strong>{props.name}</strong></p>
            	    <p>Локация - {props.location}</p>
            	    <p>Категирия - {props.type}</p>
            	</div>
            	<button className={styles['button-card']}>
                    Открыть
            	</button>
        	</div>
    	</Link>
	);
}

export default Card;



