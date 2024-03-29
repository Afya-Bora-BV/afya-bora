
import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"
import { Icon, IIconProps } from "native-base"

function SvgComponent({ size, color, ...rest }: SvgProps & IIconProps) {
    return (
        <Icon viewBox="0 0 59 51" size={size}>
            <Svg
                width={59}
                height={51}
                viewBox="0 0 59 51"
                fill="none"
                {...rest}
            >
                <Circle cx={10} cy={41} r={10} fill="#D4FAFF" />
                <Circle cx={57} cy={27} r={2} fill="#D4FAFF" />
                <Circle cx={12} cy={10} r={2} fill="#D4FAFF" />
                <Circle cx={47} cy={6} r={6} fill="#D4FAFF" />
                <Path
                    d="M30.697 13.026c-4.69 0-8.504 3.815-8.504 8.504 0 4.69 3.815 8.504 8.504 8.504.792 0 1.576-.109 2.332-.324a1.36 1.36 0 10-.745-2.617 5.79 5.79 0 01-7.37-5.563 5.79 5.79 0 015.783-5.783 5.79 5.79 0 015.54 7.447 1.36 1.36 0 102.607.782 8.51 8.51 0 00-8.147-10.95z"
                    fill="#258FBE"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M30.697 7.583c3.723 0 7.223 1.45 9.857 4.08a13.856 13.856 0 014.09 9.85c-.003 2.715-.756 5.26-2.303 7.781-1.339 2.184-3.079 4.09-4.92 6.106-1.807 1.978-3.674 4.023-5.166 6.383a1.36 1.36 0 01-1.15.634h-.816c-.467 0-.901-.24-1.15-.634-1.492-2.36-3.36-4.405-5.165-6.383-1.842-2.017-3.582-3.922-4.921-6.106-1.547-2.522-2.3-5.066-2.303-7.777a13.858 13.858 0 014.09-9.854 13.856 13.856 0 019.857-4.08zm0 31.632c1.456-2.082 3.108-3.891 4.714-5.65 3.491-3.823 6.507-7.126 6.511-12.05-.007-6.18-5.042-11.21-11.225-11.21s-11.218 5.03-11.225 11.212c.004 4.922 3.02 8.225 6.511 12.048 1.606 1.759 3.258 3.569 4.714 5.65z"
                    fill="#258FBE"
                />
            </Svg>
        </Icon>
    )
}

export default SvgComponent
