
import { AppConfigService } from '../../app-config/app-config.service';

export const initializeRecaptcha = (cfg: AppConfigService) => {
    console.log('Initializing recaptcha settings');
    return cfg.getConfig().recaptcha?.siteKey;
};
