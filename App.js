import React from 'react'
import { YellowBox } from 'react-native'
import Router from './src/routes'

YellowBox.ignoreWarnings(['Unrecognized WebSocket connection', 'status code 503'])

export default function App() {
	return <Router />
}
