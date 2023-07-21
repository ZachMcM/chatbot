'use client'

import { useChat } from "ai/react"
import { Message } from 'ai'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Bot, Github, MoonIcon, Sun, SunIcon, User, User2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const lastMessage = useRef<null | HTMLDivElement>(null)

  const [darkMode, setDarkMode] = useState<boolean>(false)

  function handleThemeChange() {
    if (darkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.theme = "light"
      setDarkMode(false)
    } else {
      document.documentElement.classList.add("dark")
      localStorage.theme = "dark"
      setDarkMode(true)
    }
  }

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setDarkMode(false)
    }
  }, [])

  useEffect(() => {
    if (messages.length) {
      lastMessage.current?.scrollIntoView({
        behavior: "smooth",
        block: "end"
      })
    }
  }, [messages.length, messages[messages.length - 1]?.content.length]) 
  
  return (
    <main className="flex min-h-screen flex-col space-y-24 items-center p-2 md:py-24 lg:px-64 xl:px-96 2xl:mx-96">
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute top-0 right-0 m-6"
        onClick={handleThemeChange}
      >
        {darkMode ? <SunIcon/> : <MoonIcon/>}
      </Button>
      <div className='flex flex-col space-y-2 text-center'>
        <h3 className='text-3xl text-primary font-bold'>NextJS Open AI Chatbot</h3>
        <p className='text-muted-foreground text-lg font-medium'>A chatbot built with NextJS, OpenAIApi and Vercel's AI SDK</p>
        <a href="https://github.com/ZachMcM/chatbot"><Button variant='ghost' className='w-fit self-center'><Github className='mr-2 h-4 w-4'/>GitHub</Button></a>
      </div>
      <div className='p-2 overflow-y-auto max-h-72 md:max-h-[36rem] w-full'>
        <div className='flex flex-col space-y-4 w-full'>
            {
              messages.map((m: Message, i: number) => {
                return (
                  <Card key={m.id}>
                    <CardContent>
                      <div className='flex space-x-4 items-center mt-4'>
                        <div className="shrink-0">{ m.role == "user" ? <User/> : <Bot/>}</div>
                        <div className="flex flex-col">
                          <p className='text-sm text-muted-foreground capitalize'>{m.role}</p>
                          <p className='text-primary'>{m.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card> 
                )
              })
            }
        </div>
        <div ref={lastMessage}></div>
      </div>
      <div className='absolute bottom-0 w-full p-2 md:py-24 lg:px-64 xl:px-96'>
        <form 
          onSubmit={(e) => {
            handleSubmit(e)
            lastMessage.current?.scrollIntoView
          }} 
          className='grid gap-2 px-2 2xl:mx-96'
        >
          <Textarea 
            placeholder="Type your message here." 
            value={input}
            onChange={handleInputChange}
          />
          <Button type='submit'>Send message</Button>
        </form>
      </div>
    </main>
  )
}
