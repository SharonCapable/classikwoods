import { redirect } from 'next/navigation'

// Redirect from /contact to /about since the contact form is now integrated there
export default function ContactRoute() {
  redirect('/about')
}
