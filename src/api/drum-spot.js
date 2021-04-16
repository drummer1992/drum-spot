import { uuidV4 } from "../utils/random"

const token = 'secret'

class RequestError extends Error {
  constructor(error) {
    super()

    this.message = error.message
    this.code = error.code
    this.status = error.status
  }
}

export class DrumSpotAPI {
  static async getProfile(userToken) {
    if (userToken === token) {
      return {
        id      : Date.now(),
        name    : 'Andrii Varlamov',
        imageURL: require('../../assets/ava.jpeg'),
      }
    }

    throw new RequestError({
      message: 'Unauthorized',
      code   : 401,
      status : 401,
    })
  }

  static async signInByFb() {
    return { token }
  }

  static async createAdvertisement(data) {
    return {
      id     : uuidV4(),
      ...data,
      created: Date.now(),
    }
  }

  static async getAdvertisements() {
    return [
      {
        id              : 1,
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
      },
      {
        id              : 2,
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
      },
      {
        id              : 3,
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
      },

      {
        id              : 4,
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
      },
      {
        id              : 5,
        images          : ['https://media.sweetwater.com/api/i/q-82__ha-a7bbefd95305e210__hmac-2d900d3520060a611231b3120b0aaf7b52ed8de3/images/items/750/AC14HPR-large.jpg'],
        title           : 'Zildjian A Custom Hi-Hat 14',
        price           : 12000,
        created         : Date.now(),
        isRent          : true,
        isNew           : false,
        priceNegotiating: true,
        city            : 'Київ',
        details         : 'Крутий інструмент, підходить під любий музон!',
      },
    ].sort((a, b) => a > b ? 1 : -1)
  }
}