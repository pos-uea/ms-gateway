import { Controller, Get, Logger } from '@nestjs/common';
import { ClientProxyRadioFrequency } from 'src/common/proxyrmq/client-proxy';

@Controller('api/reports')
export class ReportsController {

    private logger = new Logger(ReportsController.name);

    constructor(
        private clientProxyRadioFrequency: ClientProxyRadioFrequency,
    ) { }

    private dominioSensors = this.clientProxyRadioFrequency.getClientProxyDominioSensorsInstance();


    @Get()
    async getReports(){
        this.logger.log(`reports GET`);
        return this.dominioSensors.send('get-reports', {}).toPromise();
    }

}
