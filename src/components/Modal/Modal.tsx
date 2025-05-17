import React, {CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import './Modal.scss';

// modal props interface
type ModalProps = {
	isOpen: boolean,
	onClose: () => void,
	title?: string,
	content: ReactNode,
	closeOnOverlayClick?: boolean,
	showCloseButton?: boolean,
	additionalStyling?: CSSProperties | undefined
}


const Modal: React.FC<ModalProps> = ({ 
	isOpen, 
	onClose, 
	title='', 
	content, 
	closeOnOverlayClick=true, 
	showCloseButton=true, 
	additionalStyling=undefined 
}) => {

	if (!isOpen) {
    return null
  }

	const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (closeOnOverlayClick && e.currentTarget === e.target) {
      onClose();
    }
  };

	return (
    <AnimatePresence>
      <div className="modal" onClick={handleOverlayClick}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="modal-container"
          style={additionalStyling}
        >
          {/* Header */}
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            {showCloseButton  && 
              <button
                onClick={onClose}
                className="modal-close-button"
                aria-label="Close"
              >
                ✕
              </button>
            }
          </div>

          {/* Content */}
          <div className="modal-content">{content}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;
