import { Icon, IIconProps } from "native-base"
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent({ size, color, ...rest }: SvgProps & IIconProps) {
    return (
        <Icon viewBox="0 0 14 18" size={size}>
            <Svg
                width={14}
                height={18}
                viewBox="0 0 14 18"
                fill="none"
                {...rest}
            >
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.041 11.481V4.94c0-.71-.578-1.289-1.289-1.289h-2.03v.323a1.936 1.936 0 01-1.934 1.933 1.936 1.936 0 01-1.933-1.933V3.65H2.828c-.71 0-1.289.579-1.289 1.29v9.732c0 .71.578 1.289 1.29 1.289h7.923c.711 0 1.29-.578 1.29-1.29a.645.645 0 111.288 0 2.581 2.581 0 01-2.578 2.579H2.828A2.581 2.581 0 01.25 14.672V4.939a2.581 2.581 0 012.578-2.578h2.027v-.966c0-.356.288-.645.644-.645h2.579c.355 0 .644.289.644.645v.966h2.03a2.581 2.581 0 012.579 2.578v6.542a.645.645 0 01-1.29 0zm-5.865 1.644v-1.611H4.565a.645.645 0 010-1.29h1.611v-1.61a.645.645 0 011.29 0v1.61h1.61a.644.644 0 110 1.29h-1.61v1.611a.644.644 0 11-1.29 0zM6.144 2.039h1.289v1.934a.645.645 0 01-1.29 0V2.039z"
                    fill={color}
                />
            </Svg>
        </Icon>
    )
}

export default SvgComponent
