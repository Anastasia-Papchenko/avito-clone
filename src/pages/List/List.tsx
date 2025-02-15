import { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Headling from '../../components/Headling/Headling';
import { Item } from '../../interfaces/list.interface';
import axios from 'axios';
import styles from './List.module.css';

export function List() {
	const [products, setProducts] = useState<Item[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Item[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedType, setSelectedType] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const getList = async () => {
		try {
			const { data } = await axios.get<Item[]>('http://localhost:3000/items');
        	setProducts(data);
        	setFilteredProducts(data);
    	} catch (e) {
    	    console.error(e);
    	}
	};

	useEffect(() => {
	    getList();
	}, []);

	useEffect(() => {
	    let filtered = products;

	    if (searchQuery) {
	        filtered = filtered.filter((item) =>
	            item.name.toLowerCase().includes(searchQuery.toLowerCase())
	        );
	    }

	    if (selectedType) {
	        filtered = filtered.filter((item) => item.type === selectedType);
	    }

	    setFilteredProducts(filtered);
    	 setCurrentPage(1); 
	}, [searchQuery, selectedType, products]);
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	const displayedProducts = filteredProducts.slice(
	    (currentPage - 1) * itemsPerPage,
	    currentPage * itemsPerPage
	);


	const handlePageChange = (page: number) => {
	    setCurrentPage(page);
	};

	return (
		<>
			<div className={styles['header-search']}>
				<Headling>Список объявлений</Headling>
				<input
					type="text"
					placeholder="Поиск по названию..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className={styles['search-input']}
				/>
				<select
					value={selectedType}
					onChange={(e) => setSelectedType(e.target.value)}
					className={styles['filter-select']}
				>
					<option value="">Все категории</option>
					<option value="Недвижимость">Недвижимость</option>
					<option value="Авто">Авто</option>
					<option value="Услуги">Услуги</option>
				</select>
			</div>
				

			<div className={styles.wrapper}>
				{displayedProducts.length === 0 ? (
					<p>Нет объявлений</p>
				) : (
					displayedProducts.map((p) => (
						<Card
							key={p.id}
							id={p.id}
							name={p.name}
							description={p.description}
							location={p.location}
							type={p.type}
						/>
					))
				)}
			</div>

			{totalPages > 1 && (
				<div className={styles.pagination}>
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						{'<'}
					</button>

					{Array.from({ length: totalPages }, (_, index) => index + 1).map(
						(page) => (
							<button
								key={page}
								onClick={() => handlePageChange(page)}
								className={currentPage === page ? styles.active : ''}
							>
								{page}
							</button>
						)
					)}

					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						{'>'}
					</button>
				</div>
			)}
		</>
	);
}

export default List;
