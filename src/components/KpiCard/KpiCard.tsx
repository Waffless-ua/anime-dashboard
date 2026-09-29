import './KpiCard.css';

interface KpiCardProps {
    title: string;
    value: string | number;
    change?: string;
    isPositive?: boolean;
}

export default function KpiCard({ title, value, change, isPositive }: KpiCardProps) {
    return (
        <div className="kpi-card">
            <h3 className="kpi-title">{title}</h3>

            <div className="kpi-value-container">
                <span className="kpi-value">{value}</span>

                {change && (
                    <span className={`kpi-change ${isPositive ? 'positive' : 'negative'}`}>
            {change}
          </span>
                )}
            </div>
        </div>
    );
}