import blockies from 'ethereum-blockies-png'
import superagent from 'superagent'
import { serverConfig } from '@/config'
import arrayBufferDataUri from './arraybuffer'

const getBlockie = address => blockies.createDataURL({ seed: address, scale: 32 })
const avatarUrl = _address => {
    const { server, bucket } = serverConfig
    const timeStamp = Date.now().toString().substring(0, 8)
    return `${server}/${bucket}/${_address.toLowerCase()}?t=${timeStamp}`
}


export async function getAvatar(_address) {
    const url = avatarUrl(_address.toLowerCase())
    var imageUrl
    try {
        const response = await superagent
            .get(url)
            .responseType('arraybuffer')
        imageUrl = arrayBufferDataUri(response.body)
    } catch (err) {
        console.warn('Seems you don\'t have Dravatar or Network is terrible, swtiching to identicon')
        imageUrl = getBlockie(_address)
    }
    return imageUrl
}
