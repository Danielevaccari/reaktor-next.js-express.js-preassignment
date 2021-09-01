import styles from '../../../styles/Searchbox.module.css'

const Searchbox = ({ changeSearch }) => {
    return (
        <>
            <div className={styles.searchboxParent}>
                {/* Searchbox for rule filtering */}
                <input
                    id='searchbox'
                    className={styles.searchbox}
                    onChange={changeSearch}
                    placeholder='search from all rules...'
                    type='text'
                >
                </input>
            </div>
        </>
    )
}

export default Searchbox
