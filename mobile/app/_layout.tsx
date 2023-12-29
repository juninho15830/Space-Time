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
import * as SecureStore from 'expo-secure-store' 
import { useCallback, useEffect, useState } from "react"

const StyledStripes = styled(Stripes)

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(
        null,
    )

    const [hasLoadedFonts] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        BaiJamjuree_700Bold,
    })

    useEffect(() => {
        SecureStore.getItemAsync('token').then(token => {
            setIsUserAuthenticated(!!token)
        })
    }, []) 

    const onLayoutRootView = useCallback(async () => {
        if (hasLoadedFonts) {
          // This tells the splash screen to hide immediately
          SplashScreen.hideAsync();
        }
      }, [hasLoadedFonts]);
    
      if (!hasLoadedFonts) return null;

    return (
        <ImageBackground onLayout={onLayoutRootView}
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
            <Stack.Screen name="index" redirect={isUserAuthenticated}/>
            <Stack.Screen name="new"/>
            <Stack.Screen name="memories"/>
        </Stack>
        </ImageBackground>
    )
}