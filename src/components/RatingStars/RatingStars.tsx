import {StarFill} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';
import styles from './RatingStars.module.css';

interface RatingStarsProps {
    value: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({value}) => {
    const maxRating = 5;
    return (
        <div className={styles.ratingStars}>
            {Array.from({length: maxRating}, (_, index) => (
                <Icon
                    key={index}
                    data={StarFill}
                    size={'m'}
                    className={index < value ? styles.filledStar : styles.emptyStar}
                />
            ))}
        </div>
    );
};
