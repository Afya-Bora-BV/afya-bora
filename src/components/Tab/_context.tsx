import React from 'react'

import createContext from 'zustand/context'
import create from 'zustand'
import { useCallback } from 'react'
import produce from 'immer'
import { ScreenRoute, TabBarOptions } from '.'

/**
 * AfyaBora Themed Tab State
 */
interface ABTabState {
    routes: ScreenRoute[],
    initialRouteName?: string,
    tabBarOptions?: TabBarOptions,
    addRoute: (screen: ScreenRoute) => void
}

const { Provider, useStore } = createContext<ABTabState>()
const createAbStateStore = (initialRouteName?: string, tabBarOptions?: TabBarOptions) => create<ABTabState>((set, get) => ({
    routes: [],
    initialRouteName,
    tabBarOptions,
    addRoute: (screen) => {
        set(prev => produce(prev, df => {
            df.routes.push(screen)
            return df
        }))
    }
}))

function TabContextProvider (
    props: { 
        children: JSX.Element[] | JSX.Element,
        initialRouteName?: string,
        tabBarOptions?: TabBarOptions
    }
) {
    let _createStore = useCallback(() => {
        return createAbStateStore(props.initialRouteName, props.tabBarOptions)
    }, [props])
    return (
        <Provider createStore={_createStore}>
            {props.children}
        </Provider>
    )
}

export {
    TabContextProvider,
    useStore as useTabContextStore
}
