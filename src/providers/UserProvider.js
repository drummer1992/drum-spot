import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAuth, selectUser } from "../redux/reducers/user"
import { fetchProfile, signIn } from "../redux/actions/user"
import { Loader } from "../components/Loader"

const AuthProvider = ({ children }) => {
  const { loading, loaded, error } = useSelector(selectAuth)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading && !loaded) {
      dispatch(signIn)
    }
  }, [loading, loaded, error])

  return (
    <Loader loading={loading} loaded={loaded} error={error}>
      {children}
    </Loader>
  )
}

export const UserProvider = ({ children }) => {
  const { loading, loaded, error } = useSelector(selectUser)
  const { token } = useSelector(selectAuth)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading && !loaded && token) {
      dispatch(fetchProfile({ token }))
    }
  }, [loading, loaded, token])

  return (
    <Loader error={error} loaded={loaded} loading={loading}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Loader>
  )
}