import styles from '../../../styles/Rule.module.css'

const Rule = ({ InsertLinksToOtherRuleMentionsInRuleOrReturnRule, rule }) => {
    return (
        <>
            <div className={styles.rule} key={rule}>{InsertLinksToOtherRuleMentionsInRuleOrReturnRule(rule)}</div>
        </>
    )
}

export default Rule
