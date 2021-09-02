import { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import styles from '../../styles/PopUp.module.css'


//Pop up component
export const PopUpComp = ({ open, setOpen, hyperRule }) => {


    return (
        <>
            <Modal
                title='modal'
                open={open}
                onClose={() => setOpen(false)}
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
