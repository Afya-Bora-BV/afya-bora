import { Icon, IIconProps } from "native-base"
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent({ size, color, ...rest }: SvgProps & IIconProps) {
    return (
        <Icon viewBox="0 0 16 19" size={size}>
            <Svg
                width={16}
                height={19}
                viewBox="0 0 16 19"
                fill="none"
                {...rest}
            >
                <Path
                    d="M14.632 7.578c-.087-.328-.327-.56-.61-.592l-3.848-.424-1.522-4.325C8.54 1.92 8.284 1.715 8 1.715c-.284 0-.54.205-.652.523L5.827 6.562l-3.85.424c-.282.032-.52.264-.609.592-.088.328-.006.687.207.914l2.91 3.098-.858 4.588c-.063.337.045.686.275.888a.627.627 0 00.415.164.615.615 0 00.364-.122L8 14.698l3.318 2.41a.605.605 0 00.778-.042c.231-.203.339-.552.276-.888l-.858-4.588 2.91-3.097c.213-.228.295-.586.207-.915z"
                    fill={color}
                />
            </Svg>
        </Icon>
    )
}

export default SvgComponent
