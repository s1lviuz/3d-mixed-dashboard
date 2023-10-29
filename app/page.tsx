'use client'

import { Button, Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"

interface Experience {
  id: number
  title: string
}

export default function Home() {
  const router = useRouter()

  const newEperience = useCallback((id: number, title: string): Experience => ({
    id,
    title
  }), [])

  const experiencesList = useMemo(() => [
    newEperience(1, 'Basics'),
    newEperience(2, 'Drei Helpers'),
    newEperience(3, 'Debugging'),
    newEperience(4, 'Environment'),
    newEperience(5, 'Load models'),
    newEperience(6, '3D Text'),
    newEperience(7, 'Portal'),
    newEperience(8, 'Events'),
    newEperience(9, 'Post-processing'),
    newEperience(10, 'Portifolio'),
    newEperience(11, 'Physics'),
  ], [])

  const [loading, setLoading] = useState(false)

  if (loading) return <main className="h-[100vh] flex items-center justify-center">
    <Spinner size="lg" />
  </main>

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
                    setLoading(true)
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
