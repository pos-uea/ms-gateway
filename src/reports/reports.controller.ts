import { Controller, Get, Logger } from '@nestjs/common';
import { ClientProxyRadioFrequency } from 'src/common/proxyrmq/client-proxy';

@Controller('api/reports')
export class ReportsController {

    private logger = new Logger(ReportsController.name);

    constructor(
        private clientProxyRadioFrequency: ClientProxyRadioFrequency,
    ) { }

    private dominioReports = this.clientProxyRadioFrequency.getClientProxyDominioReportInstance();


    @Get()
    async getReports(){
        this.logger.log(`reports GET`);
        return this.dominioReports.send('get-reports', {}).toPromise();
    }

}
