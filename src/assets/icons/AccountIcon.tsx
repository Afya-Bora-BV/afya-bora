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
					d="M21.928 19.185a.86.86 0 011.016.666A2.61 2.61 0 0120.392 23H3.608a2.61 2.61 0 01-2.552-3.149 11.212 11.212 0 013.847-6.348 11.169 11.169 0 013.6-1.98 5.839 5.839 0 01-2.347-4.68A5.85 5.85 0 0112 1a5.85 5.85 0 015.844 5.844 5.839 5.839 0 01-2.345 4.677 11.179 11.179 0 015.792 4.401.86.86 0 11-1.427.957 9.454 9.454 0 00-7.635-4.196 5.988 5.988 0 01-.457 0c-4.363.106-8.142 3.235-9.034 7.519a.898.898 0 00.182.752c.1.122.321.327.688.327h16.784a.873.873 0 00.688-.327.898.898 0 00.182-.752.86.86 0 01.666-1.017zM12 2.72a4.13 4.13 0 00-4.125 4.125 4.13 4.13 0 003.917 4.12 11.087 11.087 0 01.417 0 4.13 4.13 0 003.916-4.12A4.13 4.13 0 0012 2.719z"
					fill="#7065E4"
				/>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
