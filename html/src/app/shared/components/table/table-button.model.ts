import { EnabledOn } from './enabled-on';

export interface TableButton {
    /** The name of the button. Will be translated. */
    name: string;

    /** The icon for this button if any */
    icon: string;

    /** The role list that can use this button */
    roles?: string[];

    /**
     * A handler that will be executed when user click the button.
     * Must be a function reference with 1 arguments like:
     * onButtonClick(selectedRows: any[]) if called from top table
     * or onButtonClick(record: any) if called from button at row level
     * Optionally can pass a second argument which is a callback function.
     * This will be called manually for refres table data if desired after handler logic is finished.
     */
    handler: any;

    /** When the button should be enabled */
    enabled?: EnabledOn;

    /**
     *  If enabled property is "EnabledOn.ConditionCheck" then this property must be
     *  a function handler that must return true or false and accept a parameter like any[].
     *
     *  enabledCondition: handler
     *
     *  handler(selectedRows: any[]) { return true; }
     */
    enabledCondition?: any;

     /** Show this button for each row or only in table header? */
    rowButton?: boolean;
}
