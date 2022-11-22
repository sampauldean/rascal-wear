import React from 'react';
import { builder, BuilderComponent, Builder } from '@builder.io/react'
import Animate from '../atoms/Animate'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

import style from "./ComingSoon.module.scss"

const ComingSoon = (props) => {
  return (
    <Animate>
      <section className={style.comingSoon}>
        <div className={style.comingSoon__container}>
          {props.title && (
            <h1 className={style.comingSoon__title}>{props.title}</h1>
          )}
          {props.teaser && (
            <div className={style.comingSoon__teaser}>
              {props.teaser}
              <FontAwesomeIcon icon={solid('user-secret')} />
            </div>
          )}
          {props.image && (
            <div className={`${style.comingSoon__scout}`}>
              <Image
                src={props.image}
                alt={props.title}
                width={200}
                height={300}
              />
            </div>
          )}
        </div>
      </section>
    </Animate>
  )
}

Builder.registerComponent(ComingSoon, {
  name: 'Coming Soon',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Coming Soon',
    },
    {
      name: 'teaser',
      type: 'text',
    },
    {
      name: 'image',
      type: 'file',
    },
  ],
})
