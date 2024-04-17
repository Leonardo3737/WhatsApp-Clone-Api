export interface IChats {
  id: string,
  name: string,
  isGroup: boolean,
  lastMessage: {
    body: string,
    type: string,
    author: string | undefined,
  } | null,
  timestamp: number,
}

export interface IMessages {
  timestamp: number,
  ack: number,
  author?: string,
  body: string,
  fromMe: boolean
}