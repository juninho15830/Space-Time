import { styled } from "nativewind"
import { ImageBackground } from "react-native"

import {
    useFonts,
    Roboto_400Regular,
    Roboto_700Bold,
} from '@expo-google-fonts/roboto'
  
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import { SplashScreen, Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import * as SecureStore from 'expo-secure-store' // 3 importe SecureStore para usarmos o token
import { useEffect, useState } from "react"

const StyledStripes = styled(Stripes)

export default function Layout() {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(
        null,
    ) // 1 Criamos um useState "dentro do generic < > passamos se o valor vai ser null ou boolean"

    const [hasLoadedFonts] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        BaiJamjuree_700Bold,
    })

    useEffect(() => {
        SecureStore.getItemAsync('token').then(token => {
            setIsUserAuthenticated(!!token)
        })
    }, []) // 2 Usamos o useEffect para verificar se o token existe passar um valor para setIsUserAthenticated "as duas exclamações antes do token serve para tranformalo de string para boleano, então se o token existe o valor é TRUE.

    if (!hasLoadedFonts) {
        return <SplashScreen />
    }

    return (
        <ImageBackground 
            source={blurBg} 
            className="relative bg-gray-900 flex-1"
            imageStyle={{ position: 'absolute', left: '-100%'}}
        >
        
        <StyledStripes className="absolute left-2"/>
        <StatusBar style="light" translucent />

        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'transparent' },
            }} 
        >
            {/* 4 Colocamos um Stack.Screen para cada rota com o nome exato delas, usamos o redirect no index que significa se o token existe redirecione para a proxima rota.*/}
            
            <Stack.Screen name="index" redirect={isUserAuthenticated}/>
            <Stack.Screen name="memories"/>
        </Stack>
        </ImageBackground>
    )
}