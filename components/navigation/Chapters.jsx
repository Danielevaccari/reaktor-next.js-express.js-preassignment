import styles from '../../styles/Chapters.module.css'
import Searchbox from './searchbox/Searchbox'

const Chapters = ({ chapters, changeSearch, changeId }) => {
    return (
        <>
            <div className={styles.left}><br />
                <Searchbox changeSearch={changeSearch} />
                <div className={styles.toc}>Table of contents</div>
                <div className={styles.chapters}>
                    {/* Get chapters dynamically */}
                    {chapters && chapters.map((chapter) => (
                        <div className={styles.chapter} onClick={() => changeId(chapter.substring(0, 3))} key={chapter.substring(0, 3)}>{chapter + '\n' + '\n'}</div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Chapters