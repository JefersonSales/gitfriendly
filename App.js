import React from 'react'
import Router from './src/routes'
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings(['Unrecognized WebSocket'])
export default function App() {
	return <Router />
}
