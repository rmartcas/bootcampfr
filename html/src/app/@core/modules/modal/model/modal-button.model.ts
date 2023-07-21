export interface ModalButton {
    /** The name of the button. Will be translated. */
    name: string;

    /** The icon for this button if any */
    icon: string;

    /**
     * A handler that will be executed when user click the button.
     * Must be a function reference with 3 arguments like:
     * onButtonClick(parentRef: any, modalContent: any, modal: any)
     */
    handler: any;

    /** The role list that can use this button */
    roles?: string[];

    /** Button should be disabled when modal content form is invalid? */
    disabledWhenInvalid?: boolean;
}
