// import { useLoaderData } from 'react-router-dom';
// import { Item } from '../../interfaces/list.interface';

// export function Item() {
// 	const data = useLoaderData() as Item;

// 	return <>
//         Item - {data.name}
// 	</>;
// }
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Item.module.css';
import { Item as ItemType } from '../../interfaces/list.interface';

export function Item() {
	const { id } = useParams(); 
	const navigate = useNavigate();

	const [item, setItem] = useState<ItemType | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState<ItemType | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
	    const fetchItem = async () => {
	        try {
	            const response = await fetch(`http://localhost:3000/items/${id}`);
	            if (!response.ok) {
	                throw new Error('Ошибка загрузки данных');
	            }
	            const data: ItemType = await response.json();
	            setItem(data);
	            setFormData(data);
	        // eslint-disable-next-line @typescript-eslint/no-unused-vars
	        } catch (error) {
	            setError('Ошибка загрузки товара');
	        } finally {
	            setLoading(false);
	        }
	    };

	    fetchItem();
	}, [id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
	    if (formData) {
	        setFormData({ ...formData, [e.target.name]: e.target.value });
	    }
	};

	const handleSave = async () => {
	    if (!formData) return;

	    try {
	        const response = await fetch(`http://localhost:3000/items/${id}`, {
	            method: 'PUT',
	            headers: { 'Content-Type': 'application/json' },
	            body: JSON.stringify(formData)
	        });

        	if (!response.ok) {
        	    throw new Error('Ошибка при обновлении товара');
        	}

        	const updatedItem = await response.json();
        	setItem(updatedItem);
        	setIsEditing(false);
    	// eslint-disable-next-line @typescript-eslint/no-unused-vars
    	} catch (error) {
    	    setError('Ошибка при сохранении товара');
    	}
	};


	const handleDelete = async () => {
	    try {
	        const response = await fetch(`http://localhost:3000/items/${id}`, {
	            method: 'DELETE'
        	});

        	if (!response.ok) {
        	    throw new Error('Ошибка при удалении товара');
        	}

        	navigate('/');
    	// eslint-disable-next-line @typescript-eslint/no-unused-vars
    	} catch (error) {
    	    setError('Ошибка при удалении товара');
    	}
	};

	if (loading) return <p>Загрузка...</p>;
	if (error) return <p style={{ color: 'red' }}>{error}</p>;
	if (!item) return <p>Товар не найден</p>;

	return (
	    <div className={styles['item-container']}>
	        <h1>Товар: {item.name}</h1>

	        {isEditing ? (
	            <div className={styles['edit-form']}>
	                <label>
                        Название:
	                    <input type="text" name="name" value={formData?.name || ''} onChange={handleChange} />
	                </label>
	                <label>
                        Описание:
	                    <textarea name="description" value={formData?.description || ''} onChange={handleChange} />
	                </label>
	                <label>
                        Локация:
	                    <input type="text" name="location" value={formData?.location || ''} onChange={handleChange} />
	                </label>
                    
                	{formData?.type === 'Недвижимость' && (
                	    <>
                	        <label>
							Тип недвижимости:
								<select name="propertyType" value={formData?.propertyType || ''} onChange={handleChange}>
									<option value="">Выберите тип</option>
									<option value="Квартира">Квартира</option>
									<option value="Квартира">Комната</option>
									<option value="Дом">Дом</option>
									<option value="Коттедж">Коттедж</option>
								</select>
                	        </label>
                	        <label>
                                Площадь (кв.м):
                	            <input type="number" name="area" value={formData?.area || ''} onChange={handleChange} />
                	        </label>
                	        <label>
                                Количество комнат:
                	            <input type="number" name="rooms" value={formData?.rooms || ''} onChange={handleChange} />
                	        </label>
                	        <label>
                                Цена:
                	            <input type="number" name="price" value={formData?.price || ''} onChange={handleChange} />
                	        </label>
                	    </>
                	)}

                	{formData?.type === 'Авто' && (
                	    <>
                	        <label>
                                Марка:
                	            <input type="text" name="brand" value={formData?.brand || ''} onChange={handleChange} />
                	        </label>
                	        <label>
                                Модель:
                	            <input type="text" name="model" value={formData?.model || ''} onChange={handleChange} />
                	        </label>
                	        <label>
                                Год выпуска:
                	            <input type="number" name="year" value={formData?.year || ''} onChange={handleChange} />
                	        </label>
                	        <label>
                                Пробег (км):
                	            <input type="number" name="mileage" value={formData?.mileage || ''} onChange={handleChange} />
                	        </label>
                	    </>
                	)}

                	{formData?.type === 'Услуги' && (
                	    <>
                	        <label>
                                Тип услуги:
                	            <input type="text" name="serviceType" value={formData?.serviceType || ''} onChange={handleChange} />
                	        </label>
                	        <label>
                                Опыт работы (лет):
                	            <input type="number" name="experience" value={formData?.experience || ''} onChange={handleChange} />
                	        </label>
                	        <label>
                                Стоимость:
                	            <input type="number" name="cost" value={formData?.cost || ''} onChange={handleChange} />
                	        </label>
                	        <label>
                                График работы:
                	            <input type="text" name="workSchedule" value={formData?.workSchedule || ''} onChange={handleChange} />
                	        </label>
                	    </>
                	)}

                	<button onClick={handleSave} className={styles['save-button']}>Сохранить</button>
                	<button onClick={() => setIsEditing(false)} className={styles['cancel-button']}>Отмена</button>
            	</div>
        	) : (
        	    <div className={styles['item-details']}>
        	        <p><strong>Описание:</strong> {item.description}</p>
        	        <p><strong>Локация:</strong> {item.location}</p>

        	        {item.type === 'Недвижимость' && (
        	            <>
        	                <p><strong>Тип недвижимости:</strong> {item.propertyType}</p>
        	                <p><strong>Площадь:</strong> {item.area} м²</p>
        	                <p><strong>Количество комнат:</strong> {item.rooms}</p>
        	                <p><strong>Цена:</strong> {item.price} ₽</p>
        	            </>
        	        )}

        	        {item.type === 'Авто' && (
        	            <>
        	                <p><strong>Марка:</strong> {item.brand}</p>
        	                <p><strong>Модель:</strong> {item.model}</p>
        	                <p><strong>Год выпуска:</strong> {item.year}</p>
        	                <p><strong>Пробег:</strong> {item.mileage} км</p>
        	            </>
        	        )}

        	        {item.type === 'Услуги' && (
        	            <>
        	                <p><strong>Тип услуги:</strong> {item.serviceType}</p>
        	                <p><strong>Опыт:</strong> {item.experience} лет</p>
        	                <p><strong>Стоимость:</strong> {item.cost} ₽</p>
        	                <p><strong>График работы:</strong> {item.workSchedule}</p>
        	            </>
        	        )}

        	        <button onClick={() => setIsEditing(true)} className={styles['edit-button']}>Редактировать</button>
        	        <button onClick={handleDelete} className={styles['delete-button']}>Удалить</button>
        	    </div>
        	)}
    	</div>
	);
}

export default Item;
