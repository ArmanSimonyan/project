import { createMachine, assign } from 'xstate'
import { useMachine } from '@xstate/react'

const states = {
    IDLE: 'IDLE',
    FAILD: 'FAILD',
    ERROR: 'ERROR',
    UPLOADING: 'UPLOADING',
    SUCCESS: 'SUCCESS',
}

const { IDLE, FAILD, ERROR, UPLOADING, SUCCESS } = states

interface ToggleContext {
    file: React.ReactNode
}

const FileUploadMachine = createMachine<ToggleContext>({
    id: 'file',
    initial: 'IDLE',
    states: {
        IDLE: {
            on: { UPLOADING: 'UPLOADING' },
        },
        UPLOADING: {
            on: {
                SUCCESS: 'SUCCESS',
                CANCALED: 'CANCALED',
                FAILD: 'FAILD',
            },
        },
        SUCCESS: {
            on: {
                IDLE: 'IDLE',
            },
        },
        FAILD: {
            on: { IDLE: 'IDLE' },
        },
        CANCALED: { on: { IDLE: 'IDLE' } },
    },
})

export default FileUploadMachine
