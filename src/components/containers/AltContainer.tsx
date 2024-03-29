import React, { useCallback } from 'react'
import {
	Box,
	Center,
	HStack,
	Pressable,
	Stack,
	Text,
	View,
    StatusBar
} from "native-base";
import { colors } from '../../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import _BaseContainer from './_BaseContainer';
import AlternateContainer, { AlternateContainerProps } from './AlternateContainer';


interface AltContainerProps extends AlternateContainerProps {
	headerMode?: 'with-back' | 'none',
    navigation?: any
}

export default function AltContainer ({ headerMode, navigation, ...restAlternateProps }: AltContainerProps) {
	const onBackPress = useCallback(() => navigation.goBack(), [])
	const _headerMode = headerMode || 'none'

    return (
        <AlternateContainer
            bgColor={colors.primary}
            titleColor={"#FFF"}
            leftSection={_headerMode !== 'none' ? (
                (_headerMode === 'with-back') ? (
                    () => {
                        if (navigation.canGoBack()) {
                            return (
                                <Pressable onPress={onBackPress}>
                                    <Center p={2} backgroundColor="#E7E5FF" borderRadius="4">
                                        <MaterialIcons
                                            name="chevron-left"
                                            size={25}
                                            color={colors.primary}
                                        />
                                    </Center>
                                </Pressable>
                            )
                        }
                        console.warn("`headerMode=with-back but there is previous navigation to work with")
                        return null
                    }
                    ): undefined
                ): undefined
            }
            {...restAlternateProps}
         />
    );
}
