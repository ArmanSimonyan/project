import React from 'react'

import './style.scss'

interface IProgressBar {
    completed: number
    onCancale: () => void
}

const ProgressBar: React.FC<IProgressBar> = ({ completed, onCancale }) => {
    return (
        <div className="progressBar-area">
            <div
                className="progressBar-filler"
                style={{ width: `${completed}%` }}
            >
                <span className="progressBar-label">{`${completed}%`}</span>
                {completed < 100 && (
                    <button
                        className="delete-btn"
                        type="button"
                        onClick={() => onCancale()}
                    >
                        X
                    </button>
                )}
            </div>
        </div>
    )
}

export default ProgressBar
