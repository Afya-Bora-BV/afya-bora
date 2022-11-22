import React from 'react'
import { View, Text, Button, VStack, Select, CheckIcon } from 'native-base'
import { colors } from '../../constants/colors'
import { useAtom } from 'jotai'
import { languageAtom, showOnboardAtom } from '../../store/atoms'

const languages: { label: "English" | "Swahili", value: "en" | "sw" }[] = [{
    label: "English", value: "en"
}, {
    label: "Swahili", value: "sw"
}]

const OnBoard = () => {
    const [language, setLanguage] = useAtom(languageAtom)
    const [, setIsFirstTime] = useAtom(showOnboardAtom)

    const next = () => {
        setIsFirstTime(false)
    }

    return (
        <View flex={1} alignItems="center" justifyContent={"center"} >
            <VStack space={10}>
                <VStack>
                    <Text>Choose Language</Text>
                    <Select selectedValue={language} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                        // bg: "teal.600",
                        backgroundColor:colors.primary,
                        endIcon: <CheckIcon size="5" color={"#FFFFFF"} />,
                        color:"red.400",
                        _text:{color:"#FFFFFF"}
                    }} mt={1} onValueChange={itemValue => setLanguage(itemValue as "en" | "sw")}>
                        {languages.map(lang => (
                            <Select.Item key={lang.value} label={lang.label} value={lang.value} />
                        ))}
                    </Select>
                </VStack>



                <Button
                    onPress={next}
                    borderRadius={20}
                    _disabled={{
                        backgroundColor: "#B0B3C7",
                        color: "white",
                    }}
                    style={{ backgroundColor: colors.primary }}
                    _text={{ color: "white" }}

                >
                    Continue
                </Button>
            </VStack>

        </View>
    )
}

export default OnBoard