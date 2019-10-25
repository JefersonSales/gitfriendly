import React from 'react'
import { YellowBox } from 'react-native'
import Router from './src/routes'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

YellowBox.ignoreWarnings(['Unrecognized WebSocket connection', 'status code 503', 'React state'])

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#1D2E40',
		accent: '#1D2E40',
	},
}

export default function App() {
	return (
		<PaperProvider theme={theme}>
			<Router />
		</PaperProvider>
	)
}
