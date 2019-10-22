import React from 'react'
import { SafeAreaView, View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'

import logo from '../../assets/logo.png'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'

export default function Main() {
	return (
		<SafeAreaView style={styles.container}>
			<Image source={logo} style={styles.logo} />
			<View style={styles.cardContainer}>
				<View style={[styles.card, { zIndex: 3 }]}>
					<Image style={styles.avatar} source={{ uri: 'https://avatars1.githubusercontent.com/u/23359852?v=4' }} />
					<View style={styles.footer}>
						<Text style={styles.name}>Jeferson Sales</Text>
						<Text style={styles.bio}>
							Estudante de Análise e Desenvolvimento de Sistemas, gosto de solucionar problemas e encarar grandes
							desafios
						</Text>
					</View>
				</View>
			</View>
			<View style={styles.buttonsContainer}>
				<TouchableOpacity style={styles.button}>
					<Image source={dislike} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Image source={like} />
				</TouchableOpacity>
			</View>
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
})
