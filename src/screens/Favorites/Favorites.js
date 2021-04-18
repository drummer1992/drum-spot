import React from "react"
import { useSelector } from "react-redux"
import { Advertisements } from "../Advertisement/Advertisements"
import { selectUser } from "../../redux/reducers/user"

export const Favorites = () => {
  const { _id, favorites } = useSelector(selectUser)

  return <Advertisements
    predicate={advertisement => (
      advertisement.ownerId === _id && favorites.includes(advertisement._id)
    )}
  />
}