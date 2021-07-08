import { Icon, IIconProps } from "native-base"
import * as React from "react"
import Svg, {
    SvgProps,
    Rect,
    Mask,
    G,
    Path,
    Circle,
    Defs,
    Pattern,
    Use,
} from "react-native-svg"

function SvgComponent({ size, color, bgColor, ...rest }: SvgProps & IIconProps) {
    return (
        <Svg
            width={176}
            height={220}
            viewBox="0 0 176 220"
            fill="none"
            {...rest}
        >
            <Rect width={176} height={220} rx={16} fill={bgColor || "#561BB3"} />
            <Mask
                id="prefix__a"

                x={0}
                y={0}
                width={176}
                height={220}
            >
                <Rect width={176} height={220} rx={16} fill="#fff" />
            </Mask>
            <G mask="url(#prefix__a)">
                <Path
                    transform="matrix(-1 0 0 1 186 56)"
                    fill="url(#prefix__pattern0)"
                    d="M0 0h131v166H0z"
                />
                <G opacity={0.358} fill="#E7E5FF">
                    <Circle cx={11} cy={174} r={16} />
                    <Circle cx={60} cy={142} r={3} />
                    <Circle cx={20} cy={111} r={3} />
                    <Circle cx={66.5} cy={90.5} r={9.5} />
                </G>
            </G>
            <Defs>
                <Pattern
                    id="prefix__pattern0"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <Use xlinkHref="#prefix__image0" transform="scale(.00202 .0016)" />
                </Pattern>

            </Defs>
        </Svg>
    )
}

export default SvgComponent
