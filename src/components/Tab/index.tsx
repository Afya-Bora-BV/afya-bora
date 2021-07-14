export interface TabBarOptions {
    activeTintColor?: string,
    inactiveTintColor?: string
}

export interface ScreenRoute {
    name: string,
    component: () => JSX.Element
    options?: {
        tabBarLabel: string,
        tabBarIcon: (props: { color: string, size: number }) => JSX.Element 
    }
}