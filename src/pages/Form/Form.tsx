import { useState } from 'react'; 
import styles from './Form.module.css';
import axios from 'axios';
import Headling from '../../components/Headling/Headling';

const API_URL = 'http://localhost:3000'; 

export function Form() {
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [formData, setFormData] = useState({
		name: '',
    	description: '',
    	location: '',
    	type: 'Выберите тип',
    	additional: {
    	    propertyType: '',
    	    area: '',
    	    rooms: '',
    	    price: '',
    	    brand: '',
    	    model: '',
    	    year: '',
    	    mileage: '',
    	    serviceType: '',
    	    experience: '',
    	    cost: '',
    	    workSchedule: ''
    	}
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
	    setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleAdditionalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
	    setFormData({
	        ...formData,
	        additional: { ...formData.additional, [e.target.name]: e.target.value }
	    });
	};

	const nextStep = () => setStep(2);
	const prevStep = () => setStep(1);

	const handleSubmit = async (e: React.FormEvent) => {
	    e.preventDefault();
	    setLoading(true);
	    setError('');


	    let dataToSend: any = {
	        name: formData.name,
	        description: formData.description,
	        location: formData.location,
	        type: formData.type
	    };

	    if (formData.type === 'Недвижимость') {
	        dataToSend = {
	            ...dataToSend,
	            propertyType: formData.additional.propertyType,
	            area: Number(formData.additional.area),
	            rooms: Number(formData.additional.rooms),
	            price: Number(formData.additional.price)
	        };
	    }

	    if (formData.type === 'Авто') {
	        dataToSend = {
	            ...dataToSend,
	            brand: formData.additional.brand,
	            model: formData.additional.model,
	            year: Number(formData.additional.year),
	            mileage: formData.additional.mileage ? Number(formData.additional.mileage) : undefined
    	        };
        	}

    	if (formData.type === 'Услуги') {
    	    dataToSend = {
    	        ...dataToSend,
    	        serviceType: formData.additional.serviceType,
    	        experience: Number(formData.additional.experience),
    	        cost: Number(formData.additional.cost),
    	        workSchedule: formData.additional.workSchedule || ''
    	    };
    	}

    	console.log('Отправляем данные:', dataToSend);

    	try {
    	    const response = await axios.post(`${API_URL}/items`, dataToSend, {
    	        headers: {
    	            'Content-Type': 'application/json'
    	        }
    	    });

        	 console.log('Ответ от сервера:', response.data);
        	alert('Объявление успешно добавлено!');

        	setFormData({
        	    name: '',
        	    description: '',
        	    location: '',
        	    type: 'Недвижимость',
        	    additional: {
        	        propertyType: '',
        	        area: '',
        	        rooms: '',
        	        price: '',
        	        brand: '',
        	        model: '',
        	        year: '',
        	        mileage: '',
        	        serviceType: '',
        	        experience: '',
        	        cost: '',
        	        workSchedule: ''
        	    }
        	});
        	setStep(1);
    	} catch (err: any) {
    	    setError(err.response?.data?.error || 'Ошибка при отправке данных.');
    	    console.error('Ошибка при запросе:', err.response?.data || err);
    	} finally {
    	    setLoading(false);
    	}
	};

	return (
	    <>
	        <Headling>Форма размещения</Headling>
	        <div className={styles.formContainer}>
	            <form onSubmit={handleSubmit} className={styles.formWrapper}>
	                {step === 1 && (
	                    <>
	                        <input
	                            type="text"
	                            name="name"
	                            placeholder="Название"
	                            value={formData.name}
	                            onChange={handleChange}
	                            required
	                        />
	                        <textarea
	                            name="description"
	                            placeholder="Описание"
	                            value={formData.description}
	                            onChange={handleChange}
	                            required
	                        />
	                        <input
	                            type="text"
	                            name="location"
	                            placeholder="Локация"
	                            value={formData.location}
	                            onChange={handleChange}
	                            required
	                        />
	                        <select name="type" value={formData.type} onChange={handleChange}>
								<option value="">Выберите тип</option>
	                            <option value="Недвижимость">Недвижимость</option>
	                            <option value="Авто">Авто</option>
	                            <option value="Услуги">Услуги</option>
	                        </select>
	                        <button type="button" onClick={nextStep}>Далее</button>
	                    </>
	                )}

	                {step === 2 && (
	                    <>
	                        {formData.type === 'Недвижимость' && (
	                            <>
	                                <select name="propertyType" onChange={handleAdditionalChange} required>
	                                    <option value="">Выберите тип</option>
	                                    <option value="Квартира">Квартира</option>
										<option value="Квартира">Комната</option>
	                                    <option value="Дом">Дом</option>
	                                    <option value="Коттедж">Коттедж</option>
	                                </select>
	                                <input type="number" name="area" placeholder="Площадь (м²)" onChange={handleAdditionalChange} required />
	                                <input type="number" name="rooms" placeholder="Количество комнат" onChange={handleAdditionalChange} required />
	                                <input type="number" name="price" placeholder="Цена" onChange={handleAdditionalChange} required />
	                            </>
	                        )}

	                        {formData.type === 'Авто' && (
	                            <>
	                                <input type="text" name="brand" placeholder="Марка" onChange={handleAdditionalChange} required />
	                                <input type="text" name="model" placeholder="Модель" onChange={handleAdditionalChange} required />
	                                <input type="number" name="year" placeholder="Год выпуска" onChange={handleAdditionalChange} required />
	                                <input type="number" name="mileage" placeholder="Пробег (км)" onChange={handleAdditionalChange} />
	                            </>
	                        )}

	                        {formData.type === 'Услуги' && (
	                            <>
	                                <input type="text" name="serviceType" placeholder="Тип услуги" onChange={handleAdditionalChange} required />
	                                <input type="number" name="experience" placeholder="Опыт работы (лет)" onChange={handleAdditionalChange} required />
	                                <input type="number" name="cost" placeholder="Стоимость" onChange={handleAdditionalChange} required />
	                                <input type="text" name="workSchedule" placeholder="График работы" onChange={handleAdditionalChange} />
	                            </>
	                        )}

	                        <button type="button" onClick={prevStep}>Назад</button>
	                        <button type="submit" disabled={loading}>{loading ? 'Отправка...' : 'Отправить'}</button>
	                        {error && <p className={styles.error}>{error}</p>}
	                    </>
	                )}
	            </form>
	        </div>
	    </>
	);
}
