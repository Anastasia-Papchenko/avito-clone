import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';


export function Layout() {


	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>
			<div className={styles['user']}>
				<img src='/avatar.png' alt='Иконка пользователя' className={styles['user-img']}/>
				<div className={styles['name']}>Настя Папченко</div>
				<div className={styles['email']}>Настя@gmail.com</div>
			</div>
			<div className={styles['list']}>
				<Link to='/list' className={styles['link']}><Button>Список объявлений</Button></Link>
				<Link to='/form' className={styles['link']}><Button>Разместить объявление</Button></Link>
			</div>
			{/* <Button className={styles['exit']}>
				Выход
			</Button> */}
		</div>
		
		<div className={styles['content']}>
			<Outlet></Outlet>
			
		</div>
		
	</div>;
}