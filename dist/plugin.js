var capacitorCapacitorPresentation = (function (exports, core) {
    'use strict';

    const CapacitorPresentation = core.registerPlugin('CapacitorPresentation', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.CapacitorPresentationWeb()),
    });

    class CapacitorPresentationWeb extends core.WebPlugin {
        async open(options) {
            var _a;
            try {
                let data = null;
                switch (options.type) {
                    case 'url':
                        data = options.url;
                        break;
                    case 'html':
                        data = options.html;
                        break;
                    case 'video':
                        data = (_a = options.videoOptions) === null || _a === void 0 ? void 0 : _a.videoUrl;
                }
                if (!data) {
                    throw new Error('Please enter all required values!');
                }
                const start = await this.startDisplay(data);
                this.notifyListeners('onSuccessLoadUrl', start);
                return {
                    success: start,
                };
            }
            catch (error) {
                console.log(error);
                this.notifyListeners('onFailLoadUrl', error);
                return {
                    error: error,
                    result: options
                };
            }
        }
        async sendMessage(message) {
            var _a;
            this.notifyListeners('onMessage', message);
            (_a = this.presentationConnection) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify(message));
            return message;
        }
        async startDisplay(data) {
            const presentationRequest = new window.PresentationRequest([data]);
            return new Promise(async (resolve) => {
                presentationRequest.addEventListener('connectionavailable', (event) => {
                    this.presentationConnection = event.connection;
                    resolve(this.presentationConnection);
                    this.presentationConnection.addEventListener('close', () => {
                        console.log('> Connection closed.');
                    });
                    this.presentationConnection.addEventListener('terminate', () => {
                        console.log('> Connection terminated.');
                    });
                    this.presentationConnection.addEventListener('message', (event) => {
                        console.log('> ' + event.data);
                    });
                });
                await presentationRequest.start();
                resolve(data);
            });
        }
        async terminate() {
            var _a;
            console.log(this.presentationConnection);
            return (_a = this.presentationConnection) === null || _a === void 0 ? void 0 : _a.terminate();
        }
        async getDisplays() {
            const presentationRequest = new window.PresentationRequest(['']);
            try {
                await presentationRequest.getAvailability();
                return {
                    displays: 1,
                };
            }
            catch (error) {
                return {
                    displays: 0,
                };
            }
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CapacitorPresentationWeb: CapacitorPresentationWeb
    });

    exports.CapacitorPresentation = CapacitorPresentation;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
