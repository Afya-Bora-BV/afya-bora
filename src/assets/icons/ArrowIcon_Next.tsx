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
					d="M10.533 8.277L6.422 3.586c-.18-.206-.6-.384-.903-.12-.303.264-.181.659 0 .864l3.785 4.32-3.785 4.318c-.18.205-.306.621 0 .902.305.281.723.048.903-.157l4.112-4.691a.587.587 0 000-.745z"
					fill="#561BB3"
				/>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
