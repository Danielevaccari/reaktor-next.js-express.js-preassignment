import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [strMagic, setStrMagic] = useState('')

  const changeStrMagic = (e) => {
    setStrMagic(e)
  }

  const dataFetch = async () => {
    const res = await fetch('https://newest-react-express.herokuapp.com/')
    const data = await res.text()
    changeStrMagic(data)
  }

  useEffect(() => {
    dataFetch()
  }, [])

  return (
    <>
      <div>{strMagic}</div>
      {console.log('cs')}
    </>
  )
}
