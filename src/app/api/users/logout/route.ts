import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' })

  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0), // Set expiration in the past
    path: '/',
  })

  return response
}
