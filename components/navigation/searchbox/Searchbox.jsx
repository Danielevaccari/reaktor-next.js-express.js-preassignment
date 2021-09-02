import styles from '../../../styles/Searchbox.module.css'

const Searchbox = ({setSearch, search, setFilter }) => {

    //Input handler
    const changeSearch = (e) => {
        setSearch(e.target.value)
        setFilter(true)
        //Searchbox needs to be empty if user doesnt want to filter rules by keywords.
        if (!document.getElementById('searchbox').value) {
            setFilter(false)
        }
    }

    return (
        <>
            <div className={styles.searchboxParent}>
                {/* Searchbox for rule filtering */}
                <input
                    onKeyUp={() => search ? '' : setFilter(false)}
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
