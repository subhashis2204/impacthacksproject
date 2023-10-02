import { useAuth0 } from "@auth0/auth0-react"

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="text-lg bg-blue-500 px-4 py-2 rounded-md font-medium text-white"
    >
      Log In
    </button>
  )
}

export default LoginButton
