import { FC, useEffect, useState } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import {
	Button,
	TextField,
	FormControlLabel,
	Checkbox,
	Typography,
	Link,
	Alert,
	Paper,
	Slide,
	Snackbar,
} from '@mui/material'
import { authApi } from '../store/services/AuthService'
import { RoutePath } from '../router/routes'
import { Controller, useForm } from 'react-hook-form'
import { useAppSelector } from '../hooks/redux'
import { getIsAuth } from '../store/reducers/AuthSlice'

interface FormData {
	email: string
	password: string
	name?: string
}

const AuthForm: FC = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const isRegistration = location.pathname === RoutePath.registration

	const [accepted, setAccepted] = useState<boolean>(false)
	const [alert, setAlert] = useState<{ isOpen: boolean; message: string }>({
		isOpen: false,
		message: '',
	})

	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return
		}
		setAlert({ isOpen: false, message: '' })
	}

	const [
		registrationUser,
		{
			isLoading: registrationIsLoading,
			isSuccess: registrationIsSuccess,
			isError: registrationIsError,
			error: registrationError,
		},
	] = authApi.useRegistrationMutation()

	const [
		loginUser,
		{
			isLoading: loginIsLoading,
			isSuccess: loginIsSuccess,
			isError: loginIsError,
			error: loginError,
		},
	] = authApi.useLoginMutation()

	const isAuth = useAppSelector(getIsAuth)
	useEffect(() => {
		if (isAuth) {
			navigate(RoutePath.main)
		}
	}, [])

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		defaultValues: {
			email: '',
			password: '',
			name: '',
		},
	})

	const onSubmit = async (formData: FormData) => {
		try {
			const { email, password, name } = formData

			if (isRegistration) {
				await registrationUser({ email, password, name })
			} else {
				await loginUser({ email, password })
			}
		} catch (error) {
			console.error('Ошибка при регистрации/входе:', error)
		}
	}

	useEffect(() => {
		if (loginIsSuccess) {
			navigate(RoutePath.main)
		}
		if (loginIsError) {
			const { data }: any = loginError

			setAlert({ isOpen: true, message: data.message })
		}
	}, [loginIsSuccess, loginIsError])

	useEffect(() => {
		if (registrationIsSuccess) {
			navigate(RoutePath.main)
			console.log('registSuccess!')
		}
		if (registrationIsError) {
			console.log('registError!!', registrationError)
		}
	}, [registrationIsSuccess, registrationIsError])

	const isFormInvalid =
		Object.keys(errors).length > 0 || (isRegistration && !accepted)

	const handleResetForm = () => {
		reset()
		setAccepted(false)
	}

	return (
		<>
			<Paper
				elevation={2}
				sx={{
					maxWidth: '450px',
					minWidth: '450px',
					position: 'absolute',
					display: 'flex',
					flexFlow: 'column nowrap',
					alignItems: 'center',
					gap: 3,
					padding: 3,
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
				component='form'
				onSubmit={handleSubmit(onSubmit)}
				noValidate
			>
				<Typography component='h1' variant='h5'>
					{isRegistration ? 'Регистрация' : 'Вход'}
				</Typography>
				{isRegistration && (
					<Controller
						control={control}
						name='name'
						rules={{
							required: 'Введите ваше имя',
							pattern: {
								value: /^[a-zA-Zа-яА-Я0-9]+$/,
								message:
									'Имя может содержать только русские и латинские буквы и цифры',
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								fullWidth
								id='name'
								label='Имя'
								autoComplete='name'
								error={!!errors.name}
								helperText={errors.name?.message}
							/>
						)}
					/>
				)}
				<Controller
					control={control}
					name='email'
					rules={{
						required: 'Введите корректный email',
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
							message: 'Введите корректный email',
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
							fullWidth
							id='email'
							label='Email'
							autoComplete='email'
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name='password'
					rules={{
						required: 'Введите пароль',
						minLength: {
							value: 6,
							message: 'Пароль должен содержать не менее 6 символов',
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
							fullWidth
							id='password'
							label='Пароль'
							type='password'
							autoComplete='current-password'
							error={!!errors.password}
							helperText={errors.password?.message}
						/>
					)}
				/>
				{isRegistration && (
					<FormControlLabel
						control={
							<Checkbox
								checked={accepted}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									setAccepted(event.target.checked)
								}
							/>
						}
						label={
							<Typography variant='subtitle2' color='textSecondary'>
								Я даю согласие на обработку персональных данных в соответствии с
								Политикой конфиденциальности
							</Typography>
						}
					/>
				)}
				<Button
					type='submit'
					fullWidth
					variant='contained'
					disabled={isFormInvalid}
				>
					{isRegistration ? 'Зарегистрироваться' : 'Войти'}
				</Button>
				<Typography variant='body1'>
					{isRegistration ? (
						<>
							Есть аккаунт?{' '}
							<Link
								component={RouterLink}
								to={RoutePath.login}
								onClick={handleResetForm}
							>
								Войти
							</Link>
						</>
					) : (
						<>
							Нет аккаунта?{' '}
							<Link
								component={RouterLink}
								to={RoutePath.registration}
								onClick={handleResetForm}
							>
								Зарегистрироваться
							</Link>
						</>
					)}
				</Typography>
			</Paper>
			<Snackbar
				open={alert.isOpen}
				autoHideDuration={5000}
				onClose={handleClose}
				TransitionComponent={Slide}
			>
				<Alert
					onClose={handleClose}
					severity='error'
					variant='filled'
					sx={{ width: '100%' }}
				>
					{alert.message}
				</Alert>
			</Snackbar>
		</>
	)
}

export default AuthForm
