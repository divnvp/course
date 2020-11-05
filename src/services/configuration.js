export class ConfigurationService{
    constructor(config) {
        this.default = config;
    }

    load(){
        const configuration = localStorage.getItem('stSettings_v1');

        if (configuration) {
            return JSON.parse(configuration);
        }
        this.save(this.default);
        return this.default;
    }

    save(config) {
        const data = config ? JSON.stringify(config) : JSON.stringify(this.default);

        localStorage.setItem('stSettings_v1', data);
    }
}