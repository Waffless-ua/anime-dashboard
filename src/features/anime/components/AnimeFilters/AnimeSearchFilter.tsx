import './AnimeFilters.css';

interface AnimeSearchFilterProps {
    value: string;
    onChange: (value: string) => void;
}

export default function AnimeSearchFilter({ value, onChange }: AnimeSearchFilterProps) {
    return (
        <div className="anime-filter-field">
            <input
                value={value}
                onChange={event => onChange(event.currentTarget.value)}
                type="search"
                aria-label="Пошук аніме за назвою"
                placeholder="Введіть назву аніме"
            />
        </div>
    );
}
