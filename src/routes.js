import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Login from './pages/Login'
import CadSkils from './pages/CadSkils'
import Main from './pages/Main'

export default createAppContainer(
	createStackNavigator(
		{
			Login: {
				screen: Login,
			},
			CadSkils: {
				screen: CadSkils,
			},
			Main: {
				screen: Main,
			},
		},
		{
			headerMode: 'none',
		},
	),
)
