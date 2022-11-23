import React from 'react';
import { builder, BuilderComponent, Builder } from '@builder.io/react'
import Animate from '../atoms/Animate'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

import style from "./ComingSoon.module.scss"

const ComingSoon = (props) => {
  const myRef = useRef(null);

  useEffect(() => {
    const el = myRef.current;

    gsap.to(el, {rotation:"360", duration: 4, ease: 'none', repeat:-1});
  }, [])

  return (
    <Animate>
      <section className={style.comingSoon}>
        {props.logo && (
          <div ref={myRef} className={style.comingSoon__logo}>
            <Image
              src={props.logo}
              alt="Logo"
              width={100}
              height={120}
            />
          </div>
        )}
        {props.title && (
          <h1 className={`${style.comingSoon__title} animate animate--fade-up`}>{props.title}</h1>
        )}
        {props.image && (
          <div className={`${style.comingSoon__scout} animate animate--fade-up`}>
            <Image
              src={props.image}
              alt={props.title}
              width={300}
              height={300}
            />
          </div>
        )}
      </section>
    </Animate>
  )
}

Builder.registerComponent(ComingSoon, {
  name: 'Coming Soon',
  inputs: [
    {
      name: 'logo',
      type: 'file',
      allowedFileTypes: ['svg', 'png', 'jpg', 'jpeg'],
    },
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Coming Soon',
    },
    {
      name: 'image',
      type: 'file',
    },
  ],
})
