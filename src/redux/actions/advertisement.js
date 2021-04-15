import { Type as t } from "../types"

export const fetchAdvertisements = () => ({
  type: t.FETCH_ADVERTISEMENTS,
  apiCall: api => api.getAdvertisements()
})

export const createAdvertisement = advertisement => ({
  type: t.CREATE_ADVERTISEMENT,
  apiCall: api => api.createAdvertisement(advertisement)
})