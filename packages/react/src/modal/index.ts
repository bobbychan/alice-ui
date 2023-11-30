'use client';

import { Modal } from './modal';
import { ModalBody } from './modal-body';
import { ModalCloseButton } from './modal-close-button';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';

// export types
export type { ModalOverlayProps } from 'react-aria-components';
export type { ModalProps } from './modal';

// export hooks
export { useDisclosure } from './use-disclosure';

// export context
export { ModalContext } from 'react-aria-components';

// export component
export { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader };
