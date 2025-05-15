"use client"

import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
  distance?: number
  once?: boolean
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  className = "",
  distance = 20,
  once = true,
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.1,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [once])

  // Set initial transform based on direction
  let translateValue = "translate(0, 0)"
  if (direction === "up") translateValue = `translate(0, ${distance}px)`
  if (direction === "down") translateValue = `translate(0, -${distance}px)`
  if (direction === "left") translateValue = `translate(${distance}px, 0)`
  if (direction === "right") translateValue = `translate(-${distance}px, 0)`

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate(0, 0)" : translateValue,
    transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
    transitionDelay: `${delay}s`,
  }

  return (
    <div ref={ref} style={style} className={cn(className)}>
      {children}
    </div>
  )
}

export function FadeInStagger({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  ...props
}: FadeInProps & { staggerDelay?: number; initialDelay?: number }) {
  return (
    <>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child
        
        return (
          <FadeIn key={index} delay={initialDelay + index * staggerDelay} {...props}>
            {child}
          </FadeIn>
        )
      })}
    </>
  )
} 