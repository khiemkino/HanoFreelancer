import { Platform, StyleSheet } from 'react-native'
import { width, heightScale, height, scale, topNavBarIOS, Colors, heightNavBar, isIphoneX } from './globalStyles'

const ISIOS = Platform.OS === 'ios'

const styles = StyleSheet.create({
  container: {
    height: heightNavBar + heightScale(1),
    width: width(100),
    justifyContent: 'center'
  },
  grayLine: {
    alignSelf: 'center',
    marginBottom: height(2),
    width: width(94),
    backgroundColor: Colors.GRAY,
    height: scale(1)
  },
  rightView: {
    maxHeight: height(40),
    width: width(60),
    borderWidth: scale(1),
    borderColor: 'white',
    padding: width(2)
  },
  rowImage: {
    marginTop: height(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  imgFullPic: {
    height: width(40),
    width: width(40),
    resizeMode: 'contain'
  },
  coreStyle: {
    height: heightNavBar,
    width: width(94),
    flexDirection: 'row',
    marginHorizontal: width(5),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  containerList: {
    position: 'absolute',
    bottom: height(isIphoneX ? 5 : 3),
    height: height(50)
  },
  iconHeaderLeft: {
    position: 'absolute',
    left: 0
  },
  txtTitleContainer: {
    flexDirection: 'row',
    width: width(94),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0
  },
  txtTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: width(5),
    fontWeight: 'bold'
  },
  photoCtn: {
    marginBottom: width(2),
    marginHorizontal: width(1)
  },
  cameraCtn: {
    backgroundColor: '#EAEAEA',
    marginBottom: width(2),
    marginHorizontal: width(1),
    height: heightScale(19),
    width: width(30),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  imgCamera: {
    height: heightScale(19),
    width: width(30)
  },
  contentStyle: {
    marginHorizontal: width(1)
  },
  columnStyle: {
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingBottom: width(4)
  },
  circleSelect: {
    height: height(3.3),
    width: height(3.3),
    borderRadius: height(2),
    position: 'absolute',
    bottom: width(1.7),
    right: width(1.7),
    borderColor: 'white',
    borderWidth: scale(1),
    shadowColor: 'black',
    shadowOffset: {
      width: 0.8,
      height: 1.4
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  bgBlue: {
    backgroundColor: Colors.RED,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },
  textSelect: {
    color: 'white'
  },
  textBtn: {
    fontWeight: 'bold',
    color: Colors.RED,
    fontSize: width(4.1)
  },

  btnCameraCtn: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    bottom: height(1),
    right: width(5),
    width: height(9),
    height: height(9),
    borderRadius: height(4.5),
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },

  btnCtn: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 5,
    bottom: height(ISIOS ? 3 : 3),
    width: width(90),
    height: height(8),
    borderRadius: width(2),
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },
  circleBtn: {
    marginLeft: width(2),
    backgroundColor: Colors.RED,
    height: height(4),
    width: height(4),
    borderRadius: height(2),
    alignItems: 'center',
    justifyContent: 'center'
  }

})
export default styles
