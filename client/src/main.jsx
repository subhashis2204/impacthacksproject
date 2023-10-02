import { createRoot } from "react-dom/client"
import { Auth0Provider } from "@auth0/auth0-react"
import App from "./App"

const root = createRoot(document.getElementById("root"))

root.render(
  <Auth0Provider
    domain="dev-1zkimo336xf4o25l.us.auth0.com"
    clientId="ci05yAqxNWmmmRfJvqLQmFoRnNxG5O6T"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
)
