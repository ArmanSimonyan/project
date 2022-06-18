import React from 'react'

interface IAlertBox {
    alertMessage: string
}

export const AlertBox: React.FC<IAlertBox> = ({ alertMessage }) => {
    let alertColor = '#fff'

    switch (alertMessage) {
        case 'Sucsses':
            alertColor = 'green'
            break
        case 'Failed':
            alertColor = 'green'
            break
        case 'Sucsses':
            alertColor = 'green'
            break
        default:
            break
    }

    return <div style={{ background: alertColor }}>{alertMessage}</div>
}
