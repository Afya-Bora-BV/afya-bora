import { Icon, IIconProps } from "native-base";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function SvgComponent({ size, color, ...rest }: SvgProps & IIconProps) {
	return (
		<Icon viewBox="0 0 12 12" size={size}>
			<Svg
				width={12}
				height={12}
				viewBox="0 0 12 12"
				fill="none"
				{...rest}
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M10.855 1.145A2.186 2.186 0 009.3.5c-.588 0-1.14.229-1.556.645l-6.151 6.15a.43.43 0 00-.11.19l-.966 3.47a.43.43 0 00.531.529l3.471-.986a.43.43 0 00.187-.717L2.517 7.586l5.098-5.098 1.896 1.896-3.903 3.892a.43.43 0 00.607.609l4.64-4.628c.416-.416.645-.968.645-1.556 0-.588-.229-1.14-.645-1.556zM3.581 9.87l-2.032.577.569-2.045 1.463 1.468zm6.539-6.094l.128-.128c.253-.253.393-.59.393-.948s-.14-.695-.393-.949a1.333 1.333 0 00-.949-.393c-.358 0-.695.14-.948.393l-.128.128 1.897 1.897z"
					fill="#747F9E"
				/>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
