import {StarFill} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';
import styles from './RatingStars.module.css';

interface RatingStarsProps {
    value: number;
    size?: 's' | 'm' | 'l';
}

export const RatingStars: React.FC<RatingStarsProps> = ({value, size = 'm'}) => {
    const maxRating = 5;
    return (
        <div className={styles.ratingStars}>
            {Array.from({length: maxRating}, (_, index) => (
                <Icon
                    key={index}
                    data={StarFill}
                    size={size === 's' ? 16 : size === 'm' ? 20 : 24}
                    className={index < value ? styles.filledStar : styles.emptyStar}
                />
            ))}
        </div>
    );
};
