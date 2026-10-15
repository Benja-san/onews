import { Category } from "../../@types"
import "./Header.css"

interface HeaderProps {
  categories: Category[]
  isZenModeEnabled: boolean
  searchText: string
  onToggleZenMode: () => void
}

function Header({
  categories,
  isZenModeEnabled,
  searchText,
  onToggleZenMode,
}: HeaderProps) {
  const normalizedSearch = searchText.trim().toLocaleLowerCase("fr")

  return (
    <header className="site-header">
      <nav className="menu" aria-label="Navigation principale">
        <a className="menu-brand" href="/" aria-label="Dev Of Thrones, accueil">
          <span aria-hidden="true">&lt;/&gt;</span>
          Dev Of Thrones
        </a>

        <ul className="menu-categories">
          {categories.map((category) => {
            const isMatchingSearch =
              normalizedSearch !== "" &&
              category.label.toLocaleLowerCase("fr") === normalizedSearch

            return (
              <li key={category.route}>
                <a
                  className={
                    isMatchingSearch
                      ? "menu-link menu-link--match"
                      : "menu-link"
                  }
                  href={category.route}
                  aria-label={
                    isMatchingSearch
                      ? `${category.label}, correspond à la recherche`
                      : undefined
                  }
                >
                  {category.label}
                  {isMatchingSearch && (
                    <span className="menu-link-marker" aria-hidden="true">
                      ★
                    </span>
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <button
          className="menu-btn"
          type="button"
          onClick={onToggleZenMode}
          aria-pressed={isZenModeEnabled}
        >
          {isZenModeEnabled ? "Désactiver" : "Activer"} le mode zen
        </button>
      </nav>
    </header>
  )
}

export default Header
