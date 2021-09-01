import styles from '../../../styles/Rule.module.css'

const Rule = ({ injectHyperlinkRules, rule}) => {
    return (
        <>
            <div className={styles.rule} key={rule}>{injectHyperlinkRules(rule)}<br /></div>
        </>
    )
}

export default Rule
