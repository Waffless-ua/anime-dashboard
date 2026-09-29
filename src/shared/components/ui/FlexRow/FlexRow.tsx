interface FlexRowProps {
    children: React.ReactNode;
    gap?: string | number;
    align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
    margin?: string | number;
    className?: string;
}

export default function FlexRow({
    children,
    gap = '1rem',
    align = 'center',
    justify = 'flex-start',
    margin = 'auto',
    className = ''
}: FlexRowProps) {

    const style: React.CSSProperties = {
        display: 'flex',
        alignItems: align,
        justifyContent: justify,
        margin: typeof margin === 'number' ? `${margin}px` : margin,
        gap: typeof gap === 'number' ? `${gap}px` : gap,
    };

    return (
        <div style={style} className={className}>
            {children}
        </div>
    );
}