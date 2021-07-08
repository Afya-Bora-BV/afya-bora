import React from 'react'
import { Center, Image } from 'native-base'

const logo = require("../assets/images/splash_logo.png")

export default () => {
    return (
        <Center flex={1} bgColor="white">
            <Image source={logo} alt="Logo" />
        </Center>
    )
}