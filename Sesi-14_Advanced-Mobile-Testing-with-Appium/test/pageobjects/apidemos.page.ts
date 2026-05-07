export class APIDemosPage {

    static appBtn() {
        return $('//android.widget.TextView[@content-desc="App"]');
    }

    static alertDialogsBtn() {
        return $('//android.widget.TextView[@content-desc="Alert Dialogs"]');
    }

    static textEntryDialogBtn() {
        return $('//android.widget.Button[@content-desc="Text Entry dialog"]');
    }

    static usernameField() {
        return $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/username_edit"]');
    }

    static passwordField() {
        return $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/password_edit"]');
    }
}