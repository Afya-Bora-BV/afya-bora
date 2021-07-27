import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

interface _BaseContainerProps { children: JSX.Element[] | JSX.Element }
export default function _BaseContainer ({ children }: _BaseContainerProps) {
    return (
        <SafeAreaView style={{ flex: 1 }} testID="baseConatainer">
            {children}
        </SafeAreaView>
    )
}
