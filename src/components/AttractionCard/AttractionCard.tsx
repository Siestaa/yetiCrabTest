'use client'

import { useAdmin } from '@/store/useAdmin'
import { useAttractionStore } from '@/store/useAttractionStore'
import { Attraction } from '@/types/attraction'
import { PencilToLine, TrashBin } from '@gravity-ui/icons'
import { Card, Label, Text } from '@gravity-ui/uikit'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { RatingStars } from '../RatingStars/RatingStars'
import styles from './AttractionCard.module.css'

interface AttractionCardProps {
	attraction: Attraction
}

export const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
	const router = useRouter()
	const { updateStatus, deleteAttraction } = useAttractionStore()
	const { isAdmin } = useAdmin()
	const mapsLink = `https://www.google.com/maps?q=${attraction.coordinates.latitude},${attraction.coordinates.longitude}`
	const formattedDate = new Date(attraction.createdAt).toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})

	const statusConfig = {
		planned: { view: 'normal' as const, text: 'В планах' },
		visited: { view: 'positive' as const, text: 'Посещено' },
	}

	const toggleStatus = () => {
		const newStatus = attraction.status === 'planned' ? 'visited' : 'planned'
		updateStatus(attraction.id, newStatus)
	}

	const handleEdit = () => {
		router.push(`/editAttraction/${attraction.id}`)
	}

	const handleDelete = () => {
		deleteAttraction(attraction.id)
	}

	return (
		<Card className={styles.card}>
			<div className={styles.imageContainer}>
				<Image
					src={attraction.photoUrl}
					alt={attraction.title}
					width={300}
					height={200}
					className={styles.image}
				/>
			</div>

			<div className={styles.content}>
				<div className={styles.titleContainer}>
					<Text variant="header-1">{attraction.title}</Text>
					{isAdmin && (
						<div className={styles.iconsContainer}>
							<PencilToLine className={styles.editCard} onClick={handleEdit} />
							<TrashBin className={styles.editCard} onClick={handleDelete} />
						</div>
					)}
				</div>

				<div className={styles.meta}>
					<Label onClick={() => toggleStatus()}>
						{statusConfig[attraction.status].text}
					</Label>
					<Text variant="subheader-1" className={styles.rating}>
						<RatingStars value={attraction.rating} size="m" />
					</Text>
				</div>

				<Text variant="body-1" className={styles.description}>
					{attraction.description}
				</Text>

				<Text variant="body-2" className={styles.location}>
					Местоположение: {attraction.location}
				</Text>

				<Text variant="body-2">
					Координаты: {attraction.coordinates.latitude},{' '}
					{attraction.coordinates.longitude}
				</Text>

				<a
					href={mapsLink}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.mapLink}
				>
					<Text variant="body-2" color="info">
						Открыть на карте
					</Text>
				</a>

				<Text variant="caption-1" className={styles.date}>
					Добавлено: {formattedDate}
				</Text>
			</div>
		</Card>
	)
}
