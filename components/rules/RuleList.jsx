import Rule from "./rule/Rule"
import styles from '../../styles/RuleList.module.css'

const RuleList = ({ search, allRules, filter, id, injectHyperlinkRules }) => {
    return (
        <>
            <div className={styles.rules}>
                <div style={{ fontSize: '20px', display: 'flex', justifyContent: 'center' }}>
                    Rules
                </div>
                <br />
                {/* This executes when chapters are clicked */}
                {!filter && allRules && allRules.map((rule) => (
                    rule.substring(0, 3) == id ? <Rule injectHyperlinkRules={injectHyperlinkRules} rule={rule} /> : ''
                ))}
                {/* If user has entered text in the searcbox this will execute */}
                {filter && allRules && allRules.map((rule) => (
                    rule.includes(search) ? <Rule injectHyperlinkRules={injectHyperlinkRules} rule={rule} /> : ''
                ))}
            </div>
        </>
    )
}

export default RuleList
