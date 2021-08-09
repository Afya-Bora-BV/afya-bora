import { Icon, IIconProps } from "native-base";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function SvgComponent({ size, color, ...rest }: SvgProps & IIconProps) {
	return (
		<Icon viewBox="0 0 16 16" size={size}>
			<Svg
				width={16}
				height={16}
				viewBox="0 0 16 16"
				fill="none"
				{...rest}
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M10.781 9.906c0-1.034.841-1.875 1.875-1.875h2.094V6.25c0-.69-.56-1.25-1.25-1.25H1.875c-.22 0-.43-.038-.625-.107V13.5c0 .69.56 1.25 1.25 1.25h11c.54 0 1.016-.343 1.186-.854a.625.625 0 111.186.396A2.497 2.497 0 0113.5 16h-11A2.503 2.503 0 010 13.5V2.969c0-.088.018-.171.05-.247.197-.825.94-1.44 1.825-1.44h1.156a.625.625 0 110 1.25H1.875a.626.626 0 00-.625.609c.008.337.286.609.625.609h.94L8.838.09a.625.625 0 01.862.217l.708 1.197L11.975.53a.625.625 0 01.863.206l2.126 3.488A2.498 2.498 0 0116 6.25v4.906c0 .345-.28.625-.625.625h-.02l-.011-.001h-.01l-.021.001h-2.657a1.877 1.877 0 01-1.875-1.875zm1.875.625h2.094v-1.25h-2.094a.626.626 0 000 1.25zM5.223 3.75l3.722-2.262.666 1.126a.626.626 0 00.09.152l.58.984H5.224zm5.82-1.17l.69 1.17h1.477l-1.112-1.824-1.055.654z"
					fill="#747F9E"
				/>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
