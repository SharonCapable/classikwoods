import { redirect } from 'next/navigation'

// Redirect from /booking to /about since the booking form is now integrated there
export async function GET() {
  redirect('/about')
}
