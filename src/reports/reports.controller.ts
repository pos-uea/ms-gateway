import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
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

    @Get('/analytics/:type')
    async getAnalyticsByType(
        @Param('type',ValidacaoParametrosPipe) type: string) {
        this.logger.log(`reports GET`, type);
        return this.dominioReports.send('get-analytics-by-type', type).toPromise();
    }

    @Get('/sintetic/:type')
    async getSinteticByType(){
        this.logger.log(`reports GET`);
        return this.dominioReports.send('get-sintetic-by-type', {}).toPromise();
    }

}
