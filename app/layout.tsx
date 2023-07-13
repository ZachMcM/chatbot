import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NextJS Open AI Chatbot',
  description: `A chatbot built with NextJS, OpenAIApi and Vercel's AI SDK`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='scroll-smooth' lang="en">
      <body>{children}</body>
    </html>
  )
}
