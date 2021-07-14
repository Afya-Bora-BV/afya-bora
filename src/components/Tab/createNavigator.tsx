import React from 'react'
import NavigatorScene from './_components/Scene'
import TabSelector from './_components/TabSelector'

import { View as NativeView } from 'react-native'
import { TabContextProvider, useTabContextStore } from './_context'
import { ScreenRoute, TabBarOptions } from '.'
import { useEffect } from 'react'

function _ActualTabNavigator ({ lazy, children }: any) {
    return (
        <NativeView style={{ flex: 1, position: "relative" }}>
            {/* Area viewed by the end user */}
            <NavigatorScene />

            {/* Tab selector component */}
            {children}
            <TabSelector />
        </NativeView>
    )
}


interface ABTabNavigatorProps {
    lazy?: boolean
    initialRouteName?: string
    tabBarOptions?: TabBarOptions
    children?: JSX.Element[] | JSX.Element
}


export default function createABSyleTabNavigator() {
    return {
        Navigator: function (props: ABTabNavigatorProps) {
            let { lazy, children, ...contextProps } = props
            return (
                <TabContextProvider {...contextProps}>
                    <_ActualTabNavigator lazy={lazy}>
                        {children}
                    </_ActualTabNavigator>
                </TabContextProvider>
            )
        },
        Screen: function (props: ScreenRoute) {
            const addScreen = useTabContextStore(state => state.addRoute)
            useEffect(() => {
                addScreen(props)
            }, [])
            return null
        }
    }
}