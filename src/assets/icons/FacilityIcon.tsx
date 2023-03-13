import { Icon, IIconProps } from "native-base";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";


function SvgComponent({ size = 24, color, ...rest }: SvgProps & IIconProps & { size: number }) {
    return (
        // <Icon viewBox="0 0 960 960" size={size} color={color}>
        <Svg
            viewBox="0 96 960 960"
            width={size}
            height={size}
            {...rest}
            fill={color}
        >
            <Path d="M435 777h90V621h156v-90H525V375h-90v156H279v90h156v156ZM180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z" />
        </Svg>
        // </Icon>
    )
}

export default SvgComponent