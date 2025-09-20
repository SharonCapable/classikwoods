import { redirect } from 'next/navigation'

// Redirect from /booking to /about since the booking form is now integrated there
export default function BookingRoute() {
  redirect('/about')
}
