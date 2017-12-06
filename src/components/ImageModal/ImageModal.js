import react from 'react';
import FontAwesome from 'react-fontawesome';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./ImageModal.css";

const ImageModal = ({imageData, closeModal}) =>{

    return(
        <div className={s.backDrop}>
            <div id="modal" className={s.modalContainer}>
                <FontAwesome className={s.faIcon} name='times' size="2x" onClick={closeModal}/>
                <img src={imageData.image} alt={imageData.title} />
                {/* <h3>{imageData.title}</h3> */}
            </div>
        </div>
    )
}

export default withStyles(s)(ImageModal)
