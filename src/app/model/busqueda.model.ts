export interface Busqueda {
  id: {
    equals: number | null,
    in: string[]
  },
  nombre:{
    equals: string
  }
}
