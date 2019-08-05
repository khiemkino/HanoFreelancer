import { Platform } from 'react-native'

navigator.geolocation = require('@react-native-community/geolocation')
global.ISIOS = Platform.OS === 'ios'
global.space = ' '
