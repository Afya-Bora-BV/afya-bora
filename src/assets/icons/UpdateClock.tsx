import { Icon, IIconProps } from "native-base";
import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";

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
					d="M8.62 1h6.76C19.582 1 23 4.418 23 8.62v6.76c0 4.202-3.418 7.62-7.62 7.62H8.62C4.418 23 1 19.582 1 15.38V12a.86.86 0 011.719 0v3.38a5.908 5.908 0 005.9 5.901h6.761a5.908 5.908 0 005.901-5.9V8.62a5.908 5.908 0 00-5.9-5.901H8.62A5.921 5.921 0 004.518 4.38h1.626a.86.86 0 110 1.719h-3.38a.861.861 0 01-.86-.86V1.86a.86.86 0 111.72 0v1.01A7.593 7.593 0 018.62 1zm4.24 10.644V6.93a.86.86 0 00-1.72 0V12c0 .228.091.447.252.608l3.38 3.38a.86.86 0 101.216-1.215l-3.129-3.129z"
					fill="#7065E4"
				/>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
