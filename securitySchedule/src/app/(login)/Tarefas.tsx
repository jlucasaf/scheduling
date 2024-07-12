
import TarefasView from '@/Views/TarefasView'
import { theme } from '@/constants/theme'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Tarefas() {

    

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
            <TarefasView/>
        </SafeAreaView>
    )
}
