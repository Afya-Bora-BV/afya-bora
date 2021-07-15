import React from 'react'
import { Center } from 'native-base'

const IconContainer: React.FC = ({ children }) => {
    return (
        <Center p={2} backgroundColor="#E7E5FF" borderRadius="4" >
            {children}
        </Center>
    )
}

export default IconContainer