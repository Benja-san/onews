export interface Category {
  id: number
  route: string
  label: string
}

export interface Post {
  id: number
  category: string
  slug: string
  title: string
  excerpt: string
}
