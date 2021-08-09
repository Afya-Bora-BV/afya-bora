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
					d="M12.481 10.206V4.39c0-.632-.514-1.146-1.146-1.146H9.531v.286A1.72 1.72 0 017.81 5.25a1.72 1.72 0 01-1.718-1.719v-.286H4.292c-.632 0-1.146.514-1.146 1.146v8.65c0 .632.514 1.146 1.146 1.146h7.043c.632 0 1.146-.514 1.146-1.145a.573.573 0 011.146 0 2.294 2.294 0 01-2.292 2.291H4.292A2.294 2.294 0 012 13.042V4.39a2.294 2.294 0 012.292-2.292h1.801v-.86c0-.316.257-.572.573-.572h2.292c.316 0 .573.256.573.573v.859h1.804a2.294 2.294 0 012.292 2.292v5.815a.573.573 0 01-1.146 0zm-5.213 1.46v-1.432H5.835a.573.573 0 010-1.146h1.433V7.656a.573.573 0 011.145 0V9.09h1.433a.573.573 0 110 1.145H8.413v1.433a.573.573 0 11-1.145 0zm-.029-9.854h1.146v1.72a.574.574 0 01-1.146 0v-1.72z"
					fill="#747F9E"
				/>
			</Svg>
		</Icon>
	);
}

export default SvgComponent;
