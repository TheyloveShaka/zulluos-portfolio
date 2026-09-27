import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import {
    osVersion,
    osName,
    browserVersion,
    browserName,
    deviceType,
    mobileModel,
    mobileVendor,
    isTablet,
    isMobile,
} from 'react-device-detect'
import axios from 'axios'
import { fs } from '@zenfs/core'
import { fsReady } from '@/utils/zenFs'
import { ClientInfo } from '@contexts/types'

interface ClientContextType {
    clientInfo: ClientInfo;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined)

interface ClientProviderProps {
    children: ReactNode;
}

export const ClientProvider = ({ children }: ClientProviderProps) => {
    const [clientInfo, setClientInfo] = useState<ClientInfo>({
        deviceType: '',
        isTablet: false,
        isMobile: false,
        osName: '',
        osVersion: '',
        browserName: '',
        browserVersion: '',
        gpu: '',
        displayRes: '',
        cpuCores: '',
    })

    const getGeoData = async () => {
        try {
            const response = await axios.get('https://ipapi.co/json/')
            if (response.status === 200) {
                const res = response.data
                setClientInfo((prevInfo) => ({
                    ...prevInfo,
                    ip: res.ip,
                    location: `${res.city}, ${res.region}, ${res.country_name}`,
                    isp: res.org,
                    coordinates: `${res.latitude} N, ${res.longitude} W`,
                }))
            }
        } catch (error) {
            console.error('Error fetching IP address:', error)
        }
    }

    useEffect(() => {
        const gl = document.createElement('canvas').getContext('webgl')
        const ext = gl.getExtension('WEBGL_debug_renderer_info')
        if (ext) {
            setClientInfo((prevInfo) => ({
                ...prevInfo,
                gpu: gl.getParameter(ext.UNMASKED_RENDERER_WEBGL),
            }))
        }
        setClientInfo((prevInfo) => ({
            ...prevInfo,
            cpuCores: navigator.hardwareConcurrency.toString(),
        }))
        const screenWidth = window.screen.width
        const screenHeight = window.screen.height
        setClientInfo((prevInfo) => ({
            ...prevInfo,
            displayRes: `${screenWidth} x ${screenHeight}`,
        }))
        getGeoData()
    }, [])

    useEffect(() => {
        const updateClientInfo = () => {
            setClientInfo((prevInfo) => ({
                ...prevInfo,
                deviceType,
                mobileVendor: isMobile ? mobileVendor : undefined,
                mobileModel: isMobile ? mobileModel : undefined,
                isTablet,
                isMobile,
                osName,
                osVersion,
                browserName,
                browserVersion,
            }))

            void fsReady.then(() => {
                try {
                    if (!fs.existsSync('/tmp/')) {
                        fs.mkdirSync('/tmp/')
                    }
                    fs.writeFileSync('/tmp/clientInfo.json', JSON.stringify(clientInfo))
                } catch (error) {
                    console.error('Error persisting client info:', error)
                }
            })
        }

        const timeoutId = setTimeout(updateClientInfo, 1000)

        return () => clearTimeout(timeoutId)
    }, [clientInfo])

    return <ClientContext.Provider value={{ clientInfo }}>{children}</ClientContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useClient = () => {
    const context = useContext(ClientContext)
    if (context === undefined) {
        throw new Error('useClient must be used within a ClientProvider')
    }
    return context
}
