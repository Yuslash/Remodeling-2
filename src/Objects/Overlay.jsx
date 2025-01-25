import { useState, useEffect } from "react"

export default function Overlay() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 4000) // 2 seconds delay

        return () => clearTimeout(timer)
    }, [])

    return (
        <div
            className={`w-1/2 h-full flex flex-col justify-center pl-[75px] transition-opacity duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
            <div className="ayr-text">Are You Ready!</div>
            <div className="ayr-desc max-w-[600px]">
                Boost your open-source project visibility and growth on GitHub
                Leverage influencers, write compelling marketing materials,
                master communication, find writers, and use badges
            </div>
            <div className="flex gap-[22px] mt-[20px]">
                <div className="ayr-button rounded-[10px] px-[20px] py-[15px] cursor-pointer">Get Started</div>
                <div className="ayr-pricing rounded-[10px] px-[20px] py-[15px] cursor-pointer">Pricing</div>
            </div>
        </div>
    )
}
