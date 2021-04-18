import { Type as t } from "../types"

export const fetchAdvertisements = () => ({
  type   : t.FETCH_ADVERTISEMENTS,
  apiCall: api => api.getAdvertisements()
})

export const createAdvertisement = advertisement => ({
  type   : t.CREATE_ADVERTISEMENT,
  apiCall: api => api.createAdvertisement(advertisement)
})

export const updateAdvertisement = (_id, data) => ({
  _id,
  data,
  type   : t.UPDATE_ADVERTISEMENT,
  apiCall: api => api.updateAdvertisement(_id, data)
})

export const deleteAdvertisement = _id => ({
  predicate: _id,
  type     : t.DELETE_ADVERTISEMENT,
  apiCall  : api => api.deleteAdvertisement(_id),
})