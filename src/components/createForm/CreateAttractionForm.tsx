'use client'

import { useAdmin } from '@/store/useAdmin'
import { useAttractionStore } from '@/store/useAttractionStore'
import { Attraction, IFormData } from '@/types/attraction'
import { ArrowLeft } from '@gravity-ui/icons'
import { Button, Card, Text, TextArea, TextInput } from '@gravity-ui/uikit'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { Map } from '../Map/Map'
import styles from './CreateAttractionForm.module.css'

interface CreateAttractionFormProps {
	attraction?: Attraction
}

export const CreateAttractionForm = ({ attraction }: CreateAttractionFormProps) => {
	const router = useRouter()
	const { addAttraction, fetchAttractions, updateAttraction } = useAttractionStore()
	const { isAdmin } = useAdmin()

	const [formData, setFormData] = useState<IFormData>(
		attraction
			? {
				title: attraction.title,
				description: attraction.description,
				rating: attraction.rating.toString(),
				photoFile: null as File | null,
				photoUrl: attraction.photoUrl,
				location: attraction.location,
				coordinates: attraction.coordinates,
			}
			: {
				title: '',
				description: '',
				rating: '' as string,
				photoFile: null as File | null,
				photoUrl: '',
				location: '',
				coordinates: { latitude: 55.751, longitude: 37.617 },
			},
	)

	const [errors, setErrors] = useState<string[]>([])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const photoUrl = URL.createObjectURL(file)
			setFormData((prev) => ({ ...prev, photoFile: file, photoUrl }))
		}
	}

	const setCoordinates = (coords: { latitude: number; longitude: number }) => {
		setFormData((prev) => ({ ...prev, coordinates: coords }))
	}

	const setLocation = (location: string) => {
		setFormData((prev) => ({ ...prev, location: location }))
	}

	const validateForm = (): string[] => {
		const newErrors: string[] = []
		if (!formData.title) newErrors.push('Название обязательно')
		if (!formData.description) newErrors.push('Описание обязательно')
		if (!formData.photoFile && !formData.photoUrl) newErrors.push('Фото обязательно')
		if (!formData.location) newErrors.push('Местоположение обязательно')
		if (
			!formData.rating ||
			isNaN(Number(formData.rating)) ||
			Number(formData.rating) < 1 ||
			Number(formData.rating) > 5
		)
			newErrors.push('Рейтинг должен быть числом от 1 до 5')
		return newErrors
	}

	const handleBack = () => {
		router.push('/')
	}

	const uploadPhoto = async (photoFile: File): Promise<string> => {
		const formDataToSend = new FormData()
		formDataToSend.append('image', photoFile)
		formDataToSend.append('expiration', '600')
		formDataToSend.append('key', '4c4eb7c1d76eb405af51bc6115f2532a')

		const response = await fetch('https://api.imgbb.com/1/upload', {
			method: 'POST',
			body: formDataToSend,
		})

		if (!response.ok) {
			throw new Error('Ошибка загрузки изображения')
		}

		const result = await response.json()
		return result.data.url
	}

	const saveAttraction = async (
		attractionData: Attraction,
		attractionId?: string
	) => {
		if (attractionId) {
			await updateAttraction(attractionId, attractionData)
		} else {
			await addAttraction(attractionData)
		}
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		const validationErrors = validateForm()
		if (validationErrors.length > 0) {
			setErrors(validationErrors)
			return
		}

		try {
			let photoUrl = formData.photoUrl


			if (formData.photoFile) {
				photoUrl = await uploadPhoto(formData.photoFile)
			}

			const newAttraction: Attraction = {
				title: formData.title,
				description: formData.description,
				rating: Number(formData.rating) as 1 | 2 | 3 | 4 | 5,
				photoUrl: photoUrl,
				location: formData.location,
				coordinates: formData.coordinates,
				status: 'planned',
				createdAt: attraction?.createdAt ?? '',
				id: attraction?.id ?? ''
			}

			await saveAttraction(newAttraction, attraction?.id)

			router.push('/')
		} catch (error) {
			console.error('Ошибка:', error)
			setErrors(['Не удалось сохранить данные. Попробуйте снова.'])
		}
	}

	useEffect(() => {
		if (!isAdmin) router.push('/')
		fetchAttractions()
	}, [])

	useEffect(() => {
		if (attraction) {
			setFormData({
				title: attraction.title,
				description: attraction.description,
				rating: attraction.rating.toString(),
				photoFile: null as File | null,
				photoUrl: attraction.photoUrl,
				location: attraction.location,
				coordinates: attraction.coordinates,
			})
		}
	}, [attraction])

	return (
		<div className={styles.container}>
			<div className={styles.titleContainer}>
				<ArrowLeft className={styles.back} onClick={handleBack} />
				<h1>
					{isAdmin
						? 'Редактирование достопримечательность'
						: 'Создать новую достопримечательность'}
				</h1>
			</div>

			<Card className={styles.formCard}>
				<form onSubmit={handleSubmit} className={styles.form}>
					<TextInput
						label="Название"
						name="title"
						value={formData.title}
						onChange={handleChange}
						placeholder="Введите название"
					/>
					<TextArea
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Введите описание"
						rows={4}
					/>
					<TextInput
						label="Рейтинг (1-5)"
						name="rating"
						value={formData.rating}
						onChange={handleChange}
						placeholder="Введите рейтинг"
						type="number"
					/>
					<div className={styles.fileInput}>
						<label htmlFor="photo">Фото достопримечательности</label>
						<input
							id="photo"
							type="file"
							accept="image/*"
							onChange={handleFileChange}
						/>
						{formData.photoUrl && (
							<img
								src={formData.photoUrl}
								alt="Предпросмотр"
								className={styles.preview}
							/>
						)}
					</div>
					<TextInput
						label="Местоположение"
						name="location"
						value={formData.location}
						onChange={handleChange}
						placeholder="Введите местоположение"
					/>
					<div className={styles.mapContainer}>
						<Text variant="subheader-1">Выберите местоположение на карте</Text>
						<Map setCoordinates={setCoordinates} formData={formData} setLocation={setLocation} />
						<TextInput
							label="Широта"
							name="latitude"
							value={formData.coordinates.latitude.toString()}
							onChange={(e) =>
								setCoordinates({
									...formData.coordinates,
									latitude: Number(e.target.value),
								})
							}
							placeholder="Широта"
							type="number"
						/>
						<TextInput
							label="Долгота"
							name="longitude"
							value={formData.coordinates.longitude.toString()}
							onChange={(e) =>
								setCoordinates({
									...formData.coordinates,
									longitude: Number(e.target.value),
								})
							}
							placeholder="Долгота"
							type="number"
						/>
					</div>

					{errors.length > 0 && (
						<div className={styles.errors}>
							{errors.map((error, index) => (
								<Text key={index} color="danger">
									{error}
								</Text>
							))}
						</div>
					)}

					<Button view="action" size="l" type="submit">
						{isAdmin ? 'Сохранить' : 'Создать'}
					</Button>
				</form>
			</Card>
		</div>
	)
}
