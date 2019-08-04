/**
 * @format
 */

import './globals.js'
import { AppRegistry, Text, TextInput } from 'react-native'
import App from './App'
import { setDefaultText, txtDefault } from './globalStyles'
import { name as appName } from './app.json'

if (Text.defaultProps === null || Text.defaultProps === undefined) Text.defaultProps = {}
Text.defaultProps.allowFontScaling = false
TextInput.defaultProps.allowFontScaling = false
setDefaultText({ style: txtDefault })

AppRegistry.registerComponent(appName, () => App)
