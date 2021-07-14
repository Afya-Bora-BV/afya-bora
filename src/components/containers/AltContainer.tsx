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
import { colors } from '../../contants/colors';

import {
	MaterialIcons,
} from "@expo/vector-icons";
import _BaseContainer from './_BaseContainer';


interface AltContainerProps {
	children: JSX.Element[]
	title?: string
	backdropHeight?: number
	headerMode?: 'with-back' | 'none',
    navigation?: any
}

export default function AltContainer ({ children, title, backdropHeight, headerMode, navigation }: AltContainerProps) {
	// const navigation = useNavigation()
	const onBackPress = useCallback(() => navigation.goBack(), [])
	const _headerMode = headerMode || 'none'

    return (
        <_BaseContainer>
            <StatusBar translucent backgroundColor={colors.primary} />
            <Box flex={1} position="relative">
                {/* Background image */}
                <Stack
                    backgroundColor={colors.primary}
                    borderBottomRadius={36}
                    height={backdropHeight || 0}
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                />
                {/* <View position="relative" width="100%" paddingX={5}> */}
                {
                    _headerMode === 'none' ? null : (
                        _headerMode === 'with-back' ? (
                            <HStack justifyContent="space-evenly">
                                <Stack
                                    style={{
                                        flex: 0.5,
                                        alignSelf: "flex-start",
                                    }}
                                >
                                    <Pressable onPress={onBackPress}>
                                        <Center p={2} backgroundColor="#E7E5FF" borderRadius="4">
                                            <MaterialIcons
                                                name="chevron-left"
                                                size={25}
                                                color={colors.primary}
                                            />
                                        </Center>
                                    </Pressable>
                                </Stack>
                                <Stack
                                    style={{
                                        flex: 3,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingRight: 30,
                                    }}
                                >
                                    <Text fontSize="2xl">
                                        {title}
                                    </Text>
                                </Stack>

                                <Stack
                                    style={{
                                        flex: 0.5,
                                        alignSelf: "flex-end",
                                    }}
                                ></Stack>
                            </HStack>
                        ) : null
                    )
                }
                <View flex={1} padding={4} width="100%">
                    {children}
                </View>
            </Box>
        </_BaseContainer>
    );
}
