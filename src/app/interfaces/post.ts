export interface Post{
    id: string
    content: string
    createdAt: Date
    updatedAt: Date | null
    userWhoCreatedId: string
}