import * as React from "react"
import { Icon, IIconProps } from 'native-base'
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent({ size, color, ...rest }: SvgProps & IIconProps) {
    return (
        <Icon viewBox="0 0 20 20" size={size} {...rest}>
            <Svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
            >
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.273 15.988a.716.716 0 01.847.555 2.175 2.175 0 01-2.127 2.624H3.007A2.175 2.175 0 01.88 16.543a9.343 9.343 0 013.206-5.29 9.307 9.307 0 013-1.65 4.866 4.866 0 01-1.956-3.9A4.875 4.875 0 0110 .833a4.875 4.875 0 014.87 4.87c0 1.593-.769 3.01-1.954 3.898a9.315 9.315 0 014.827 3.668.716.716 0 11-1.19.797 7.878 7.878 0 00-6.362-3.497 5.025 5.025 0 01-.38 0c-3.637.088-6.786 2.696-7.529 6.266a.748.748 0 00.152.627.728.728 0 00.573.273h13.986c.306 0 .49-.171.573-.273a.748.748 0 00.152-.627.716.716 0 01.555-.847zM10 2.266a3.441 3.441 0 00-3.437 3.437 3.442 3.442 0 003.264 3.433 9.265 9.265 0 01.347 0 3.442 3.442 0 003.264-3.433A3.441 3.441 0 0010 2.266z"
                    fill={color}
                />
            </Svg>
        </Icon>
    )
}

export default SvgComponent
