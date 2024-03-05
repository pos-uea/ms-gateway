import { ClientProxyRadioFrequency } from 'src/common/proxyrmq/client-proxy';
import { SensorsDataController } from './sensors-data.controller';

describe('SensorsDataController', () => {
  let sensorsDataController: SensorsDataController;
  let clientProxyRadioFrequency: ClientProxyRadioFrequency;

  beforeEach(() => {
    clientProxyRadioFrequency = new ClientProxyRadioFrequency();
    sensorsDataController = new SensorsDataController(
      clientProxyRadioFrequency,
    );
  });

  describe('findAll', () => {
    it('should return message', async () => {
      const result = "msg:{ 'message': 'Deus é mais beta' }";
      jest
        .spyOn(sensorsDataController, 'getAllSensorData')
        .mockImplementation(() => Promise.resolve(result));
      // Fix: Wrap result in Promise.resolve()

      expect(await sensorsDataController.getAllSensorData()).toBe(result);
    });
  });

});
