export interface user{
    id: number,
    name: string,
    surname: string,
    cf: string,
    email: string,
    password: string,
    birthdate: Date,
    role: Role
    disabledAt: Date
    passReset: boolean
}

export interface Role{
    id: number,
    role?: string
}

export interface loginUser{
    email: string,
    password: string
}