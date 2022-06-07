import fs from 'fs';

import { BcryptHashingService } from '../adapters/BcryptHashingService';
import { JwtTokenService } from '../adapters/JwtTokenService';
import { NeDBPersistenceService } from '../adapters/NeDBPersistenceService';
import { AppContext } from '../domain/AppContext';
import { I18nService } from '../domain/services/I18nService';

export const buildDevelopmentAppContext = async () => {
    const i18nService = new I18nService();
    i18nService.add(
        'pt_br',
        JSON.parse(fs.readFileSync('i18n/pt_br.json', { encoding: 'utf-8' })),
    );
    i18nService.add(
        'en_us',
        JSON.parse(fs.readFileSync('i18n/en_us.json', { encoding: 'utf-8' })),
    );

    return new AppContext(
        new NeDBPersistenceService(),
        i18nService,
        new JwtTokenService(),
        new BcryptHashingService(),
    );
};
