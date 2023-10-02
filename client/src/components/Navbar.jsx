import LoginButton from "./LoginButton"
import { useAuth0 } from "@auth0/auth0-react"
import LogoutButton from "./LogoutButton"

function Navbar() {
  const { isAuthenticated } = useAuth0()
  return (
    <>
      <nav className="w-full py-8 flex items-center justify-between px-10 bg-blue-100">
        <h1 className="text-4xl font-medium">EventsHub</h1>
        <div>
          <ul className="flex items-center justify-center gap-4 pr-20">
            <li className="px-3 py-2 hover:bg-blue-200 rounded-md cursor-pointer">
              Home
            </li>
            <li className="px-3 py-2 hover:bg-blue-200 rounded-md cursor-pointer">
              About
            </li>
            <li className="px-3 py-2 hover:bg-blue-200 rounded-md cursor-pointer">
              Events
            </li>
          </ul>
        </div>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </nav>
    </>
  )
}

export default Navbar
