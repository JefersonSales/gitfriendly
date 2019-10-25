import React, { useEffect, useState } from 'react'
import {
	KeyboardAvoidingView,
	SafeAreaView,
	View,
	StyleSheet,
	Image,
	Text,
	TouchableOpacity,
	AsyncStorage,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import io from 'socket.io-client'
import { Chip, Button } from 'react-native-paper'
import LottieView from 'lottie-react-native'

import logo from '../../assets/logo2.png'
import api from '../services/api'
const tech = [
	{ nome: 'Angular' },
	{ nome: 'ReacjJS' },
	{ nome: 'Flutter' },
	{ nome: '.NET' },
	{ nome: 'Reacj Native' },
	{ nome: 'Kotlin' },
	{ nome: 'Lisp' },
	{ nome: 'TypeScript' },
	{ nome: 'C#' },
	{ nome: 'Visual Basic .NET' },
	{ nome: 'Python' },
	{ nome: 'PHP' },
	{ nome: 'SQL' },
	{ nome: 'Scala ' },
	{ nome: 'MySQL ' },
	{ nome: 'PostgreSQL ' },
	{ nome: 'C++' },
	{ nome: 'Swift' },
	{ nome: 'MongoDB ' },
	{ nome: 'Apache ' },
	{ nome: 'Nginx ' },
	{ nome: 'PostgreSQL ' },
	{ nome: 'JavaScript' },
	{ nome: 'Objectve-C' },
	{ nome: 'Groovy' },
	{ nome: 'R ' },
	{ nome: 'Go ' },
	{ nome: 'Perls ' },
	{ nome: 'MATLAB' },
	{ nome: 'PL/SQL' },
	{ nome: 'SAS' },
	{ nome: 'Dart' },
]

export default function Main({ navigation }) {
	const id = navigation.getParam('user')
	const [users, setUsers] = useState([])
	const [texto, setTexto] = useState('')
	const [matchDev, setMatchDev] = useState(null)

	useEffect(() => {
		async function loadUsers() {
			const response = await api.get('/devs', {
				headers: {
					user: id,
				},
			})
			setUsers(response.data)
		}
		loadUsers()
	}, [id])

	useEffect(() => {
		const socket = io('https://backend-gitfriendly.herokuapp.com', {
			query: { user: id },
		})

		socket.on('match', dev => {
			setMatchDev(dev)
		})
	}, [id])

	async function handleLogout() {
		await AsyncStorage.clear()
		navigation.navigate('Login')
	}

	return (
		<KeyboardAvoidingView style={styles.container}>
			<TouchableOpacity onPress={handleLogout} style={styles.logoContainer}>
				<View style={{ width: 50, height: 50, alignSelf: 'center' }}>
					<LottieView resizeMode='contain' source={require('../../assets/github-logo.json')} autoPlay loop />
				</View>
				<View style={styles.logo}>
					<Image source={logo} />
				</View>
				<View style={styles.textoContainer}>
					<Text style={styles.texto}>Adicione suas Skills!</Text>
				</View>
			</TouchableOpacity>

			<View style={styles.content}>
				{tech.map((item, id) => (
					<Chip style={styles.contenItem} key={id}>
						{item.nome}
					</Chip>
				))}
			</View>

			<View style={styles.buttonArea}>
				<Button style={styles.button} mode='contained' onPress={() => alert('Pressed')}>
					<Ionicons name='md-add' size={32} color='#1D2E40' />
				</Button>
				<Button style={styles.button} mode='contained' onPress={() => alert('Enviar')}>
					<Ionicons name='ios-send' size={32} color='#1D2E40' />
				</Button>
			</View>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1D2E40',
		alignItems: 'center',
		padding: 20,
		justifyContent: 'space-between',
	},
	logoContainer: {
		marginTop: 30,
		alignSelf: 'center',
	},
	logo: { alignSelf: 'center' },
	cardContainer: {
		marginHorizontal: 30,
	},
	textoContainer: {
		alignItems: 'center',
	},
	texto: {
		color: '#fff',
		fontSize: 25,
		fontWeight: 'bold',
	},
	content: {
		flex: 8,
		marginTop: 15,
		flexDirection: 'row',
		padding: 4,
		flexWrap: 'wrap',
	},
	contenItem: {
		margin: 5,
	},
	buttonArea: {
		flexDirection: 'column',
		position: 'relative',
		alignSelf: 'flex-end',
	},
	button: {
		backgroundColor: '#0FCCCE',
		borderRadius: 100,
		height: 60,
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	textButton: {
		fontSize: 25,
	},
})
