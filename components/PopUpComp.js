import React from 'react'
import Modal from '@material-ui/core/Modal'
import styles from '../styles/PopUp.module.css'


//Pop up component
export const PopUpComp = ({ open, ruleHyperClose, hyperRule }) => {
    return (
        <>
            <Modal
                title='modal'
                open={open ? true : false}
                onClose={ruleHyperClose}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className={styles.popUpContainer}>
                    <div className={styles.popUp}>
                        {hyperRule}
                    </div>
                </div>
            </Modal>
        </>
    )
}
