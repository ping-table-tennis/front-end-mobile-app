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
        transform="translate(-234 -797) translate(234 797)"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <Path d="M0 0H40V40H0z" />
        <Path
          d="M12.007 2.162C12.52.855 13.753 0 15.122 0c1.37 0 2.601.855 3.115 2.162 5.107 1.445 8.646 6.225 8.646 11.678v8.123l3.078 4.753c.344.53.377 1.213.084 1.776a1.674 1.674 0 01-1.482.914h-7.62c-.417 2.978-2.897 5.189-5.821 5.189s-5.404-2.21-5.822-5.19H1.68c-.62 0-1.189-.35-1.481-.913a1.773 1.773 0 01.084-1.776l3.078-4.753V13.84c0-5.576 3.662-10.274 8.646-11.678zm.74 27.244c.355 1.037 1.307 1.73 2.376 1.73 1.068 0 2.02-.693 2.376-1.73h-4.755.002zm2.375-24.214c-4.64 0-8.401 3.872-8.401 8.648v8.647c0 .342-.098.676-.282.96l-1.618 2.5h20.6l-1.618-2.5a1.766 1.766 0 01-.28-.96V13.84c0-4.776-3.761-8.648-8.401-8.648z"
          transform="translate(2.927 2.162)"
          fill={props.fill}
          fillRule="nonzero"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
