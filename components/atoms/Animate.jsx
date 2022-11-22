import React, {useEffect, useRef, useState} from 'react'

const Animate = (props) => {
  const animateRef = useRef()

  const [animated, setAnimated] = useState(false)

  const animate = (element) => {
    const delay = 150
    const animatedElements = element.querySelectorAll('.animate')
    
    animatedElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animated')
      }, delay * (index + 1))
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const toObserve = animateRef.current
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setAnimated(true)
            animate(toObserve)
            observer.disconnect()
          }
        },
        {
          threshold: 0,
          rootMargin: '0px 0px -20% 0px'
        }
      )
      observer.observe(toObserve)
    } else {
      setAnimated(true)
    }
  }, [animateRef])

  return (
    <div className={`animate-wrap ${animated && 'animate-wrap--fired'}`} ref={animateRef}>
      {props.children}
    </div>
  )
}

export default Animate