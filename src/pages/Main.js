import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, StyleSheet, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import io from 'socket.io-client'
import LottieView from 'lottie-react-native'

import logo from '../../assets/logo.png'
import like from '../../assets/like.png'
import itsamarch from '../../assets/itsamatch.png'
import dislike from '../../assets/dislike.png'
import api from '../services/api'

export default function Main({ navigation }) {
	const id = navigation.getParam('user')
	const [users, setUsers] = useState([])
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

	async function handleLike() {
		const [user, ...rest] = users
		await api.post(`/devs/${user._id}/likes`, null, {
			headers: { user: id },
		})
		setUsers(rest)
	}

	async function handleDislike() {
		const [user, ...rest] = users
		await api.post(`/devs/${user._id}/dislikes`, null, {
			headers: { user: id },
		})
		setUsers(rest)
	}

	async function handleLogout() {
		await AsyncStorage.clear()

		navigation.navigate('Login')
	}

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity onPress={handleLogout}>
				<View style={{ width: 200, height: 200 }}>
					<LottieView resizeMode='contain' source={require('../../assets/github-logo.json')} autoPlay loop />
				</View>
				<Image source={logo} style={styles.logo} />
			</TouchableOpacity>
			<View style={styles.cardContainer}>
				{users.length === 0 ? (
					<Text style={styles.empty}>Acabou :(</Text>
				) : (
					users.map((user, index) => (
						<View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
							<Image style={styles.avatar} source={{ uri: user.avatar }} />
							<View style={styles.footer}>
								<Text style={styles.name}>{user.name}</Text>
								<Text style={styles.bio}>{user.bio}</Text>
								<Text style={styles.bio}>{user.public_repos}</Text>
							</View>
						</View>
					))
				)}
			</View>
			{users.length > 0 && (
				<View style={styles.buttonsContainer}>
					<TouchableOpacity style={styles.button} onPress={handleLike}>
						<Image source={dislike} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={handleDislike}>
						<Image source={like} />
					</TouchableOpacity>
				</View>
			)}

			{matchDev && (
				<View style={styles.matchContainer}>
					<Image style={styles.matchImage} source={itsamarch} />
					<Image style={styles.matchAvatar} source={{ uri: matchDev.avatar }} />

					<Text style={styles.macthName}>{matchDev.name}</Text>
					<Text style={styles.macthBio}>{matchDev.bio}</Text>

					<TouchableOpacity onPress={() => setMatchDev(null)}>
						<Text style={styles.closeMacth}>Fechar</Text>
					</TouchableOpacity>
				</View>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1D2E40',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	logo: {
		marginTop: 40,
		width: 100,
		height: 100,
	},
	empty: {
		alignSelf: 'center',
		color: '#dcdcdc',
		fontSize: 30,
		fontWeight: 'bold',
	},
	cardContainer: {
		flex: 1,
		alignSelf: 'stretch',
		justifyContent: 'center',
		maxHeight: 500,
	},
	card: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		margin: 30,
		overflow: 'hidden',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.0,

		elevation: 7,
	},
	avatar: {
		flex: 1,
		height: 300,
	},
	footer: {
		backgroundColor: '#FFF',
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#333',
	},
	buttonsContainer: {
		flexDirection: 'row',
		marginBottom: 30,
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 30,
	},

	matchContainer: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,.8)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	matchImage: {
		height: 60,
		resizeMode: 'contain',
	},
	matchAvatar: {
		width: 160,
		height: 160,
		borderRadius: 80,
		borderWidth: 5,
		borderColor: '#fff',
		marginVertical: 30,
	},
	matchName: {
		fontSize: 26,
		fontWeight: 'bold',
		color: '#fff',
	},
	macthBio: {
		marginTop: 10,
		fontSize: 16,
		color: 'rgba(255,255,255,.8)',
		lineHeight: 24,
		textAlign: 'center',
		paddingHorizontal: 30,
	},
	closeMacth: {
		fontSize: 16,
		color: 'rgba(255,255,255,.8)',
		textAlign: 'center',
		marginTop: 30,
		fontWeight: 'bold',
	},
})
