export class AlertControllerMock {
    buttons: any[];
    isPresented = false;
    create(options) {
        this.buttons = options.buttons;
        return Promise.resolve({
            present: () => {
                this.isPresented = true;
            }
        });
    }
};
