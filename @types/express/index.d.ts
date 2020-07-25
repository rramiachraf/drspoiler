declare module Express {
  export interface Request {
    userId: number
    artworkKey: string
    params: {
      community: string
    }
  }
}
