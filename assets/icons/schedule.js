import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width="25px"
      height="25px"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        transform="translate(-330 -797) translate(330 797)"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <Path d="M0 0H40V40H0z" />
        <Path
          d="M26.25 37.5c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-17.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z"
          fill="#666"
          fillRule="nonzero"
        />
        <Path
          fill="#666"
          fillRule="nonzero"
          d="M28.2375 31.25L25 28.0125 25 22.5 27.5 22.5 27.5 26.9875 30 29.4875z"
        />
        <Path
          d="M35 7.5A2.5 2.5 0 0032.5 5h-5V2.5H25V5H15V2.5h-2.5V5h-5A2.5 2.5 0 005 7.5v25A2.5 2.5 0 007.5 35h5v-2.5h-5v-25h5V10H15V7.5h10V10h2.5V7.5h5V15H35V7.5z"
          fill={props.fill}
          fillRule="nonzero"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
