import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Clipboard, Text, FlatList, Image } from 'react-native'
import styles from './styles'
import { Icon } from './Icon'
import * as Animatable from 'react-native-animatable'
import { width, Colors } from './globalStyles'
import { IconType } from './constants'
import Permissions from 'react-native-permissions'
import Exif from 'react-native-exif'
import ImagePicker from 'react-native-image-picker'
import CameraRoll from '@react-native-community/cameraroll'
import RNIM from 'react-native-image-metedata'
import ImageResizer from 'react-native-image-resizer'
import Geolocation from '@react-native-community/geolocation'

const TouchableOpacityAnim = Animatable.createAnimatableComponent(TouchableOpacity)
class PickerPhoto extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      arrPhoto: [],
      arrTakePhoto: [],
      arrSelectPhoto: [],
      numImage: 20,
      exifInfo: null
    }
  }

  async componentDidMount () {
    Geolocation.requestAuthorization()
    this.getImagePicker()
    Permissions.check('photo').then(async (response) => {
      if (response === 'authorized') {
        this.getImagePicker()
      } else {
        if (response !== 'undetermined') {
          this.openSetting()
        }
      }
    })
  }

  getImagePicker = async () => {
    const arrPhoto = await this.getImageFromCameraRoll(this.state.numImage)
    console.log(arrPhoto)
    this.setState({ arrPhoto })
  }

  getImageFromCameraRoll = (first) => {
    return new Promise((resolve, reject) => {
      let option = {
        first,
        assetType: 'Photos',
        groupTypes: 'All'
      }

      CameraRoll.getPhotos(option).then(r => {
        console.log(r)
        resolve(r.edges)
      }).catch(() => {
        resolve([])
      })
    })
  }

  getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => resolve(position),
        () => resolve(null),
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 10000 }
      )
    })
  }

  selectPhoto = (photo, isSelect) => async () => {
    try {
      const { arrSelectPhoto } = this.state
      let newArr = arrSelectPhoto.slice()
      if (isSelect) {
        newArr.splice(newArr.indexOf(photo), 1)
      } else {
        newArr = [photo]
      }

      let linkImage = photo
      if (!photo.includes('file://')) {
        var regex = /:\/\/(.{36})\//i
        var result = photo.match(regex)
        linkImage = 'assets-library://asset/asset.JPG?id=' + result[1] + '&ext=JPG'
      }
      const exifInfo = await Exif.getExif(linkImage)
      console.log(linkImage)

      this.setState({
        arrSelectPhoto: newArr,
        exifInfo: {
          uri: photo,
          info: exifInfo
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  onPressSendImage = () => {
    const { exifInfo } = this.state

    ImageResizer.createResizedImage(exifInfo.uri, 1024, 768, 'JPEG', 80).then(async (response) => {
      console.log(response)
      const currentLocation = await this.getCurrentPosition()
      const pathImage = response.uri.replace('file://', '')

      RNIM.readMeteData(pathImage).then((metedataInfo) => {
        console.log(metedataInfo)
        const newObject = Object.assign({}, metedataInfo)

        newObject['{Exif}'].ImageDescription = 'NguyenKhiem_TestFreelancer'
        if (currentLocation) {
          newObject['{Exif}']['GPSLongitude - GPSLatitude'] = currentLocation.coords.latitude + ' - ' + currentLocation.coords.longitude
        }
        RNIM.editMeteDataPhotoForiOS(pathImage, newObject).then(async (metedataInfo) => {
          console.log(metedataInfo)
          RNIM.readMeteData(pathImage).then((dataNew) => {
            console.log(dataNew)
          })

          const linkImage = await this.uploadImage(response.uri)
          const newObjectData = Object.assign({}, this.state.exifInfo)
          newObjectData.info.imageURL = linkImage
          newObjectData.info.exif.ImageDescription = 'NguyenKhiem_TestFreelancer'
          if (currentLocation) {
            newObjectData.info.exif['GPSLongitude - GPSLatitude'] = currentLocation.coords.latitude + ' - ' + currentLocation.coords.longitude
          }

          this.setState(newObjectData)
        }).catch(err => {
          console.log(err)
        })
      })
    }).catch((err) => {
      console.log(err)
      console.log('error')
    })
  }

  uploadImage = (uri) => {
    return new Promise((resolve, reject) => {
      var CryptoJS = require('crypto-js')
      let timestamp = (Date.now() / 1000 | 0).toString()
      let apiKey = '651256185413159'
      let Key = 'BJm6iiB7jlQsxQi5nYRSojyIOk4'
      let cloud = 'fourseason'
      let hashString = 'timestamp=' + timestamp + Key
      let signature = CryptoJS.SHA1(hashString).toString()
      let uploadURL = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'

      let xhr = new XMLHttpRequest()
      xhr.open('POST', uploadURL)
      xhr.onload = () => {
        const imageFile = JSON.parse(xhr.response)
        resolve(imageFile.url)
      }
      let formdata = new FormData()
      formdata.append('file', { uri: uri, type: 'image/png', name: 'upload.png' })
      formdata.append('timestamp', timestamp)
      formdata.append('api_key', apiKey)
      formdata.append('signature', signature)
      xhr.send(formdata)
    })
  }

  onEndReached = async () => {
    if (!this.onTriggerScroll) {
      const numCount = this.state.numImage + 20
      const arrPhoto = await this.getImageFromCameraRoll(numCount)
      this.setState({ arrPhoto, numImage: numCount })
      this.onTriggerScroll = true
    }
  }

  onSelectPhoto = async () => {
    const responseImage = await this.selectImagePicker(true)
    if (responseImage) {
      const arrNew = this.state.arrTakePhoto.slice()

      arrNew.push({ node: { image: { uri: responseImage.response.uri } } })
      this.setState({ arrTakePhoto: arrNew })
    }
  }

  selectImagePicker = (isOpenCamera) => {
    return new Promise((resolve, reject) => {
      const options = {
        title: 'Choose Image',
        cancelButtonTitle: 'Close',
        takePhotoButtonTitle: 'Take Photo',
        chooseFromLibraryButtonTitle: 'Choose library',
        noData: true,
        quality: 1.0,
        maxWidth: 1500,
        maxHeight: 1500,
        storageOptions: {
          cameraRoll: true,
          waitUntilSaved: true,
          skipBackup: true
        }
      }

      ImagePicker[isOpenCamera ? 'launchCamera' : 'showImagePicker'](options, (response) => {
        if (response.didCancel) {
          resolve()
        } else if (response.error) {
          if (response.error === 'Photo library permissions not granted') {
            Permissions.openSettings()
          }
          resolve()
        } else if (response.uri) {
          resolve({
            link: response.uri,
            response
          })
        }
      })
    })
  }

  renderPhoto = ({ item, index }) => {
    if (item.node.image.uri === 'camera') {
      return (
        <TouchableOpacity activeOpacity={1} onPress={this.onSelectPhoto} style={[styles.cameraCtn]}>
          <Icon name={'add-a-photo'} Type={IconType.MaterialIcons} color={Colors.TEXT} size={width(11)} />
        </TouchableOpacity>
      )
    } else {
      const imageLink = item.node.image.uri
      const indexImage = this.state.arrSelectPhoto.findIndex(itm => itm === imageLink)
      const isSelect = indexImage !== -1
      const numSelect = indexImage + 1
      return (
        <TouchableOpacity activeOpacity={1}
          onPress={this.selectPhoto(imageLink, isSelect)} style={styles.photoCtn}>
          <Image
            style={styles.imgCamera}
            source={{ uri: item.node.image.uri }}
          />
          <Animatable.View transition={'backgroundColor'}
            style={[styles.circleSelect, isSelect && styles.bgBlue]}>
            {
              isSelect && <Text style={styles.textSelect}>{numSelect}</Text>
            }
          </Animatable.View>
        </TouchableOpacity>
      )
    }
  }

  onCopyData=() => {
    Clipboard.setString(JSON.stringify(this.state.exifInfo.info))
    alert('Copy Data Done')
  }

  onMomentumScrollBegin = () => {
    this.onTriggerScroll = false
  }

  render () {
    const { arrPhoto, arrSelectPhoto, arrTakePhoto, exifInfo } = this.state

    console.log(exifInfo)
    return (
      <View style={styles.modalContainer}>
        <View style={[styles.container, styles.coreStyle]}>
          <View style={styles.txtTitleContainer}>
            <Text numberOfLines={1} style={styles.txtTitle}>{'Gallery Image'}</Text>
          </View>
        </View>
        {
          exifInfo
            ? <View style={styles.rowImage}>
              <Image
                style={styles.imgFullPic}
                source={{ uri: exifInfo.uri }}
              />
              <TouchableOpacity onPress={this.onCopyData} style={styles.rightView}>
                {
                  exifInfo.info.imageURL
                    ? <Text>{'Image URL Cloudinary: ' + exifInfo.info.imageURL}</Text>
                    : null
                }

                {
                  exifInfo.info.exif.ImageDescription
                    ? <Text>{'ImageDescription: ' + exifInfo.info.exif.ImageDescription}</Text>
                    : null
                }
                {
                  exifInfo.info.exif['GPSLongitude - GPSLatitude']
                    ? <Text>{'GPSLongitude - GPSLatitude: ' + exifInfo.info.exif['GPSLongitude - GPSLatitude']}</Text>
                    : null
                }
                <Text>{'Image Height: ' + exifInfo.info.ImageHeight}</Text>
                <Text>{'Image Width: ' + exifInfo.info.ImageWidth}</Text>
                <Text>{'Color Model: ' + exifInfo.info.exif.ColorModel}</Text>
                <Text>{'Profile Name: ' + exifInfo.info.exif.originalUri}</Text>
                <Text>{'Image DPI: ' + exifInfo.info.exif.DPIHeight + 'H - ' + exifInfo.info.exif.DPIWidth + 'W'}</Text>
              </TouchableOpacity>
            </View>

            : null
        }

        <View style={styles.containerList}>
          <View style={styles.grayLine} />
          <FlatList
            data={[{ node: { image: { uri: 'camera' } } }, ...arrTakePhoto, ...arrPhoto]}
            renderItem={this.renderPhoto}
            numColumns={3}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={this.onMomentumScrollBegin}
            bounces={false}
            extraData={arrSelectPhoto.length}
            contentContainerStyle={styles.contentStyle}
            columnWrapperStyle={styles.columnStyle}
            keyExtractor={item => item.node.image.uri} />
        </View>

        {
          exifInfo && arrSelectPhoto.length > 0
            ? <TouchableOpacityAnim onPress={this.onPressSendImage} animation={'fadeInUp'} style={styles.btnCtn}>
              <Text style={styles.textBtn}>{'Upload'}</Text>
              <View style={styles.circleBtn}>
                <Text style={styles.textSelect}>{arrSelectPhoto.length}</Text>
              </View>
            </TouchableOpacityAnim>
            : null
        }
      </View>
    )
  }
}

export default PickerPhoto
