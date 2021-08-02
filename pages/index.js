import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Modal from '@material-ui/core/Modal'

export default function Home() {

  //strMagic contains the .txt as string
  const [strMagic, setStrMagic] = useState('')
  //chapters contains the chapters from the .txt data
  const [chapters, setChapters] = useState('')
  //Bool for search
  const [filter, setFilter] = useState(false)
  //This contains all the rules
  const [allRules, setAllRules] = useState([])
  //Rule identifier
  const [id, setId] = useState('100')
  //Value of searchbox
  const [search, setSearch] = useState('')
  //Hyperlink rule content
  const [hyperRule, setHyperRule] = useState('')
  //Boolean for pop up window
  const [open, setOpen] = useState(false)

  //Fetch .txt data from backend server at https://newest-react-express.herokuapp.com/
  const dataFetch = async () => {
    const res = await fetch('https://newest-react-express.herokuapp.com/')
    const data = await res.text()
    initializeStrMagic(data)
  }

  //Gets all rules from string by using regular expressions
  const setAllRulesArray = () => {
    setAllRules(strMagic.match(/^[0-9][0-9][0-9].[0-9][a-z]?.+\s?\s?(Example.*$)?\s?\s?(Example.*$)?\s?\s?(Example.*$)?\s?\s?(Example.*$)?/gm))
  }
  ///^[0-9][0-9][0-9].[0-9][a-z]?.+(?=\s*$)(\sExample.*$)?(\sExample.*$)?/gm
  //Sets .txt data to string
  const initializeStrMagic = (e) => {
    setStrMagic(e)
  }

  //Gets the chapters and sets them to chapters. Slices the chapter section from .txt file and collects chapters using regex. Indexes of slicing are found by keywords around all chapters.
  const changeChapters = () => {
    const chapterArray = strMagic.slice(strMagic.indexOf('Contents'), strMagic.indexOf('Credits')).toString()
    setChapters(chapterArray.match(/^[0-9][0-9][0-9]\. .+/gm))
  }

  //Sets the id to match chapter number
  const changeId = (prop) => {
    setId(prop)
  }

  //Input handler
  const changeSearch = (e) => {
    setSearch(e.target.value)
    setFilter(true)
    if (!document.getElementById('searchbox').value) {
      setFilter(false)
    }
  }

  const injectHyperlinkRules = (str) => {
    var ans = []
    //Search the rule for mentions of other rules and return all rule numbers that are mentioned in an array to ruleIds
    const stringWithNoId = str.substring(7, str.length)
    const ruleIds = stringWithNoId.match(/[0-9][0-9][0-9]\.?[0-9]?[0-9]?[0-9]?[a-z]?\.?/gm)

    var tempStr = str

    if (ruleIds) {
      for (var i = 0; i < ruleIds.length; i++) {
        //splits rule to left side of the tule number and right side of the rule number
        var tempAns = tempStr.split(ruleIds[i])
        //Adds whole rule together with one rule hyperlink
        ans.push(tempAns[0])
        ans.push(<span id={ruleIds[i]} data-value={ruleIds[i]} onClick={ruleHyperOpen} style={{ color: 'royalblue' }}>{ruleIds[i]}</span>)

        if(ruleIds.length == 1){
        ans.push(tempAns[1])
        return (ans)
        }
        //Saves the string after first rule hyperlink to a temporary variable tempStr
        tempStr = tempAns[1]
        //Returns rule when it has replaced all instances of rules to hyperlink rules in the rule
        if(i + 1 == ruleIds.length){
          ans.push(tempAns[1])
        return (ans)
        }
      }
    }

    return (
      str
    )
  }

  const ruleHyperOpen = (e) => {
    //Gets the data-value attribute that represents the rule's id
    var ruleId = e.target.dataset.value
    //Regular expression to find a exact match for the rule
    var re = new RegExp(`^${ruleId}\.?.+\s?\s?(Example.*$)?`, 'gm')
    const ans = strMagic.match(re)[0]
    //Setting values for the pop up
    setHyperRule(ans)
    setOpen(true)
  }

  //Closes the pop up
  const ruleHyperClose = () => {
    setOpen(false)
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
      <Modal
        open={open}
        onClose={ruleHyperClose}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className={styles.popUpContainer}>
          <div className={styles.popUp}>
            {hyperRule}
          </div>
        </div>
      </Modal>
      <div className={styles.walls}>
        <div className={styles.container}>
          <div className={styles.left}><br />
            <div className={styles.title}>Magic the Gathering</div>

            <div className={styles.searchboxParent}>
              <input
                id='searchbox'
                className={styles.searchbox}
                onChange={changeSearch}
                placeholder='search from all rules...'
                type='text'
              >
              </input>
            </div>
            <div className={styles.toc}>Table of contents</div>
            <div className={styles.chapters}>
              {chapters && chapters.map((chapter) => (
                <div className={styles.chapter} onClick={() => changeId(chapter.substring(0, 3))} key={chapter.substring(0, 3)}>{chapter + '\n' + '\n'}</div>
              ))}
            </div>
          </div>
          <div className={styles.rules}>
            <div style={{ fontSize: '30px' }}>
              Rules
            </div>
            {search}
            <br />
            {!filter && allRules && allRules.map((rule) => (
              rule.substring(0, 3) == id ? <div className={styles.rule} key={rule}>{injectHyperlinkRules(rule)}<br /></div> : ''
            ))}
            {filter && allRules && allRules.map((rule) => (
              rule.includes(search) ? <div className={styles.rule} key={rule}>{injectHyperlinkRules(rule)}<br /></div> : ''
            ))}
          </div>
        </div>
      </div>
    </>
  )
}