import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAuth, selectFavoritesState, selectUser } from "../redux/reducers/user"
import { fetchFavorites, fetchProfile } from "../redux/actions/user"
import { Loader } from "../components/Loader"
import { getToken } from "../storage"
import { Type as t } from "../redux/types"

const TokenProvider = ({ children }) => {
  const [ready, setReady] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(async () => {
      const token = await getToken()

      if (token) {
        dispatch({ type: t.COLLECT_TOKEN, token })
      }

      setReady(true)
    })
  }, [])

  return (
    <Loader loading={!ready}>
      {children}
    </Loader>
  )
}

const ProfileProvider = ({ children }) => {
  const { loading, loaded, error } = useSelector(selectUser)
  const { token } = useSelector(selectAuth)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading && !loaded && !error && token) {
      dispatch(fetchProfile())
    }
  }, [loading, loaded, token, error])

  return (
    <Loader
      error={error}
      loaded={loaded}
      loading={loading}
    >
      {children}
    </Loader>
  )
}

const FavoritesProvider = ({ children }) => {
  const { loading, loaded, error } = useSelector(selectFavoritesState)
  const { token } = useSelector(selectAuth)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading && !loaded && !error && token) {
      dispatch(fetchFavorites())
    }
  }, [loading, loaded, token, error])

  return (
    <Loader
      error={error}
      loaded={loaded}
      loading={loading}
    >
      {children}
    </Loader>
  )
}

export const UserProvider = ({ children }) => {
  return (
    <TokenProvider>
      <ProfileProvider>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </ProfileProvider>
    </TokenProvider>
  )
}