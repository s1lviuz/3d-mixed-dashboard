'use client'

import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"

interface Experience {
  id: number
  title: string
}

export default function Home() {
  const router = useRouter()

  const newEperience = useCallback((id: number, title: string): Experience => {
    return {
      id,
      title
    }
  }, [])

  const experiencesList = useMemo(() => [
    newEperience(1, 'Basics'),
    newEperience(2, 'Drei Helpers'),
    newEperience(3, 'Debugging'),
    newEperience(4, 'Environment'),
  ], [])

  return (
    <main className="h-[100vh] flex items-center justify-center">
      <div className="border-1 rounded p-5">
        <div>
          <h1 className="text-4xl font-bold text-center">Experiences</h1>
        </div>
        <div className="min-h-[200px] py-4">
          <ul>
            {experiencesList.map((experience) => (
              <li key={experience.id} className="mt-1">
                <Button fullWidth
                  onClick={() => {
                    router.push(`/experiences/${experience.id}`)
                  }}
                >
                  {experience.id} - {experience.title}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
