import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function PingPong(props) {
  return (
    <Svg {...props} width="25px" height="25px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <G transform="translate(-32 -797) translate(32 797)" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd" >
        <Path d="M0 0H40V40H0z" />
        <Path d="M15.833 0c8.745 0 15.834 7.089 15.834 15.833a15.767 15.767 0 01-1.672 7.09L34.1 27.03c.65.65.65 1.706 0 2.357L29.387 34.1c-.651.65-1.706.65-2.357 0l-4.107-4.105a15.767 15.767 0 01-7.09 1.672C7.09 31.667 0 24.577 0 15.833S7.089 0 15.833 0zm8.839 22.313l-2.357 2.357 5.893 5.892 2.357-2.357-5.893-5.892zm3.106-10.175l-15.64 15.64c1.197.37 2.443.556 3.695.555 1.563.002 3.112-.29 4.567-.86l-1.62-1.623a1.667 1.667 0 010-2.357l4.713-4.713c.651-.65 1.706-.65 2.357 0l1.623 1.62c.57-1.455.862-3.004.86-4.567 0-1.286-.195-2.526-.555-3.695zM15.833 3.333A12.5 12.5 0 008.94 26.262L26.262 8.94a12.488 12.488 0 00-10.429-5.607z" transform="matrix(-1 0 0 1 36.667 3.333)" fill={props.fill} fillRule="nonzero" />
      </G>
    </Svg>
  )
}

export default PingPong
