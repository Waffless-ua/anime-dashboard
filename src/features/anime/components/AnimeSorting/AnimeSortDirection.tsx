import { DIRECTION_OPTIONS } from '../../constants/anime.constants';

import Select from '../../../../shared/components/ui/Select/Select';

interface AnimeSortDirectionProps {
    value: string;
    onChange: (value: string) => void;
}

export default function AnimeSortDirection({ value, onChange }: AnimeSortDirectionProps) {
    return (
        <Select
            value={value}
            onChange={onChange}
            label="Напрямок"
            options={DIRECTION_OPTIONS}
        />
    );
}
