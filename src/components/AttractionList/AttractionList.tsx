'use client';

import {useAdmin} from '@/store/useAdmin';
import {useAttractionStore} from '@/store/useAttractionStore';
import {Attraction} from '@/types/attraction';
import {Button, Loader, Select, Switch, TextInput} from '@gravity-ui/uikit';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {AttractionCard} from '../AttractionCard/AttractionCard';
import styles from './AttractionList.module.css';

interface SortConfig {
    key: keyof Attraction | null;
    direction: 'up' | 'down';
}

export const AttractionList = () => {
    const {fetchAttractions, attractions} = useAttractionStore();
    const {isAdmin, setIsAdmin} = useAdmin();
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'planned' | 'visited'>('all');
    const [sortConfig, setSortConfig] = useState<SortConfig>({key: null, direction: 'up'});

    useEffect(() => {
        fetchAttractions();
    }, [fetchAttractions]);

    const handleSort = (key: keyof Attraction) => {
        let direction: 'up' | 'down' = 'up';
        if (sortConfig.key === key && sortConfig.direction === 'up') {
            direction = 'down';
        }
        setSortConfig({key, direction});
    };

    const filteredAndSortedAttractions = () => {
        let filtered = [...attractions];

        if (searchTerm) {
            filtered = filtered.filter((attr) =>
                attr.title.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter((attr) => attr.status === statusFilter);
        }

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                if (sortConfig.key) {
                    const aValue = a[sortConfig.key];
                    const bValue = b[sortConfig.key];
                    if (aValue < bValue) return sortConfig.direction === 'up' ? -1 : 1;
                    if (aValue > bValue) return sortConfig.direction === 'up' ? 1 : -1;
                    return 0;
                }
                return 0;
            });
        }

        return filtered;
    };

    const data = filteredAndSortedAttractions();

    return (
        <div className={styles.listContainer}>
            <Switch size="l" checked={isAdmin} onUpdate={setIsAdmin} content="Admin Mode" />

            {isAdmin && (
                <Button view="action" size="l" onClick={() => router.push('/createAttraction')}>
                    Создать карточку
                </Button>
            )}

            <h1>Список достопримечательностей</h1>

            <div className={styles.filters}>
                <TextInput
                    placeholder="Поиск по названию..."
                    value={searchTerm}
                    onUpdate={(value: string) => setSearchTerm(value)}
                    size="l"
                />
                <Select
                    value={[statusFilter]}
                    onUpdate={(value) => setStatusFilter(value[0] as 'all' | 'planned' | 'visited')}
                    options={[
                        {value: 'all', content: 'Все'},
                        {value: 'planned', content: 'Запланировано'},
                        {value: 'visited', content: 'Посещено'},
                    ]}
                    size="l"
                    className={styles.statusFilter}
                />
            </div>

            <div className={styles.sortButtons}>
                <Button
                    view="outlined"
                    size="m"
                    onClick={() => handleSort('title')}
                    selected={sortConfig.key === 'title'}
                >
                    Название{' '}
                    {sortConfig.key === 'title' && (sortConfig.direction === 'up' ? '↑' : '↓')}
                </Button>
                <Button
                    view="outlined"
                    size="m"
                    onClick={() => handleSort('rating')}
                    selected={sortConfig.key === 'rating'}
                >
                    Рейтинг{' '}
                    {sortConfig.key === 'rating' && (sortConfig.direction === 'up' ? '↑' : '↓')}
                </Button>
                <Button
                    view="outlined"
                    size="m"
                    onClick={() => handleSort('location')}
                    selected={sortConfig.key === 'location'}
                >
                    Местоположение{' '}
                    {sortConfig.key === 'location' && (sortConfig.direction === 'up' ? '↑' : '↓')}
                </Button>
            </div>

            <p>Количество достопримечательностей: {data.length ?? '0'}</p>

            {data.length > 0 ? (
                <div className={styles.list}>
                    {data.map((attraction) => (
                        <AttractionCard key={attraction.id} attraction={attraction} />
                    ))}
                </div>
            ) : (
                <Loader size="l" />
            )}
        </div>
    );
};
