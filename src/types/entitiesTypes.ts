export type patientType = {
    id: string | null,
    firstName: string,
    lastName: string,
    securitySocialNumber: number,
    User: string
}

export type practitionerType = {
    id: string,
    firstName: string,
    lastName: string,
    cps: number,
    User: string
}

export type userType = {
    id: string,
    email: string,
    password: string,
    access_token: string | null,
    refresh_token: string | null
}