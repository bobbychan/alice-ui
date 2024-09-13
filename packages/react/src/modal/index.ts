import { Modal } from './modal';
import { ModalBody } from './modal-body';
import { ModalCloseButton } from './modal-close-button';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';
// https://github.com/adobe/react-spectrum/issues/5720
import '@formatjs/intl-listformat/locale-data/en';
import '@formatjs/intl-listformat/polyfill';

// export types
export type { ModalProps } from './modal';
export type { UseDisclosureProps, UseDisclosureReturn } from './use-disclosure';

// export hooks
export { useDisclosure } from './use-disclosure';

// export component
export { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader };
