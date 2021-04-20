class DrumSpotAPI {
  constructor(request) {
    this.request = request
  }

  async getProfile() {
    return this.request.get('/user')
  }

  async signInByFb(accessToken) {
    return this.request.post('/user/signIn').send({ accessToken })
  }

  async createAdvertisement({ images, ...data }) {
    const formData = new FormData()

    formData.append('body', JSON.stringify(data))

    images.forEach(image => {
      const body = {
        uri : image.path,
        type: image.mime,
        name: image.filename,
      }


      formData.append(body.name, body)
    })

    return this.request.post('/user/advertisement')
      .form(formData)
  }

  async updateAdvertisement() {
    return null
  }


  async deleteAdvertisement() {
    return null
  }

  async getAdvertisements() {
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