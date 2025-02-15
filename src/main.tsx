import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { List } from './pages/List/List.tsx';
import { Item } from './pages/Item/Item.tsx';
import { Form } from './pages/Form/Form.tsx';
import { Error } from './pages/Error/Error.tsx';
import { Layout } from './layout/List/Layout.tsx';
import axios from 'axios';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <List />
			},
			{
				path: '/list',
				element: <List />
			},
			{
				path: '/form',
				element: <Form />
			},
			{
				path: '/item/:id',
				element: <Item />,
				errorElement: <>Ошибка</>,
				loader: async ({ params }) => {
					const { data } = await axios.get(`http://localhost:3000/items/${params.id}`);
					return data;
				}
			}
		]
	},
	{
		path: '*',
		element: <Error />
	}
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router}/>
	</StrictMode>
);
