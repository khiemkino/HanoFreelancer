import React from 'react'
import { width } from './globalStyles'
export const Icon = ({ name, Type = require(`react-native-vector-icons/Ionicons`).default, size = width(8), color = 'white', style }) => (
  <Type name={name} size={size} color={color} style={style} />
)
