import React from 'react'

import { Box, Container, Square, Stack, StatusBar, View, Text } from "native-base";
import { Dimensions } from "react-native";
import { colors } from '../../contants/colors'

export default function AltContainer ({ children, title, backdropHeight }: any) {
    return (
        <Container flex={1} position="relative">
			<StatusBar translucent backgroundColor={colors.primary} />
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
            <View position="relative" width="100%" paddingX={5}>
                {/* Placeholder for icon */}
                <Square size="sm" rounded="lg" bg="primary.400">
                    <Box
                        _text={{
                            fontWeight: "bold",
                            fontSize: "lg",
                            color: "white",
                        }}
                        >
                    20
                    </Box>
                </Square>
                <Box position="absolute" alignSelf="center" alignItems="center" justifyContent="center">
                    <Text color="white">{title}</Text>
                </Box>
            </View>
            <View flex={1} padding={4} width="100%">
                {children}
            </View>
        </Container>
    );
}
