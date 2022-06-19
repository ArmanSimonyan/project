import { createMachine } from 'xstate'


interface IContext {
}
interface IStates {

    states: {
        IDLE: {},
        UPLOADING: {},
        SUCCESS: {},
        FAILED: {},
        CANCELED: {},
    }
}
interface IMachineEvents {

}

const FileUploadMachine = createMachine({
    id: 'file',
    initial: 'IDLE',
    context: {

    },
    states: {
        IDLE: {
            on: { UPLOADING: 'UPLOADING' },
        },
        UPLOADING: {
            entry: "uploadFiles",
            on: {
                SUCCESS: 'SUCCESS',
                CANCELED: 'CANCELED',
                FAILED: 'FAILED',
            },
        },
        SUCCESS: {
            on: { IDLE: 'IDLE'},
        },
        FAILED: {
            on: {
                IDLE: 'IDLE',
                UPLOADING: "UPLOADING"
            },
        },
        CANCELED: {
            on: {
                IDLE: 'IDLE',
                UPLOADING: "UPLOADING"
            }
        },

    },

}, )


export default FileUploadMachine
