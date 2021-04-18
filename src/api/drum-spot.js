import { uuidV4 } from "../utils/random"

const userId = 'id-1'

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

  async createAdvertisement(data) {
    return {
      _id     : uuidV4(),
      ...data,
      created: Date.now(),
    }
  }

  async updateAdvertisement() {
    return null
  }


  async deleteAdvertisement() {
    return null
  }

  async getAdvertisements() {
    return [
      {
        _id              : 1,
        images          : ['https://static.gibson.com/product-images/USA/USAI9Q269/Ebony/front-banner-1600_900.png'],
        title           : 'Gibson Les Paul',
        price           : 34000,
        created         : Date.now(),
        isRent          : false,
        isNew           : true,
        rating          : 5,
        priceNegotiating: true,
        city            : 'Київ',
        details         : 'Крутий інструмент, підходить під любий музон!',
        ownerId         : uuidV4(),
      },
      {
        _id              : 2,
        images          : ['https://media.sweetwater.com/api/i/q-82__ha-a7bbefd95305e210__hmac-2d900d3520060a611231b3120b0aaf7b52ed8de3/images/items/750/AC14HPR-large.jpg'],
        title           : 'Zildjian A Custom Hi-Hat 14',
        price           : 12000,
        created         : Date.now(),
        isRent          : true,
        isNew           : false,
        rating          : 4,
        priceNegotiating: true,
        city            : 'Київ',
        details         : 'Крутий інструмент, підходить під любий музон!',
        ownerId         : uuidV4(),
      },
      {
        _id              : 3,
        images          : ['https://i.ytimg.com/vi/EEb0gE47fys/maxresdefault.jpg'],
        title           : 'Shure SM 58',
        price           : 6000,
        created         : Date.now(),
        isRent          : true,
        isNew           : false,
        rating          : 4,
        priceNegotiating: true,
        city            : 'Київ',
        details         : 'Крутий інструмент, підходить під любий музон!',
        ownerId         : uuidV4(),
      },

      {
        _id              : 4,
        images          : ['https://static.gibson.com/product-images/USA/USAI9Q269/Ebony/front-banner-1600_900.png'],
        title           : 'Gibson Les Paul',
        price           : 34000,
        created         : Date.now(),
        isRent          : true,
        isNew           : false,
        rating          : 3,
        priceNegotiating: true,
        city            : 'Київ',
        details         : 'Крутий інструмент, підходить під любий музон!',
        ownerId         : uuidV4(),
      },
      {
        _id              : 5,
        rating          : 4,
        images          : ['https://media.sweetwater.com/api/i/q-82__ha-a7bbefd95305e210__hmac-2d900d3520060a611231b3120b0aaf7b52ed8de3/images/items/750/AC14HPR-large.jpg'],
        title           : 'Zildjian A Custom Hi-Hat 14',
        price           : 12000,
        created         : Date.now(),
        isRent          : true,
        isNew           : false,
        priceNegotiating: true,
        city            : 'Київ',
        details         : 'Крутий інструмент, підходить під любий музон!',
        ownerId         : userId,
      },
    ].sort((a, b) => a > b ? 1 : -1)
  }
}

let instance

export default req => {
  if (!instance) {
    instance = new DrumSpotAPI(req)
  }

  return instance
}