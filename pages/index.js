import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { PopUpComp } from '../components/popUp/PopUpComp'
import Chapters from '../components/navigation/Chapters'
import RuleList from '../components/rules/RuleList'
import Logo from '../components/navigation/logo/Logo'

//Created by Daniele Johannes Vaccari

//Fetch .txt data at https://reaktor-next-js-express-js-preassignment.vercel.app/api/ruleData.
export const getStaticProps = async () => {

  //https://reaktor-next-js-express-js-preassignment.vercel.app/api/ruleData
  const res = await fetch('https://reaktor-next-js-express-js-preassignment.vercel.app/api/ruleData')
  const data = await res.text()
  return {
    props: { txtData: data }
  }
}

export default function Home({ txtData }) {

  //Gets all rules from strMagic by using regular expressions.
  const allRules = txtData.match(/^[0-9][0-9][0-9].[0-9][a-z]?.+\s?\s?(Example.*$)?\s?\s?(Example.*$)?\s?\s?(Example.*$)?\s?\s?(Example.*$)?/gm)
  //Gets the chapters and sets them to chapters. Slices the chapter section from .txt file and collects chapters using regex. Indexes of slicing are found by keywords around all chapters.
  const chapters = txtData.slice(txtData.indexOf('Contents'), txtData.indexOf('Credits')).match(/^[0-9][0-9][0-9]\. .+/gm)
  //Hyperlink rule string. Pop up rule.
  const [hyperRule, setHyperRule] = useState('')
  //Bool for search. True if user has entered something in searchbox.
  const [filter, setFilter] = useState(false)
  //Rule identifier. First 3 digits of a rule.
  const [id, setId] = useState('100')
  //Value of searchbox
  const [search, setSearch] = useState('')
  //Boolean for pop up window. Open if true.
  const [open, setOpen] = useState(false)

  //Input handler
  const changeSearch = (e) => {
    setSearch(e.target.value)
    setFilter(true)
    //Searchbox needs to be empty if user doesnt want to filter rules by keywords.
    if (!document.getElementById('searchbox').value) {
      setFilter(false)
    }
  }

  // If rule contains a rule this will replace it with a hyperlink to that rule. If rule does not contain other rules return the original rule
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
        ans.push(<span key={tempAns[0]} data-value={ruleIds[i]} onClick={ruleHyperOpen} style={{ color: 'blue' }}>{ruleIds[i]}</span>)

        //If contains 1 rule
        if (ruleIds.length == 1) {
          ans.push(tempAns[1])
          return (ans)
        }
        //If more than 1 rule
        //Saves the string after first rule hyperlink to a temporary variable tempStr
        tempStr = tempAns[1]
        //Returns rule when it has replaced all instances of rules to hyperlink rules in the rule
        if (i + 1 == ruleIds.length) {
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
    const ans = txtData.match(re)[0]
    //Setting values for the pop up
    setHyperRule(ans)
    setOpen(true)
  }

  return (
    <>
      {/* Title for website */}
      <Head>
        <title>
          Rulebook
        </title>
      </Head>
      {/* Pop up component */}
      <PopUpComp open={open} setOpen={setOpen} hyperRule={hyperRule} />
      {/* Rulebook content */}
      <div className={styles.walls}>
        <Logo />
        <div className={styles.container}>
          <Chapters chapters={chapters} changeSearch={changeSearch} setId={setId} search={search} setFilter={setFilter} />
          <RuleList search={search} allRules={allRules} filter={filter} id={id} injectHyperlinkRules={injectHyperlinkRules} />
        </div>
      </div>
    </>
  )
}