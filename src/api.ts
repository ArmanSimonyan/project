export const getUrl = (): Promise<string> => {
    return new Promise((resolve) =>
        setTimeout(() => resolve('https://awesome.com/upload'), 1000)
    )
}
export const markComplete = (id: string): Promise<{ id: string }> => {
    return new Promise((resolve) => setTimeout(() => resolve({ id }), 1000))
}

export const uploadFile = (
    url: string,
    data: any,
    onUploadProgress: (number: number) => void,
    send: (current: string) => void
): {
    promise: Promise<{
        data: { id: string }
        status: number
        statusText: string
        headers: any
        config: {}
        request?: any
    }>
    abort: () => void
} => {
    console.log(url, data, send)
    const controller = new AbortController()

    let progress = 0
    const progressInterval = setInterval(async () => {
        progress += 10
        onUploadProgress(progress)
        if (progress === 100) {
            clearInterval(progressInterval)
        }
    }, 300)
    send('UPLOADING')
    return {
        promise: new Promise((resolve, reject) => {
            const uploadRequest = setTimeout(
                () =>
                    resolve({
                        data: { id: 'UUID' },
                        status: 200,
                        statusText: 'success',
                        headers: {},
                        config: {},
                    }),
                3100
            )
            controller.signal.addEventListener('abort', () => {
                clearTimeout(uploadRequest)
                clearInterval(progressInterval)
                reject()
            })
        }),
        abort: () => controller.abort(),
    }
}
