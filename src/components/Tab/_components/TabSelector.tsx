import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { Button, Text } from 'native-base'
import { useTabContextStore } from '../_context'

import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'

const activeButtonColor = "#561BB3"
const activeTextColor = "#FFF"
const inactiveTextColor = "#BBB"

export default function TabSelector () {
    const routes = useTabContextStore(state => state.routes)
    
    /**
     * Animatation for the tab box to reveal
     */
    const offset = useSharedValue(0)
    const boxAnimatedStyle = useAnimatedStyle(() => {
        return {
            margin: 10,
            marginHorizontal: 15,
            backgroundColor: "#FFF",

            // Shadow related styles
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.2,
            shadowRadius: 13.84,
            elevation: 5,
            // --------------------
            transform: [
                { translateY: offset.value * 100 }
            ],

            padding: 16, 
            borderRadius: 16,
        }
    })

    /**
     * Animation for the tabs selected
     */
    // const tabState = useSharedValue(routes.map(r => ({ name: r.name, state: false })))
    const [selectedTab, set] = useState(routes[0])

    return (
        <TapGestureHandler>
            <View style={{ 
                position: "absolute", 
                flex: 1,
                bottom: 0,
                width: "100%"
            }}>
                <Animated.View
                    style={boxAnimatedStyle}
                >
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                    {
                        routes.map(
                            (route, ix) => {
                                return (
                                    <SingleItem 
                                        key={`route-${route}-${ix}`}
                                        selected={selectedTab}
                                        onSelect={set}
                                        name={route.name}
                                        tabIcon={route.options?.tabBarIcon}
                                        label={route.options?.tabBarLabel || route.name} />
                                )
                            }
                        )
                    }
                    </View>
                </Animated.View>
            </View>
        </TapGestureHandler>
    )
}

function SingleItem ( { name, tabIcon: TabIcon, onSelect, selected, label }: any) {
    // const textColor = active ?  
    const active = useSharedValue(selected === name)


    // style for the button
    const uas = useAnimatedStyle(() => {
        return {
            backgroundColor: active.value ? activeButtonColor : undefined
        }
    })

    // style for the text + icons
    const tabTextStyle = useAnimatedStyle(() => {
        return {
            display: active.value ? "flex": "none",
            color: active.value ? activeTextColor : inactiveTextColor
        }
    })

    return (
        <Pressable onPress={undefined}>
            <Animated.View
                style={[{
                    padding: 6,
                    paddingHorizontal: 10,
                    borderRadius: 16,
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }, uas]}                      
            >
                <Animated.View style={{ marginRight: 4 }}>
                    { TabIcon !== undefined ? (<TabIcon color={active ? activeTextColor : inactiveTextColor} size={4}/>) : null }
                </Animated.View>

                {/* Text view */}
                <Animated.View style={tabTextStyle}>
                    <Text
                        color={active ? activeTextColor : inactiveTextColor}
                    >
                        {label}
                    </Text>
                </Animated.View>
            </Animated.View>
        </Pressable>
    )
}
