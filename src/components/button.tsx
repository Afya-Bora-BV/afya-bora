import React from "react"
import { Button, Stack, Icon, } from "native-base"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import {colors} from "../contants/colors"

export const PrimaryButton = () => {
    return (
        <Button borderRadius={20} _disabled={{
            backgroundColor: "#B0B3C7",
            color: "white"
        }} style={{ backgroundColor: colors.primary }} _text={{ color: "white" }} >Button</Button>
    )
}
export const OutLineButton = () => <Button variant="outline" borderRadius={20} style={{ borderColor: colors.primary }} _text={{ color: colors.primary }} >Button</Button>

export const SecondaryButton = () => {
    return (
        <Button borderRadius={20} style={{ backgroundColor: "#E7E5FF" }} _text={{ color: colors.primary }} >New profile</Button>
    )
}
export default () => {
    return (
        <Stack
            space={4}
        >
            <PrimaryButton />
            <OutLineButton />
            <SecondaryButton />
        </Stack>
    )
}