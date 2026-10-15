import { ReactNode, useEffect, useState } from "react"

import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Posts from "../Posts/Posts"

import "./App.css"
import { Category, Post } from "../../@types"

const URL = "https://oclock-api.vercel.app/api/blog"
type RequestStatus = "loading" | "success" | "error" | "empty"

function App() {
  const [isZenModeEnabled, setIsZenModeEnabled] = useState(false)
  const [searchText, setSearchText] = useState("")

  //Je prépare un state pour hydrater mes posts et mes categories
  //const [data, setData] = useState<Typage data>(Donnée initiale)
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  //Je prépare un requestStatus initial
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("loading")

  //Je prépare un message en cas d'erreur
  const [errorMessage, setErrorMessage] = useState<string>("")

  function handleToggleZenMode() {
    setIsZenModeEnabled((previousValue) => !previousValue)
  }

  function handleSearchTextChange(nextSearchText: string) {
    setSearchText(nextSearchText)
  }

  useEffect(() => {
    //Je crée mon abortcontroller pour "tuer" les requêtes qui n'ont aps besoin d'aboutir
    const controller = new AbortController()

    async function fetchData() {
      setRequestStatus("loading")
      setErrorMessage("")

      try {
        const [postsResponse, categoriesResponse] = await Promise.all([
          fetch(`${URL}/posts`, { signal: controller.signal }),
          fetch(`${URL}/categories`, { signal: controller.signal }),
        ])

        //Si je n'ai pas de status 'ok'
        if (!postsResponse.ok || !categoriesResponse.ok) {
          throw new Error("Une des ressources API n'est pas disponible")
        }
        const [postsJson, categoriesJson] = await Promise.all([
          postsResponse.json(),
          categoriesResponse.json(),
        ])
        //Test tableaux vides
        //const [postsJson, categoriesJson] = [[], []]
        setPosts(postsJson)
        setCategories(categoriesJson)
        if (postsJson.length === 0 || categoriesJson.length === 0) {
          setRequestStatus("empty")
        } else {
          setRequestStatus("success")
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return
        }

        setErrorMessage(
          "Une erreur est survenue, veuillez réessayer ulterieurement",
        )
        setRequestStatus("error")
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [])

  let mainContent: ReactNode

  switch (requestStatus) {
    case "loading":
      mainContent = <p>Loading...</p>
      //Je break pour quitter le switch
      break
    case "empty":
      mainContent = (
        <p>Aucun article disponible pour le moment, demande à Claude !</p>
      )
      break
    case "success":
      mainContent = (
        <Posts
          posts={posts}
          isZenModeEnabled={isZenModeEnabled}
          searchText={searchText}
          onSearchTextChange={handleSearchTextChange}
        />
      )
      break
    case "error":
      mainContent = <p>{errorMessage}</p>
      break
    default:
      mainContent = <p>Loading...</p>
  }

  return (
    <div className="app">
      <Header
        categories={categories}
        isZenModeEnabled={isZenModeEnabled}
        searchText={searchText}
        onToggleZenMode={handleToggleZenMode}
      />
      {mainContent}
      <Footer />
    </div>
  )
}

export default App
