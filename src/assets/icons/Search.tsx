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
                {...rest}
            >
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.17 11.709l4.898 4.994a.975.975 0 01-.011 1.348.93.93 0 01-1.322.012l-4.86-4.955.017-.02a6.204 6.204 0 01-8.56-.658c-2.241-2.48-2.217-6.305.054-8.755a6.203 6.203 0 018.569-.547C14.508 5.27 15 9.062 13.08 11.808l.09-.1zM3.254 8.085c0 2.656 2.111 4.81 4.716 4.81 2.603-.003 4.713-2.155 4.716-4.81 0-2.656-2.111-4.81-4.716-4.81S3.253 5.43 3.253 8.085z"
                    fill={color}
                />
            </Svg>
        </Icon>
    )
}

export default SvgComponent

