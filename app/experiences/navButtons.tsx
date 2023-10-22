'use client'

import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons"
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse"

export default function NavButtons() {
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    return (
        <div className="absolute left-0 top-0 m-4 flex flex-col gap-2">
            <Button
                isIconOnly
                startContent={<FontAwesomeIcon icon={faHouse} />}
                onClick={() => {
                    router.push('/')
                }}
            />
            <Button
                isIconOnly
                onClick={() => {
                    setTheme(theme === 'dark' ? 'light' : 'dark')
                }}
                startContent={<FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />}
            />
        </div>
    )
}