import { Icon, IIconProps } from "native-base"
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent({ size, color, ...rest }: SvgProps & IIconProps) {
    return (
        <Icon viewBox="0 0 24 24" size={size}>
            <Svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                {...rest}
            >
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.358 12.036c-.384-.183-.776-.34-1.175-.472a5.308 5.308 0 002.13-4.252A5.319 5.319 0 0012 2a5.319 5.319 0 00-5.313 5.313c0 1.738.84 3.284 2.135 4.254-1.187.39-2.3.998-3.274 1.8a10.192 10.192 0 00-3.497 5.77A2.372 2.372 0 004.37 22h9.621a.781.781 0 100-1.563H4.371a.794.794 0 01-.625-.297.816.816 0 01-.166-.684c.811-3.894 4.246-6.739 8.213-6.835a5.272 5.272 0 00.416 0 8.512 8.512 0 013.478.826.781.781 0 00.671-1.411zm-4.168-.978a10.98 10.98 0 00-.38 0 3.755 3.755 0 01-3.56-3.745A3.754 3.754 0 0112 3.563a3.754 3.754 0 013.75 3.75 3.755 3.755 0 01-3.56 3.745zM19 14.35a3.65 3.65 0 100 7.3 3.65 3.65 0 000-7.3zm0 1.3a2.35 2.35 0 110 4.7 2.35 2.35 0 010-4.7z"
                    fill={color}
                />
            </Svg>
        </Icon>
    )
}

export default SvgComponent

