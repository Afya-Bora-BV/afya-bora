import { Icon, IIconProps } from "native-base"
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent({ size, color, ...rest }: SvgProps & IIconProps) {
    return (
        <Icon viewBox="0 0 20 20" size={size}>
            <Svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
            >
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 10.488l5.14 5.863c.225.257.75.48 1.128.15.378-.33.226-.824 0-1.08l-4.73-5.4 4.73-5.398c.226-.256.382-.777 0-1.128-.38-.35-.903-.06-1.129.197L6 9.556a.733.733 0 00.001.932z"
                    fill={color}
                />
            </Svg>
        </Icon>
    )
}

export default SvgComponent
