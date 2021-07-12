import { Icon, IIconProps } from "native-base";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

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
					d="M23 11.427a.86.86 0 11-1.719 0V9.28H2.72v6.44a1.72 1.72 0 001.719 1.719h15.125a1.72 1.72 0 001.718-1.72.86.86 0 111.719 0 3.441 3.441 0 01-3.438 3.438H4.438A3.441 3.441 0 011 15.72V6.438A3.441 3.441 0 014.438 3h15.125A3.441 3.441 0 0123 6.438v4.99zM2.719 6.437V7.56H21.28V6.438a1.72 1.72 0 00-1.718-1.72H4.438a1.72 1.72 0 00-1.72 1.72z"
					fill="#7065E4"
				/>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
