import Modal from '@material-ui/core/Modal'
import styles from '../../styles/PopUp.module.css'


//Pop up component
const PopUpComp = ({ openPopUp, setOpenPopUp, hyperRule }) => {


    return (
        <>
            <Modal
                title='modal'
                open={openPopUp}
                onClose={() => setOpenPopUp(false)}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <div data-testid="content" className={styles.popUpContainer}>
                    <div className={styles.popUp}>
                        {hyperRule}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default PopUpComp