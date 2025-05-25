export function isFileImage(file: any) {
    return file && file['type'].split('/')[0] === 'image';
}

export function isFileVideo(file: any) {
    return file && file['type'].split('/')[0] === 'video';
}

export function getMimeType(mimeType: string) {
    return mimeType && mimeType.split('/')[0];
}
