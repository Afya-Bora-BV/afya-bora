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
                <Circle cx={10} cy={41} r={10} fill="#A9F04C" fillOpacity={0.13} />
                <Circle cx={57} cy={27} r={2} fill="#A9F04C" fillOpacity={0.13} />
                <Circle cx={12} cy={10} r={2} fill="#FFE2DE" />
                <Circle cx={47} cy={6} r={6} fill="#A9F04C" fillOpacity={0.13} />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M51 31.469c0-5.6-5.607-10.157-12.5-10.157V10.376a3.129 3.129 0 00-3.125-3.125h-7.11a.781.781 0 000 1.563h7.11c.862 0 1.563.7 1.563 1.562v14.063c0 .861-.701 1.562-1.563 1.562H23.319a.781.781 0 00-.716.468 7.035 7.035 0 01-4.606 3.975 5.814 5.814 0 001.284-3.662A.781.781 0 0018.5 26h-4.375c-.862 0-1.563-.7-1.563-1.563V10.376c0-.862.701-1.563 1.563-1.563h7.11a.781.781 0 000-1.562h-7.11A3.129 3.129 0 0011 10.375v14.063a3.127 3.127 0 003.125 3.124h3.523c-.395 2.159-2.097 2.958-2.527 3.16a.801.801 0 00-.095.048.781.781 0 00.349 1.48h.781a8.596 8.596 0 007.657-4.688h2.753c-.512 1.265-.566 2.612-.566 3.907 0 5.6 5.607 10.156 12.5 10.156.622 0 1.238-.038 1.871-.117a8.62 8.62 0 006.723 3.242h.781a.781.781 0 00.363-1.473c-.02-.016-.072-.042-.148-.08-.528-.264-2.232-1.114-2.51-3.343C48.983 37.928 51 34.825 51 31.47zm-6.593 7.243a.78.78 0 00-.422.707 5.754 5.754 0 001.266 3.521 7.069 7.069 0 01-3.895-2.72.782.782 0 00-.755-.32c-.72.11-1.408.163-2.101.163-6.03 0-10.938-3.856-10.938-8.594 0-1.402.062-2.756.742-3.907h7.071a3.129 3.129 0 003.125-3.125v-1.562c6.03 0 10.938 3.855 10.938 8.594 0 2.908-1.881 5.615-5.031 7.243zM24.75 8.812a.781.781 0 100-1.562.781.781 0 000 1.563zM43.188 32.25a.781.781 0 100-1.563.781.781 0 000 1.563zm-3.907-.781a.781.781 0 11-1.562 0 .781.781 0 011.562 0zm-5.468.781a.781.781 0 100-1.563.781.781 0 000 1.563zm-7.5-20.313c.43 0 .78.35.78.782v2.344h2.345c.43 0 .78.35.78.78v3.126c0 .431-.35.781-.78.781h-2.344v2.344c0 .431-.35.781-.782.781h-3.125a.781.781 0 01-.78-.781V19.75h-2.345a.781.781 0 01-.78-.781v-3.125c0-.432.35-.781.78-.781h2.344v-2.344c0-.432.35-.781.782-.781h3.125zm2.343 6.25v-1.562h-2.343a.781.781 0 01-.782-.781V13.5H23.97v2.344c0 .431-.35.781-.782.781h-2.343v1.563h2.343c.432 0 .782.35.782.78v2.345h1.562v-2.344c0-.432.35-.782.782-.782h2.343z"
                    fill="#A9F04C"
                />
            </Svg>
        </Icon>
    )
}

export default SvgComponent
