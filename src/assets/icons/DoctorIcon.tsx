import { Icon, IIconProps } from "native-base";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function SvgComponent({ size = 24, color, ...rest }: SvgProps & IIconProps & { size: number }) {

    return (
        // <Icon viewBox="0 96 960 960" size={size}>
        <Svg
            viewBox="0 96 960 960"
            height={size}
            width={size}
            fill={color}            
            {...rest}
        >
            <Path d="M540 975q-112 0-186-78.5T280 709v-35q-85-11-142.5-75.711T80 446V216h120v-40h60v140h-60v-40h-60v169.677Q140 517 189.5 566.5T310 616q71 0 120.5-49.5T480 445.677V276h-60v40h-60V176h60v40h120v230q0 87.578-57.5 152.289Q425 663 340 674v35q0 85 56.5 145.5T540 915q81 0 140.5-60.152T740 708.765V632q-35-10-57.5-39T660 526q0-45.833 32.118-77.917 32.117-32.083 78-32.083Q816 416 848 448.083q32 32.084 32 77.917 0 38-22.5 67T800 632v77q0 111-76.5 188.5T540 975Zm229.825-399Q791 576 805.5 561.675q14.5-14.324 14.5-35.5Q820 505 805.675 490.5q-14.324-14.5-35.5-14.5Q749 476 734.5 490.325q-14.5 14.324-14.5 35.5Q720 547 734.325 561.5q14.324 14.5 35.5 14.5Zm.175-50Z" />
        </Svg>
        // </Icon>
    )
}

export default SvgComponent

