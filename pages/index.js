import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {

  //strMagic contains the .txt as string
  const [strMagic, setStrMagic] = useState('')
  //chapters contains the chapters from the .txt data
  const [chapters, setChapters] = useState('')
  //Rules that the user selects by clicking specific chapter
  const [chapterRules, setChapterRules] = useState([])
  //This contains all the rules
  const [allRules, setAllRules] = useState([])
  //Rule identifier
  const [id, setId] = useState('')
  //Value of searchbox
  const [search, setSearch] = useState('')

  //Fetch .txt data from backend server at https://newest-react-express.herokuapp.com/
  const dataFetch = async () => {
    const res = await fetch('https://newest-react-express.herokuapp.com/')
    const data = await res.text()
    initializeStrMagic(data)
  }

  //Gets all rules by using regular expressions
  const setAllRulesArray = () => {
    setAllRules(strMagic.match(/^[0-9][0-9][0-9].[0-9][a-z]?.+(?=\s*$)/gm))
  }

  //Sets .txt data to string
  const initializeStrMagic = (e) => {
    setStrMagic(e)
  }

  //Setter
  const changeChapters = () => {
    const chapterArray = strMagic.slice(val, 3833).toString()

    setChapters(chapterArray.match(/^[0-9][0-9][0-9]\. .+/gm))
  }

  const changeId = (prop) => {
    setId(prop)
  }
  //contentindex is equal to the index when the chapters start
  //const [contentIndex, setContentIndex] = useState(null)

  const val = strMagic.indexOf('Contents') + 8

  const changeSearch = (e) => {
    setSearch(e.target.value)
  }

  //Iniatializing data as soon as page is opened
  useEffect(() => {
    if (!strMagic) {
      dataFetch()
    }
  }, [strMagic])

  //Initializing chapters
  useEffect(() => {
    if (!chapters) {
      changeChapters()
    }
  }, [strMagic])

  //Initializing rules
  useEffect(() => {
    if (strMagic) {
      setAllRulesArray()
    }
  }, [strMagic])

  return (
    <>
      <Head>
        <title>
          Rulebook
        </title>
      </Head>
      <div className={styles.walls}>
        <div className={styles.container}>
          <div className={styles.left}><br />
            <div className={styles.toc}>Table of contents</div>
            <div className={styles.searchboxParent}>
              <input
              className={styles.searchbox}
                onChange={changeSearch}
                placeholder='search...'
                type='text'
              >
              </input>
            </div>
            <div className={styles.chapters}>
              {chapters && chapters.map((chapter) => (
                <div className={styles.chapter} onClick={() => changeId(chapter.substring(0, 3))} key={chapter.substring(0, 3)}>{chapter.toString() + '\n' + '\n'}</div>
              ))}
            </div>
          </div>
          <div className={styles.rules}>Rules {search}<br />
            {allRules && allRules.map((rule) => (
              rule.substring(0, 3) == id ? <div className={styles.rule} key={rule}>{rule.toString() + '\n' + '\n'}</div> : ''
            ))}
          </div>
        </div>
      </div>
    </>
  )
}