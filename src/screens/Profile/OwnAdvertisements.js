import React from "react"
import { useSelector } from "react-redux"
import { Advertisements } from "../Advertisement/Advertisements"
import { selectUser } from "../../redux/reducers/user"

export const OwnAdvertisements = () => {
  const { id } = useSelector(selectUser)

  return <Advertisements
    predicate={advertisement => advertisement.userId === id}
  />
}