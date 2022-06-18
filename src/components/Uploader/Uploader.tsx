import React, { useState, useRef } from 'react'
import { useMachine } from '@xstate/react'
import ProgressBar from '../ProgressBar/Progress'
import FileUploadMachine from '../Machines/UploadMachine'
import { getUrl, uploadFile } from '../../api'

import './style.scss'

interface ToggleContext {
    count: number
}

// idle
// uploading
// success
// failed
// canceled

export const Uploader = () => {
    const [progresLineValue, setProgressLineValue] = useState(0)
    const [current, send] = useMachine(FileUploadMachine)
    const fileInput: any = useRef(null)
    const isResetDisabled =
        current.value === 'IDLE' || current.value === 'UPLOADING'
    const isProgressBarShowen =
        current.value === 'UPLOADING' || current.value === 'SUCCESS'
    const onUploadProgress = (progress: number) => {
        setProgressLineValue(progress)
    }
    const onChange = async () => {
        const formData = new FormData()
        const files = fileInput.current?.files
        for (const key of Object.keys(files)) {
            formData.append('imgCollection', files[key])
        }
        const url = await getUrl()
        const response = uploadFile(url, formData, onUploadProgress, send)
        try {
            if (current.value === 'CANCALED') {
                setTimeout(() => {
                    response.abort()
                    formData.append('imgCollection', '')
                }, 1500)
            }

            await response.promise
            send('SUCCESS')
        } catch (error) {
            console.log(error)
        }
    }

    const onCancale = () => {
        send('CANCALED')
    }

    const onReset = () => {
        console.log('CANCALED')
        fileInput.current.value = null
        send('IDLE')
        setProgressLineValue(0)
    }

    return (
        <div className="upload-area-wrapper">
            <form onSubmit={() => {}}>
                <input
                    style={{ display: 'none' }}
                    id="file"
                    type="file"
                    ref={fileInput}
                    onChange={onChange}
                    value={fileInput.file}
                    multiple
                    onClick={(e: any) => (e.target.value = null)}
                />

                <label className="upload-btn-wrapper" htmlFor="file">
                    <span
                        className="btn"
                        tabIndex={0}
                        role="button"
                        aria-controls="filename"
                    >
                        Upload file(s):
                    </span>
                </label>
                <div className="state">
                    <button
                        type="button"
                        onClick={onReset}
                        disabled={!!isResetDisabled}
                        className={`reset-btn ${
                            isResetDisabled ? 'disabled' : ''
                        } `}
                    >
                        Reset
                    </button>
                    <p>state:{current.value}</p>
                </div>
                {isProgressBarShowen && (
                    <ProgressBar
                        onCancale={onCancale}
                        completed={progresLineValue}
                    />
                )}
            </form>
        </div>
    )
}
