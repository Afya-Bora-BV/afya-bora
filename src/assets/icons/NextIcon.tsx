import { Icon, IIconProps } from "native-base";
import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";

function SvgComponent({ size, color, ...rest }: SvgProps & IIconProps) {
	return (
		<Icon viewBox="0 0 33 32" size={size}>
			<Svg
				width={33}
				height={32}
				viewBox="0 0 33 32"
				fill="none"
				{...rest}
			>
				<Rect x={0.008} width={32} height={32} rx={10} fill="#E7E5FF" />
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M17.874 15.61l-4.111-4.691c-.18-.206-.6-.384-.903-.12-.303.265-.181.66 0 .865l3.785 4.318-3.785 4.32c-.18.205-.306.62 0 .902.305.28.723.047.903-.158l4.112-4.691a.587.587 0 000-.745z"
					fill={color}
				/>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
