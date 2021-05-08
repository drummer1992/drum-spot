import last from 'lodash/last'

class DrumSpotAPI {
  constructor(request) {
    this.request = request
  }

  getProfile() {
    return this.request.get('/user')
  }

  signInByFb(accessToken) {
    return this.request.post('/user/signIn').send({ accessToken })
  }

  createAdvertisement({ images, ...data }) {
    const formData = new FormData()

    formData.append('body', JSON.stringify(data))

    images.forEach(image => {
      const body = {
        uri : image.path,
        type: image.mime,
        name: image.filename || last(image.path.split('/')),
      }


      formData.append(body.name, body)
    })

    return this.request.post('/user/advertisements')
      .form(formData)
  }

  updateAdvertisement(addId, data) {
    if (data.price) {
      data.price = Number(data.price)
    }

    return this.request.patch(`/user/advertisements/${addId}`)
      .send(data)
  }

  addAdvertisementImage(adId, image) {
    const formData = new FormData()

    const body = {
      uri : image.path,
      type: image.mime,
      name: image.filename || last(image.path.split('/')),
    }

    formData.append(body.name, body)

    return this.request.patch(`/user/advertisements/${adId}/images`)
      .form(formData)
  }

  addToFavorites(id) {
    return this.request.post(`/user/favorites/${id}`)
  }

  getFavorites() {
    return this.request.get('/user/favorites')
  }

  deleteFromFavorites(id) {
    return this.request.delete(`/user/favorites/${id}`)
  }

  deleteAdvertisement(id) {
    return this.request.delete(`/user/advertisements/${id}`)
  }


  deleteAdvertisementImage(id, imagePath) {
    return this.request.delete(`/user/advertisements/${id}/images`)
      .send({ path: imagePath })
  }

  getAdvertisements() {
    return this.request.get('/user/advertisements')
  }
}

let instance

export default req => {
  if (!instance) {
    instance = new DrumSpotAPI(req)
  }

  return instance
}