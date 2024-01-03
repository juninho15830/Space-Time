import { View, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import Icon from "@expo/vector-icons/Feather"
import * as SecureStore from 'expo-secure-store'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { Link, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { api } from "../src/lib/api";
import { useEffect, useState } from "react";
import dayjs  from "dayjs";
import ptBr from 'dayjs/locale/pt-br'// 1 Importe dayjs

// 2 Adiciona o este comando para formatação das datas em portugues Brasil
dayjs.locale(ptBr)

interface Memory {
    coverUrl: string
    except: string
    createdAt: string
    id: string
}

export default function NewMemory() {
    const { bottom, top } = useSafeAreaInsets() 
    const router = useRouter()
    
    const [memories, setMemories] = useState<Memory[]>([])

    // Fução para apgar o token e redirecionar para a rota index
    async function signOut() {
        await SecureStore.deleteItemAsync('token')
    
        router.push('/')
    }

    async function loadMemories() {
        const token = await SecureStore.getItemAsync('token')

        const response = await api.get('/memories', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        setMemories(response.data)
    }

    useEffect(() => {
        loadMemories()
    }, [])

    return (
        <ScrollView 
            className="flex-1 px-8"
            contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
        >
            <View className="mt-4 flex-row items-center justify-between">
                <NLWLogo />

                {/* Botão de logout */}
                <TouchableOpacity
                    onPress={signOut}
                    className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
                >
                    <Icon name="log-out" size={16} color="#000" />
                </TouchableOpacity>


                <Link href="/new" asChild>
                    <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
                        <Icon name="plus" size={16} color="#000" />
                    </TouchableOpacity>
                </Link>
            </View>

            <View className="mt-6 space-y-10">
                {memories.map(memory => {
                    return (
                        // 2 Subistituir a data estática pela importação do createdAt utilizando o dayjs para formatação
                        <View key={memory.id} className="space-y-4">
                    <View className="flex-row items-center gap-2">
                        <View className="h-px w-5 bg-gray-50"/>
                        <Text className="font-body text-xs text-gray-100">{dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}</Text>
                    </View>
                    <View className="space-y-4">
                        <Image
                            source={{uri: memory.coverUrl}}
                            className="aspect-video w-full rounded-lg"
                            alt=""
                        />
                        <Text className="font-body text-base leading-relaxed text-gray-100 text-justify">
                            {memory.except}
                        </Text>
                        <Link href="memories/id" asChild>
                            <TouchableOpacity className="flex-row items-center gap-2">
                                <Text className="font-body text-sm text-gray-200">Ler mais</Text>
                                <Icon name="arrow-right" size={16} color="#9e9ea0"/>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}