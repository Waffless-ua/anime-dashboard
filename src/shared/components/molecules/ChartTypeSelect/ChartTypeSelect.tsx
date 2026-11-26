import Select from '../Select/Select.tsx';
import type { ChartType } from '../../../types/chart.types.ts';
import type { SelectOption } from '../../../types/select.types.ts';

const CHART_TYPE_OPTIONS: readonly SelectOption<ChartType>[] = [
    { value: 'bar', label: 'Стовпчикова' },
    { value: 'pie', label: 'Кругова' },
];

interface ChartTypeSelectProps {
    value: ChartType;
    onChange: (type: ChartType) => void;
}

export default function ChartTypeSelect({ value, onChange }: ChartTypeSelectProps) {

    return (
        <Select
            label="Тип діаграми"
            options={CHART_TYPE_OPTIONS}
            value={value}
            onChange={onChange}
        />
    );
}
