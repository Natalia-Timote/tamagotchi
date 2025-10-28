import './StatusBar.css'

interface StatusBarProps {
    statusVisual: React.CSSProperties
}

export default function StatusBar({ statusVisual }: StatusBarProps) {
    return (
        <div className="container">
            <div style={statusVisual} className="status-bar">
            </div>
        </div>
    )
}
