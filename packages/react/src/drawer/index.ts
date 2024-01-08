'use client';

import { ModalBody } from '../modal/modal-body';
import { ModalCloseButton } from '../modal/modal-close-button';
import { ModalContent } from '../modal/modal-content';
import { ModalFooter } from '../modal/modal-footer';
import { ModalHeader } from '../modal/modal-header';
import { Drawer } from './drawer';

// export types
export type { DrawerProps } from './drawer';

// export component

export {
  Drawer,
  ModalBody as DrawerBody,
  ModalCloseButton as DrawerCloseButton,
  ModalContent as DrawerContent,
  ModalFooter as DrawerFooter,
  ModalHeader as DrawerHeader,
};
