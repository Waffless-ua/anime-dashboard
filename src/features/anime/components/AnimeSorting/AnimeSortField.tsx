import { ANIME_SORTING_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

interface AnimeSortFieldProps {
    value: string;
    onChange: (value: string) => void;
}

export default function AnimeSortField({ value, onChange }: AnimeSortFieldProps) {
    return (
        <Select
            value={value}
            onChange={onChange}
            label="Сортувати за"
            options={ANIME_SORTING_OPTIONS}
        />
    );
}
