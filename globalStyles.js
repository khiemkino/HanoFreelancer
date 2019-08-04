import { Dimensions, Text, Platform, PixelRatio } from 'react-native'
const CORE_RATIO = 667 / 375
const MYWIDTH = Dimensions.get('window').width
const MYHEIGHT = Dimensions.get('window').height
const MYSCALE = CORE_RATIO / (MYHEIGHT / MYWIDTH)
const guidelineBaseWidth = 375
const guidelineBaseHeight = 667

export const width = num => PixelRatio.roundToNearestPixel(MYWIDTH * (num / 100))
export const height = num => PixelRatio.roundToNearestPixel(MYHEIGHT * (num / 100))
export const scale = (size) => PixelRatio.roundToNearestPixel(MYWIDTH / guidelineBaseWidth * size)
export const verticalScale = (size) => PixelRatio.roundToNearestPixel(MYHEIGHT / guidelineBaseHeight * size)
export const heightScale = num => PixelRatio.roundToNearestPixel(MYHEIGHT * (num * MYSCALE / 100))
export const isIphoneX = Platform.OS === 'ios' && (MYHEIGHT >= 812)
export const heightNavBar = heightScale(11.5)
export const topNavBarIOS = heightScale(3)
export const navBarFit = heightScale(5)

export const setDefaultText = (customProps) => {
  const TextRender = Text.render
  const initialDefaultProps = Text.defaultProps
  Text.defaultProps = {
    ...initialDefaultProps,
    ...customProps
  }
  Text.render = function render (props) {
    let oldProps = props
    props = { ...props, style: [customProps.style, props.style] }
    try {
      return TextRender.apply(this, arguments)
    } finally {
      props = oldProps
    }
  }
}

export const Colors = {
  LINK_SUB: '#B5D9FF',
  ORGRANGE: '#FF9156',
  ORGRANGE_CANDY: '#FFD1B5',
  GRAY: '#8A898A',
  RED: '#DD3036',
  RED_CANDY: '#ED4947',
  PINK: '#FFCDD3',
  PINK_CANDY: '#EE7376',
  LINK: '#157AD2',
  TEXT: '#2A2A2A',
  GREEN: '#2CA04E',
  GREEN_CANDY: '#B7FFB5'
}

export const txtDefault = {
  color: Colors.TEXT,
  fontSize: width(4),
  backgroundColor: 'transparent'
}
