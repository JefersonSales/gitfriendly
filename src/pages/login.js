import React, { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import { KeyboardAvoidingView, Platform, Text, StyleSheet, Image, TextInput, Alert, View } from 'react-native'
import { Button } from 'react-native-paper'
import LottieView from 'lottie-react-native'

import api from '../services/api'
import logo from '../../assets/logo.png'

export default function Login({ navigation }) {
	const [user, setUser] = useState('')
	const [load, setLoad] = useState(false)

	useEffect(() => {
		AsyncStorage.getItem('user').then(user => {
			if (user) {
				navigation.navigate('CadSkils', { user })
			}
		})
	}, [])

	async function handleLogin() {
		setLoad(true)
		if (user === '') {
			Alert.alert('Usuário no exist!')
			setLoad(false)
		}
		const response = await api.post('/devs', { username: user })
		const { _id } = response.data
		if (_id) {
			navigation.navigate('CadSkils', { user: _id })
			await AsyncStorage.setItem('user', _id)
			setUser('')
			setLoad(false)
		}
	}

	return (
		<KeyboardAvoidingView behavior='padding' enable={Platform.OS === 'ios'} style={styles.container}>
			<View style={{ width: 200, height: 200, alignSelf: 'center' }}>
				<LottieView resizeMode='contain' source={require('../../assets/github-logo.json')} autoPlay loop />
			</View>
			<Image source={logo} />
			<TextInput
				autoCapitalize='none'
				autoCorrect={false}
				placeholder='Digite seu usuário do Github'
				placeholderTextColor='#999'
				style={styles.input}
				value={user}
				onChangeText={setUser}
			/>
			<Button loading={load} style={styles.button} mode='contained' onPress={handleLogin}>
				Entrar
			</Button>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1D2E40',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 30,
	},

	input: {
		height: 46,
		alignSelf: 'stretch',
		backgroundColor: '#FFF',
		borderColor: '#ddd',
		borderRadius: 4,
		marginTop: 20,
		paddingHorizontal: 15,
	},
	button: {
		height: 46,
		backgroundColor: '#0FCCCE',
		borderRadius: 4,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 16,
	},
})
