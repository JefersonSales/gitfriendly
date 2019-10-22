import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Login from './pages/Login'
import Main from './pages/Main'

export default createAppContainer(
	createStackNavigator(
		{
			Login: {
				screen: Login,
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
