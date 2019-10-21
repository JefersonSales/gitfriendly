import React from 'react'
import { KeyboardAvoidingView, Platform, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'

import logo from '../../assets/logo.png'

export default function Login() {
	return (
		<KeyboardAvoidingView behavior='padding' enable={Platform.OS === 'ios'} style={styles.container}>
			<Image source={logo} />
			<TextInput
				autoCapitalize='none'
				autoCorrect={false}
				placeholder='Digite seu usuário do Github'
				placeholderTextColor='#999'
				style={styles.input}
			/>
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>Enviar</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30,
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
		alignSelf: 'stretch',
		backgroundColor: '#72B6FF',
		borderRadius: 4,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 16,
	},
})