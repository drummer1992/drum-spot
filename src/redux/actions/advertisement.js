import { Type as t } from "../types"

export const fetchAdvertisements = () => ({
  type   : t.FETCH_ADVERTISEMENTS,
  apiCall: api => api.getAdvertisements()
})

export const createAdvertisement = advertisement => ({
  type   : t.CREATE_ADVERTISEMENT,
  apiCall: api => api.createAdvertisement(advertisement)
})

export const updateAdvertisement = (id, data) => ({
  id,
  data,
  type   : t.UPDATE_ADVERTISEMENT,
  apiCall: api => api.updateAdvertisement(id, data)
})

export const deleteAdvertisement = id => ({
  predicate: id,
  type     : t.DELETE_ADVERTISEMENT,
  apiCall  : api => api.deleteAdvertisement(id),
})