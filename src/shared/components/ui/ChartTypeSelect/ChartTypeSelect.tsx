import Select from '../Select/Select';
import type { ChartType } from '../../../types/chart.types';
import type { SelectOption } from '../../../types/select.types';

const CHART_TYPE_OPTIONS: readonly SelectOption<ChartType>[] = [
    { value: 'bar', label: 'Стовпчикова' },
    { value: 'pie', label: 'Кругова' },
];

interface ChartTypeSelectProps {
    value: ChartType;
    onChange: (type: ChartType) => void;
}

export default function ChartTypeSelect({ value, onChange }: ChartTypeSelectProps) {
    function handleChange(value: string) {
        const option = CHART_TYPE_OPTIONS.find(option => option.value === value);
        if (option) onChange(option.value);
    }

    return (
        <Select
            label="Тип діаграми"
            options={CHART_TYPE_OPTIONS}
            value={value}
            onChange={handleChange}
        />
    );
}
