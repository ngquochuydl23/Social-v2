export async function url2File(url, fileName){
    const blob = await (await fetch(url)).blob()
    return new File([blob], fileName, {type: blob.type})
}