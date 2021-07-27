import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
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
  //All rules
  const [chapter1Rules, setChapter1Rules] = useState([])
  const [chapter2Rules, setChapter2Rules] = useState([])
  const [chapter3Rules, setChapter3Rules] = useState([])
  const [chapter4Rules, setChapter4Rules] = useState([])
  const [chapter5Rules, setChapter5Rules] = useState([])
  const [chapter6Rules, setChapter6Rules] = useState([])
  const [chapter7Rules, setChapter7Rules] = useState([])
  const [chapter8Rules, setChapter8Rules] = useState([])
  const [chapter9Rules, setChapter9Rules] = useState([])
  //Rule identifier
  const [id, setId] = useState('')

  //Fetch .txt data from backend server at https://newest-react-express.herokuapp.com/
  const dataFetch = async () => {
    const res = await fetch('https://newest-react-express.herokuapp.com/')
    const data = await res.text()
    changeStrMagic(data)
  }

  //Collects all rules from fetched data and categorizes them into arrays specific to chapters
  //Uses regular expressions
  const setAllChaptersRules = () => {
    setChapter1Rules(strMagic.match(/^1[0-9][0-9].[0-9][a-z]?.+(?=\s*$)/gm))
    setChapter2Rules(strMagic.match(/^2[0-9][0-9].[0-9][a-z]?.+(?=\s*$)/gm))
    setChapter3Rules(strMagic.match(/^3[0-9][0-9].[0-9][a-z]?.+(?=\s*$)/gm))
    setChapter4Rules(strMagic.match(/^4[0-9][0-9].[0-9][a-z]?.+(?=\s*$)/gm))
    setChapter5Rules(strMagic.match(/^5[0-9][0-9].[0-9][a-z]?.+(?=\s*$)/gm))
    setChapter6Rules(strMagic.match(/^6[0-9][0-9].[0-9][a-z]?.+(?=\s*$)/gm))
    setChapter7Rules(strMagic.match(/^7[0-9][0-9].[0-9][a-z]?.+(?=\s*$)/gm))
    setChapter8Rules(strMagic.match(/^8[0-9][0-9].[0-9][a-z]?.+(?=\s*$)/gm))
    setChapter9Rules(strMagic.match(/^9[0-9][0-9].[0-9][a-z]?.+(?=\s*$)/gm))
  }

  const setAllRulesArray = () => {
    setAllRules(strMagic.match(/^[0-9][0-9][0-9].[0-9][a-z]?.+(?=\s*$)/gm))
  }

  //Sets .txt data to string
  const changeStrMagic = (e) => {
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

  // const setCurrentChapterRules = () => {
  //   switch (id.charAt(0)) {
  //     case '1':
  //       setChapterRules(chapter1Rules)
  //       break;
  //     case '2':
  //       setChapterRules(chapter2Rules)
  //       break;
  //     case '3':
  //       setChapterRules(chapter3Rules)
  //       break;
  //     case '4':
  //       setChapterRules(chapter4Rules)
  //       break;
  //     case '5':
  //       setChapterRules(chapter5Rules)
  //       break;
  //     case '6':
  //       setChapterRules(chapter6Rules)
  //       break;
  //     case '7':
  //       setChapterRules(chapter7Rules)
  //       break;
  //     case '8':
  //       setChapterRules(chapter8Rules)
  //       break;
  //     case '9':
  //       setChapterRules(chapter9Rules)
  //       break;
  //     default:
  //       break;
  //   }
  // }

  //Iniatializing data as soon as page is opened
  useEffect(() => {
    if (!strMagic) {
      dataFetch()
      console.log('now')
    }
  }, [strMagic])

  //Initializing chapters
  useEffect(() => {
    if (!chapters) {
      changeChapters()
      console.log('now2')
    }
  }, [strMagic])

  //Initializing rules
  useEffect(() => {
    if (strMagic) {
      setAllChaptersRules()
      setAllRulesArray()
    }
  }, [strMagic])

  return (
    <>
      <Head>
        <title>
          Rules
        </title>
      </Head>
      <div className={styles.walls}>
        <div className={styles.container}>
          <div className={styles.left}><br />
            <div style={{ fontSize: '1rem', fontFamily: 'impact', margin: '2%' }}>Table of contents</div>
            <div className={styles.chapters}>
              {chapters && chapters.map((chapter) => (
                <div className={styles.chapter} onClick={() => changeId(chapter.substring(0, 3))} key={chapter.substring(0, 3)}>{chapter.toString() + '\n' + '\n'}</div>
              ))}
            </div>
          </div>
          <div className={styles.rules}>Rules<br />
            {allRules && allRules.map((rule) => (
              rule.substring(0, 3) == id ? <div className={styles.rule} key={rule}>{rule.toString() + '\n' + '\n'}</div> : ''
            ))}
          </div>
        </div>
      </div>
    </>
  )
}