import { Icon, IIconProps } from "native-base";
import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";

function SvgComponent({ size, color, ...rest }: SvgProps & IIconProps) {
	return (
		<Icon viewBox="0 0 49 48" size={size}>
			<Svg
				width={49}
				height={48}
				viewBox="0 0 49 48"
				fill="none"
				{...rest}
			>
				<Rect x={0.008} width={48} height={48} rx={10} fill="#FFE2DE" />
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M35.008 23.427a.86.86 0 11-1.719 0V21.28H14.727v6.44a1.72 1.72 0 001.718 1.718H31.57a1.72 1.72 0 001.72-1.718.86.86 0 111.718 0 3.441 3.441 0 01-3.438 3.437H16.445a3.441 3.441 0 01-3.437-3.437v-9.282A3.441 3.441 0 0116.445 15H31.57a3.441 3.441 0 013.438 3.438v4.99zm-20.281-4.99v1.123h18.562v-1.122a1.72 1.72 0 00-1.719-1.72H16.445a1.72 1.72 0 00-1.718 1.72z"
					fill="#FF6F5B"
				/>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
